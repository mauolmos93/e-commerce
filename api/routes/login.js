const express = require("express")
const { postLoginUser } = require("../controllers")
const router = express.Router()

//---------------------- POST ---------------------------//
router.post('/', postLoginUser)

module.exports = router