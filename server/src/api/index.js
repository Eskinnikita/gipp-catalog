const express = require("express");
const router = express.Router();

const authApi = require("./auth")
const usersApi = require("./users")
const publicationsApi = require("./publications")
const publisherApi = require("./publisher")

router.use(authApi)
router.use(usersApi)
router.use('/publication', publicationsApi)
router.use('/publisher', publisherApi)

module.exports = router;
