const express = require('express');
const Contenedor = require('../Contenedor');
const productosContenedor = new Contenedor('./data/Productos.json'); 
const productosRouter = express.Router();

productosRouter.get("/", async(req, res) =>{
    const lista = await productosContenedor.getAll()
    res.send({
        Mensaje : "Productos",
        Datos: lista
    })
});

productosRouter.get("/:id", async(req, res) =>{
    const id = req.params.id;
    const productoId = await productosContenedor.getById(id)
    res.send({
        Mensaje : `Producto: ${id}`,
        Datos: productoId
    })
});

productosRouter.post("/", async(req, res)=>{
    const nuevoProducto = req.body;
    const idProductoNuevo = await productosContenedor.save(nuevoProducto);

    if(!idProductoNuevo){
        res.send({
                Mensaje: 'Error al agregar el producto',
                Datos: idProductoNuevo
            })
    } else{
        res.send({
            Mesaje: "Producto Agregado Correctamente",
            Datos: {
                ...nuevoProducto,
                Id: idProductoNuevo
            }
        })
    }
})

productosRouter.put('/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = req.body;
    const productUpdated = await productosContenedor.update(productoId, producto);

    if (!productUpdated) {
        res.send({
            Mensaje: 'No se encontró el producto',
            Datos: productUpdated
        })
    } else {
        res.send({
            Mensaje: 'La operación se realizó correctamente',
            Datos: productUpdated
        })
    }
});

productosRouter.delete("/:id", async (req, res)=>{
    const productoId = req.params.id;
    const deleteProductId = await productosContenedor.deleteById(productoId)

    if (!deleteProductId) {
        res.send({
            Mensaje: `No se pudo eliminar el producto con el id ${productoId}`,
        })
    } else {
        res.send({
            Mensaje: `Se eliminó el producto con el id ${productoId}`,
        })
    }
})

module.exports = productosRouter;