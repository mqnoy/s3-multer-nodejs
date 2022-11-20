const app = require('./app')
const { connectMongo } = require('./configs')

connectMongo().catch((err) => console.log(`error: ${err}`));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
