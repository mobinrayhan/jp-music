const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
// app.use(morgan('combined'));
app.use(helmet());

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  console.log(apiKey === process.env.API_KEY);

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
  next();
};
app.use(apiKeyMiddleware);

app.use('/', (req, res) => {
  res.json({ message: 'api is working' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
