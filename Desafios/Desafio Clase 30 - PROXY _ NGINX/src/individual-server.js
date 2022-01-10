const express = require("express")

const app = express()

const PORT = 8080

app.get("/", (req,res) => {
    res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

app.get("/api/randoms", (req, res) => {
    const { cant = cantDefault } = req.query
    const countNumbersRandom = fork("./src/utils/countNumbersRandom.js")

    countNumbersRandom.on("message", msg =>{
        msg === "completed" ? countNumbersRandom.send(cant) : res.send(msg)
    })
})

app.listen(PORT, err => {
    if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
})