const { Router } = require("express")
const { fork } = require("child_process")

const routerRandom = new Router()

const cantDefault = process.env.DEFAULT_CANT

routerRandom.get("/testeo", (req, res) =>{
    res.json({ date: new Date().toLocaleString() })
})

routerRandom.get("/api/randoms", (req, res) => {
    const { cant = cantDefault } = req.query
    const countNumbersRandom = fork("./src/utils/countNumbersRandom.js")

    countNumbersRandom.on("message", msg =>{
        msg === "completed" ? countNumbersRandom.send(cant) : res.send(msg)
    })
})

module.exports = routerRandom
