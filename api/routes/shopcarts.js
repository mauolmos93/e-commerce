const express = require("express")
const router = express.Router()
const { getShopcarts, postShopcart, deleteShopcartProduct, putShopCartProduct, deleteShopCart, getShopcart, putShopcart } = require ("../controllers")

//---------------------- GET ---------------------------//
router.get('/', getShopcarts)
router.get('/:id', getShopcart)

//---------------------- POST ---------------------------//
router.post('/', postShopcart)

//---------------------- PUT ---------------------------//
/* http://localhost:3001/shopcarts/1/products/2 */
router.put('/:shopcartId/products/:productId', putShopCartProduct )
router.put('/:shopCartId', putShopcart)

//-------------------- DELETE ---------------------------//
router.delete('/:shopcartId/products/:productId', deleteShopcartProduct )
router.delete('/:shopcartId', deleteShopCart)

module.exports = router