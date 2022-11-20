const watermark = require('jimp-watermark');

const watermarker = async (req, res, next) => {
    // open a file called "lenna.png"

    // console.log(req.file);
    // console.log(req.body);
    // await Jimp.read(req.file.path, (err, lenna) => {
    //     if (err) throw err;
    //     lenna
    //         .resize(256, 256) // resize
    //         .quality(60) // set JPEG quality
    //         .greyscale() // set greyscale
    //         .write('lena-small-bw.jpg'); // save
    // });
    let dst = `public/wm-${req.file.originalname}`;
    var options = {
        ratio: 0.5,// Should be less than one
        opacity: 0.6, //Should be less than one
        dstPath: dst
    };
    await watermark.addWatermark(`${req.file.path}`, 'src/temp/watermarker.png', options);

    req.watermark_path = dst;
    req.watermark_name = `wm-${req.file.originalname}`;

    next();
}


module.exports = watermarker;