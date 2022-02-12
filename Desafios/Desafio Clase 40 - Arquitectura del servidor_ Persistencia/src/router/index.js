const express = require("express")

const router = express.Router()

const productsRouter = require("./products")
const cartsRouter = require("./carts")
const authRouter = require("./auth")

router.use(productsRouter)
router.use(cartsRouter)
router.use(authRouter)

module.exports = router