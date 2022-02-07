const Product = require("../daos/Product")

const productDao = new Product()

const readAll = async (req, res) =>{
    const products = await productDao.readAll()
    res.send({ products })
}

const readById = async (req, res) =>{
    const id = req.params.id
    const product = await productDao.readById(id)
    res.send({ product })
}

const create = async (req, res) =>{
    const newProduct = req.body
    const productSaved = await productDao.create(newProduct)
    res.send({ ID_New_Product: productSaved })
}

const update = async (req, res) =>{
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
}

const deleteAll = async (req, res) => {
    await productDao.deleteAll()
}

const deleteById = async (req, res) => {
    const productId = req.params.id
    const productDelete = await productDao.deleteById(productId)
    console.log(productDelete)
}

module.exports ={
    readAll,
    readById,
    create,
    update,
    deleteAll,
    deleteById
}