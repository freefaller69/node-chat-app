const path = require('path');
const express = require('express');

const app = express();

const public = path.join(__dirname, '../public');
app.use(express.static(public));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});