const express = require("express");
const router = express.Router();

const { getCategories } = require("../controllers");

//---------------------- GET ---------------------------//
router.get("/", getCategories);

module.exports = router;