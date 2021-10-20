const express = require("express")
const {Server: SocketServer} = require("socket.io")
const {Server: HttpServer} = require("http")
const { getMessages } = require("./public/js/main")



const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', getMessages);
});

app.use(express.static("public"))

const PORT = 8080
httpServer.listen(PORT, function() {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
