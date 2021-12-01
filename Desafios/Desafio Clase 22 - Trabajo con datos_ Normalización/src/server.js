const express = require("express")
const { Server: HttpServer} = require("http")
const { Server: IoServer} = require("socket.io")

const faker = require("faker")
const MessageDao = require("./daos/Messages")

const messageDao = new MessageDao()

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

app.get("/api/productos-test", (req, res) => {
    const productos = [... new Array(5)].map((_, index) =>({
        id: index,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }))

    res.json(productos)
})

io.on("connection", async (socket) =>{
    console.log(`Nuevo Usuario Conectado ID: ${socket.id}`)

    const mensajes = await messageDao.readAll()
    socket.emit("mensajes", mensajes)
    socket.on("nuevoMensaje", async data => {
        await messageDao.create(data)
        const mensajes = await messageDao.readAll()
        io.sockets.emit("mensajes", mensajes)
    })
})

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', (error) => console.log('Error: ', error));