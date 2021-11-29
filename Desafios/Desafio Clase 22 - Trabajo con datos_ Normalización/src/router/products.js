const express = require("express")
const Product = require("../daos/Product")

const routerProducts = express.Router()

const productDao = new Product()

routerProducts.get("/", async (req, res) =>{
    const products = await productDao.readAll()
    res.send({ products })
})

routerProducts.get("/:id", async (req, res) =>{
    const id = req.params.id
    const product = await productDao.readById(id)
    res.send({ product })
})

routerProducts.post("/", isAdmin, async (req, res) =>{
    const newProduct = req.body
    const productSaved = await productDao.create(newProduct)
    res.send({ ID_New_Product: productSaved })
})

routerProducts.put("/:id", isAdmin, async (req, res) =>{
    const idProduct = req.params.id
    const newProduct = req.body
    const updatedProduct = await productDao.update(idProduct, newProduct)

    if(updatedProduct === false){
        res.send({
            Mensaje: `No se pudo actualizar, producto no exitente o datos incorrectos`
        })
    } else {
        res.send({
            Mensaje: `Producto en ID: ${idProduct}, Actualizado`
        })
    }
})

routerProducts.delete("/", isAdmin, async (req, res) => {
    await productDao.deleteAll()
})

routerProducts.delete("/:id", isAdmin, async (req, res) => {
    const productId = req.params.id
    const productDelete = await productDao.deleteById(productId)
    console.log(productDelete)
})

module.exports = routerProducts