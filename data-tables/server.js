const express = require('express');
const app = express();
const port = 1000;

const env = process.env.NODE_ENV;

app.use(express.static(__dirname));
app.use('/', express.static(__dirname + '/src'));

app.listen(port, () => {
  console.log(`Start : http://localhost:${port}`);
});