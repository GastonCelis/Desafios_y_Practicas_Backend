const queryNombre = window.location.search
const cantidadCaractares = queryNombre.length
const nombre = queryNombre.substring(6, cantidadCaractares)
const deslogueo = document.getElementById("logout")
const htmlDes = `
    <div class="container logout">
        <h1>Hasta Luego ${nombre}</h1>
    </div>
`
deslogueo.innerHTML = `${htmlDes}`

setTimeout(() => {
    location.href = '/'
}, 2000)