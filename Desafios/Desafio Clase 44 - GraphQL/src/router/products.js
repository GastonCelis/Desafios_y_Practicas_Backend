const express = require("express")

const routerProducts = express.Router()

const productsController = require("../controllers/products")
const isAdmin = require("../middlewares/isAdmin")

routerProducts.get("/", productsController.readAll)

routerProducts.get("/:id", productsController.readById)

routerProducts.post("/", isAdmin, productsController.create)

routerProducts.put("/:id", isAdmin, productsController.update)

routerProducts.delete("/", isAdmin, productsController.deleteAll)

routerProducts.delete("/:id", isAdmin, productsController.deleteById)

module.exports = routerProducts