const express = require("express")
const { Server: HttpServer} = require("http")
const { Server: IoServer} = require("socket.io")
const knexSQLite3 = require("./options/SQLite3")
const knexMariaDB = require("./options/mariaDB")

const contenedor = require("../Container")
const contenedorProductos = new contenedor(knexMariaDB)
const contenedorMensajes = new contenedor(knexSQLite3)

const PORT = 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static( "./public"))

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname})
})

io.on("connection", async (socket) =>{
    console.log(`Nuevo Usuario Conectado ID: ${socket.id}`)
    const tableProducts = "products"
    const tableMessages = "messages"

    const mensajes = await contenedorMensajes.getAll(tableMessages)
    socket.emit("mensajes", mensajes)
    socket.on("nuevoMensaje", async data => {
        await contenedorMensajes.save(tableMessages, data)
        const mensajes = await contenedorMensajes.getAll(tableMessages)
        io.sockets.emit("mensajes", mensajes)
    })


    const productos = await contenedorProductos.getAll(tableProducts)
    socket.emit("productos", productos)
    socket.on("nuevoProducto", async data => {
        await contenedorProductos.save(tableProducts, data)
        const productos = await contenedorProductos.getAll(tableProducts)
        io.sockets.emit("productos", productos)
    })
})

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', (error) => console.log('Error: ', error));