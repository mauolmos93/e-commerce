const express = require("express");
const router = express.Router();
const checkLogIn = require("../middlewares/auth");


const { editUser, getUser, getAllUsers, deleteUser, getUserOrders, getUserCompletedOrders, getUserPendingOrders } = require("../controllers");

//---------------------- GET -------------------------//
router.get("/:userId/orders", getUserOrders);
router.get("/:userId/orders/completed", getUserCompletedOrders);
router.get("/:userId/orders/pending", getUserPendingOrders);
router.get("/me", checkLogIn, getUser);
router.get("/", getAllUsers)

//---------------------- PUT -------------------------//
router.put("/:id", editUser);

//---------------------- DELET -------------------------//
router.delete("/:id", deleteUser );

module.exports = router