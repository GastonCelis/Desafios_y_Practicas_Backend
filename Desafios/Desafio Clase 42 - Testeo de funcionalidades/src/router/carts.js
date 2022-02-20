const express = require("express")

const { Router } = express

const cartsRouter = new Router()

const cartsController = require("../controllers/carts")

cartsRouter.get('/', cartsController.readAll)

cartsRouter.post('/', cartsController.create)

cartsRouter.delete('/:id', cartsController.deleteAll)

cartsRouter.get('/:id/productos', cartsController.readById)

cartsRouter.post('/:id/productos', cartsController.update)

cartsRouter.delete('/:id/productos/:idProd', cartsController.deleteById)

export default cartsRouter