const socket = io.connect()

const agregarMensaje = (event) =>{
    event.preventDefault()
    
    const mensaje = {
        author: document.getElementById("authorChat").value,
        text: document.getElementById("textChat").value
    }

    socket.emit("nuevoMensaje", mensaje)
}

const formularioChat = document.getElementsByClassName("formularioChat")
formularioChat[0].addEventListener("submit", agregarMensaje)

socket.on("mensajes", data =>{
    const mensajesHtml = data.map( mensajes => {
        return(`
            <div>
                <strong>${mensajes.author}</strong>
                <em>${mensajes.text}</em>
            </div>
        `)
    }).join(" ")

    const listaMensajesHtml = document.getElementsByClassName("mensajes")

    listaMensajesHtml[0].innerHTML = `${mensajesHtml}`
})

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
})