const Contenedor = require("./Contenedor");

const nuevoContenedor = new Contenedor ("./Productos.json");

const nuevoProducto = {"title": "Moto", "price": 400000, "thumbnail": "https://www.globalbajaj.com/media/25063/web_ns200fi_seccion.jpg"}


const main = async() => {
    const id= await nuevoContenedor.save(nuevoProducto);
    console.log(id);

    const todosLosProductos = await nuevoContenedor.getAll();
    console.log(todosLosProductos);

    const productoPorId = await nuevoContenedor.getById(1);
    console.log(productoPorId)

    const borrarPorId = await nuevoContenedor.deleteById(0);

    await nuevoContenedor.deleteAll();
};

main();