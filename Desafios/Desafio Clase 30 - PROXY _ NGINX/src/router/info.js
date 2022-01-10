const { Router } = require("express")

const infoRouter = new Router()

infoRouter.get("/info", (req, res) => {
    res.send({
        Nombre_de_la_plataforma: process.platform,
        Version_de_NodeJs: process.version,
        Memoria_total_reservada: process.memoryUsage(),
        Path_de_ejecucion: process.execPath,
        Process_ID: process.pid,
        Carpeta_del_proyecto: process.cwd()
    })
})

module.exports = infoRouter