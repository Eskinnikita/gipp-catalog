const express = require("express");
const router = express.Router();

const authApi = require("./auth")
const usersApi = require("./users")
const publicationsApi = require("./publications")
const publisherApi = require("./publisher")
const tagsApi = require("./pubTags")
const catalogApi = require("./catalog")
const adminApi = require('./admin')
const reviewsApi = require('./reviews')
const filesApi = require('./files')

router.use(authApi)
router.use(usersApi)
router.use('/publication', publicationsApi)
router.use('/publisher', publisherApi)
router.use('/tags', tagsApi)
router.use('/catalog', catalogApi)
router.use('/admin', adminApi)
router.use('/reviews', reviewsApi)
router.use('/files', filesApi)

module.exports = router;
