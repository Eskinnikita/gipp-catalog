const express = require("express");
const router = express.Router();

const authApi = require("./auth")

router.use(authApi)

module.exports = router;