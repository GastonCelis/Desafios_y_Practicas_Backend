const { Router } = require("express")
const path = require("path")

const authRouter = new Router()

authRouter.get("/", (req, res) => {
    res.redirect("/home")
})

authRouter.get("/login", (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect("/")
    } else {
        res.sendFile(path.join(process.cwd(), "/public/pages/login.html"))
    }
})

authRouter.get("/logout", (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.redirect("/out?name="+nombre)
            } else {
                res.redirect("/")
            }
        })
    } else {
        res.redirect("/")
    }
})

authRouter.get("/out", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/pages/logout.html"))
})

authRouter.post("/login", (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect("/home?name="+req.body.nombre)
})

module.exports = authRouter