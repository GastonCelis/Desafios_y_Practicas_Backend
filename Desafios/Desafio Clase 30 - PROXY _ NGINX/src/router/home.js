const { Router } = require("express")
const { webAuth } = require("../auth/authIndex")
const path = require("path")

const productosRouter = new Router()

productosRouter.get("/home", webAuth, (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/pages/index.html"))
})

module.exports = productosRouter