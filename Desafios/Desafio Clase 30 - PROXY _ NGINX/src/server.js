const express = require("express")
const dotenv = require("dotenv").config()
const cluster = require("cluster")

const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const { Server: HttpServer} = require("http")
const { Server: IoServer} = require("socket.io")

const faker = require("faker")
const MessageDao = require("./daos/Messages")
const UserDao =require("./daos/Users")
const { isValidPassword, createHash } = require("./auth/authIndex")

const authRouter = require("./router/auth")
const homeRouter = require("./router/home")
const randomRouter = require("./router/random")
const inforRouter = require("./router/info")

const messageDao = new MessageDao()
const userDao = new UserDao()

const PORT = parseInt(process.argv[2]) || 8081
const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

const numCPUs = require("os").cpus().length
const isCluster = process.argv[2] === "CLUSTER"

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static( "./public"))

app.use(authRouter)
app.use(homeRouter)
app.use(randomRouter)
app.use(inforRouter)

app.use(session(process.env.SESSION))

app.use(passport.initialize())
app.use(passport.session())

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
    },
    (req, username, password, done) => {
        const findUser = userDao.readOneUser(username)

        if(findUser){
            return done(null, false)
        }

        if(findUser === error){
            return done(error)
        }

        const newUser = {
            username: username,
            password: createHash(password),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
        
        const newUserCreated = userDao.create(newUser)

        if(newUserCreated === error){
            return done(error)
        } else {
            return done(null, newUserCreated)
        }
    })
)

passport.use("login", new LocalStrategy(
    (username, password, done) => {
        const findUser = userDao.readOneUser(username)

        if(!findUser){
            return done(null, false)
        }

        if(findUser == error){
            return done(error)
        }

        if (!isValidPassword(user, password)) {
            return done(null, false)
        }

        return done(null, findUser)
    })
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    userDao.readById(id, done)
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


if(cluster.isMaster && isCluster) {
    console.log(`Cantidad de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", worker => {
        console.log("Worker", worker.process.pid, "died", new Date().toLocaleString())
        cluster.fork()
    })
}

else {
    app.get("/", (req,res) => {
        res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })

    app.get("/api/randoms", (req,res) => {
        res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })

    app.get("/info", (req,res) => {
        res.send(`
            Servidor express en ${PORT} -<br>
            PID ${process.pid}<br>
            -${new Date().toLocaleString()}<br>
            Cantidad de procesadores: ${numCPUs}
            `)
    })

    app.listen(PORT, err => {
        if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}
