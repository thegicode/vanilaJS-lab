const express = require('express');
const app = express();
const port = 8080;

const env = process.env.NODE_ENV;

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Start : http://localhost:${port}`);
});