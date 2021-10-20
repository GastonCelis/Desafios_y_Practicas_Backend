const express = require('express');
const Contenedor = require('./Contenedor');
const productosRouter = require('./router/routerProductos');
const contenedor = new Contenedor('./data/Productos.json');
const server = express();
const PORT = 8080;


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/static', express.static('public'));
server.set('view engine','ejs')


server.get("/", async (req, res)=>{
    const productos = await contenedor.getAll()
    res.render("pages/index", {
        productos
    });
})

server.get('/form', (req, res) => {
    res.render("pages/form", {})
});


const callbackInit = () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
};

server.use("/productos", productosRouter)
server.listen(PORT, callbackInit);
server.on('error', (error) => console.log('Error: ', error));