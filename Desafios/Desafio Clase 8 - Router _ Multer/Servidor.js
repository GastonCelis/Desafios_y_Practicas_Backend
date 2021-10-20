const express = require('express');
const Contenedor = require('./Contenedor');
const productosRouter = require('./router/routerProductos');
const contenedor = new Contenedor('./data/Productos.json');
const server = express();
const PORT = 8080;
const obtenerRandomInferior = (min, max) => Math.round(Math.random() * (max - min + 1)) + min;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/static', express.static('public'));

server.get("/", (req, res)=>{
    res.send({Mensaje: "Hola"})
})

server.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    console.log('productos: ', productos);
    res.json(productos);
});

server.get('/productosRandom', async (req, res) => {
    const productos = await contenedor.getAll();
    const ultimaPosicion = (productos.length) - 1
    const posicionRandom = obtenerRandomInferior(productos[0].id, productos[ultimaPosicion].id);
    res.json(productos[posicionRandom]);
});

const callbackInit = () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
};

server.use("/api/productos", productosRouter)

server.listen(PORT, callbackInit);

server.on('error', (error) => console.log('Error: ', error));