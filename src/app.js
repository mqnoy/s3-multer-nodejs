const express = require('express');
const dotenv = require('dotenv');

const { userRoute } = require('./routes/index');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoute);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to my API' });
});

module.exports = app;
