const { userModel } = require('../models');
const aws = require('aws-sdk');
const fs = require('fs');

const signup = async (req, res) => {
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION
  });
  const s3 = new aws.S3();
  let originalImage;
  let watermarkImage;

  try {
    const or = await s3.upload({
      ACL: 'public-read',
      Bucket: process.env.BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `public/${req.file.originalname}`
    }).promise();

    originalImage = or.Location;
    console.log(`LOCATIONS : ${or.Location}`);
    fs.unlinkSync(req.file.path); // Empty temp folder

    const wt = await s3.upload({
      ACL: 'public-read',
      Bucket: process.env.BUCKET_NAME,
      Body: fs.createReadStream(req.watermark_path),
      Key: `public/${req.watermark_name}`
    }).promise();

    watermarkImage = wt.Location;
    console.log(`LOCATIONS : ${wt.Location}`);
    //fs.unlinkSync(req.file.path); // Empty temp folder


    let newUser = new userModel({ ...req.body, original_image: originalImage, watermark_image: watermarkImage });
    await newUser.save()

    res.json({
      message: "created successfuly",
      data: newUser
    })

  } catch (error) {
    console.log(error);
  }


}


module.exports = signup;