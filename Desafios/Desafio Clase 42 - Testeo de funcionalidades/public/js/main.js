const socket = io.connect()

const schemaAuthor = new normalizr.schema.Entity("author", {}, {idAttribute: "email"})
const schemaMessage = new normalizr.schema.Entity("message", {
    author: schemaAuthor
})
const schemaMessages = new normalizr.schema.Entity("messages", {
    messages: [schemaMessage]
})
const messageNormalize = (message) => normalizr.normalize(message, schemaMessages)

const agregarMensaje = (event) =>{
    event.preventDefault()
    
    const mensaje = {
        author: {
            id: document.getElementById("emailChat").value,
            nombre: document.getElementById("nombreChat").value,
            apellido: document.getElementById("apellidoChat").value,
            edad: document.getElementById("edadChat").value,
            alias: document.getElementById("aliasChat").value,
            avatar: document.getElementById("avatarChat").value
        },
        text: document.getElementById("textChat").value,
        date: new Date().toLocaleString()
    }

    if(document.getElementById("emailChat").value === "" || document.getElementById("nombreChat").value === ""
    || document.getElementById("apellidoChat").value === "" || document.getElementById("edadChat").value === ""
    || document.getElementById("aliasChat").value === "" || document.getElementById("avatarChat").value === ""
    || document.getElementById("textChat").value === ""){
        alert("Los campos para enviar mensajes estan incompletos")
    } else {
        socket.emit("nuevoMensaje", mensaje)

        document.getElementById("textChat").value = ""
    }
    
}

socket.on("mensajes", data =>{
    const normalizedMessages = messageNormalize({ id: "messages", data })
    const dataDenormalized = normalizr.denormalize(normalizedMessages.result, schemaMessages, normalizedMessages.entities)
    const compresion = Math.round(100 - (((JSON.stringify(dataDenormalized).length) * 100) / JSON.stringify(normalizedMessages).length))

    const procentajeNormDes = `
        <h2>Data Normalizada: ${JSON.stringify(normalizedMessages).length}</h2>
        <h2>Data Desnormalizada: ${JSON.stringify(dataDenormalized).length}</h2>
        <h2>Porcentaje de Compresión: % ${compresion}</h2>
    `

    const mensajesHtml = data.map( mensajes => {
        return(`
            <div class="burbujaChat">
                <strong class="email">${mensajes.author.id} <span class="fecha">[${mensajes.date}]</span>: </strong>
                <span class="letraMensaje">${mensajes.text}</span>
            </div>
        `)
    }).join(" ")

    const listaMensajesHtml = document.getElementsByClassName("mensajes")
    listaMensajesHtml[0].innerHTML = `${mensajesHtml}`
    listaMensajesHtml[0].scrollTop = listaMensajesHtml[0].scrollHeight

    const porcentaje = document.getElementsByClassName("porcentaje-Normalizacion")
    porcentaje[0].innerHTML = `${procentajeNormDes}`
})

const formularioChat = document.getElementsByClassName("formularioChat")
formularioChat[0].addEventListener("submit", agregarMensaje)



/*const agregarProducto = (event) =>{
    event.preventDefault()

    const producto = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    if(document.getElementById("title").value === "" || document.getElementById("price").value === "" || document.getElementById("thumbnail").value === ""){
        alert("Los campos para cargar el producto estan incompletos")
    } else {
        socket.emit("nuevoProducto", producto)

        document.getElementById("title").value = ""
        document.getElementById("price").value = ""
        document.getElementById("thumbnail").value = ""
    }
}

const formularioProducto = document.getElementsByClassName("formularioProducto")
formularioProducto[0].addEventListener("submit", agregarProducto)

socket.on("productos", data =>{
    const productosHtml = data.map(producto =>{
        return(`
            <tr>
                <td>${producto.title}</td>
                <td>${producto.price}</td>
                <td><img src="${producto.thumbnail}" width="50" height="50"></td>
            </tr>
        `)
    }).join(" ")

    const listaProductosHtml = document.getElementsByClassName("productosTabla")
    listaProductosHtml[0].innerHTML = `${productosHtml}`
})*/

const queryNombre = window.location.search
const cantidadCaractares = queryNombre.length
const nombre = queryNombre.substring(6, cantidadCaractares)
const bienvenido = document.getElementById("bienvenido")
const htmmlBien = `
    <div class="fila">
        <h1>Bienvenid@ ${nombre}</h1>
        <a class="btn btn-warning" href="/logout">Desloguearse</a>
    </div>
`
bienvenido.innerHTML = `${htmmlBien}`