const express = require("express");
const router = express.Router();

const authApi = require("./auth")
const usersApi = require("./users")
const publicationsApi = require("./publications")
const publisherApi = require("./publisher")
const tagsApi = require("./pubTags")
const catalogApi = require("./catalog")

router.use(authApi)
router.use(usersApi)
router.use('/publication', publicationsApi)
router.use('/publisher', publisherApi)
router.use('/tags', tagsApi)
router.use('/catalog', catalogApi)

module.exports = router;
