const express = require("express");
const router = express.Router();

const { getProductsId,getProducts, postProduct, putProduct, deleteProduct, getProductsByCategory, getProductsBySearch } = require("../controllers");

//---------------------- GET -------------------------//
router.get("/search", getProductsBySearch)
router.get("/filter", getProductsByCategory)
router.get("/:id", getProductsId);
router.get("/", getProducts);

//---------------------- POST ------------------------//
router.post("/", postProduct);

//---------------------- PUT -------------------------//
router.put("/:id", putProduct);

//-------------------- DELETE ------------------------//
router.delete("/:id", deleteProduct)


module.exports = router
