require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');

const port = process.env.PORT
const app = express()

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })