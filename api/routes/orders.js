const express = require("express");
const { getOrders, postOrder, putSpecificOrder, deleteSpecificOrder } = require("../controllers");
const router = express.Router();
const checkLogIn = require("../middlewares/auth");


//---------------------- GET -------------------------//
router.get("/", getOrders);
//---------------------- POST -------------------------//
router.post("/", checkLogIn, postOrder);
//---------------------- PUT -------------------------//
router.put("/:orderId", putSpecificOrder)
//---------------------- DELETE -------------------------//
router.delete("/:orderId", deleteSpecificOrder)

module.exports = router