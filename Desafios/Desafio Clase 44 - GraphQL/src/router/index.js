const express = require("express")

const router = express.Router()

const productsRouter = require("./products")
const cartsRouter = require("./carts")
const authRouter = require("./auth")
const productsGraphqlRouter = require("./productsGraphql")

router.use(productsRouter)
router.use(cartsRouter)
router.use(authRouter)
router.use(productsGraphqlRouter)

module.exports = router