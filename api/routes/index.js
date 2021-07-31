const express = require ("express")
const router = express.Router()
const productsRoutes = require("./products")
const loginRoutes = require("./login")
const registerRoutes = require("./register")
const usersRoutes = require("./users")
const shopcartsRoutes = require("./shopcarts")
const categoriesRoutes = require("./categories")
const ordersRoutes = require("./orders")

router.use("/users", usersRoutes)
router.use("/register", registerRoutes)
router.use("/login", loginRoutes)
router.use("/products", productsRoutes)
router.use("/shopcarts", shopcartsRoutes)
router.use("/categories", categoriesRoutes)
router.use("/orders", ordersRoutes)


module.exports = router;