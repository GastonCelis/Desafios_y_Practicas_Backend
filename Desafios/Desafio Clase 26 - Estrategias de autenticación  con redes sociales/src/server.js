const express = require("express")

const session = require("express-session")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

const { Server: HttpServer} = require("http")
const { Server: IoServer} = require("socket.io")

const faker = require("faker")
const MessageDao = require("./daos/Messages")
const UserDao =require("./daos/Users")
const { isValidPassword, createHash, checkAuthentication } = require("./auth/authIndex")

const authRouter = require("./router/auth")
const homeRouter = require("./router/home")

const messageDao = new MessageDao()
const userDao = new UserDao()

const PORT = 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static( "./public"))

app.use(authRouter)
app.use(homeRouter)

app.use(session({
    secret: "silence",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

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

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on("error", (error) => console.log("Error: ", error));