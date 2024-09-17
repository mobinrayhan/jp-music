const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.use('/', (req, res) => {
  res.json({ message: 'api is working' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
