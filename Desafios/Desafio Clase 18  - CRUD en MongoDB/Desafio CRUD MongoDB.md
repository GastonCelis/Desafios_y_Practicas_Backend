mongo

use ecommerce

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Crear las colecciones "Mensajes" y "Productos"--

db.createCollection("messages")

db.createCollection("products")

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Agregar 10 documentos con sus claves--

db.messages.insertMany([
    {author: "juan@gmail.com", text: "Hola", date: "24/10/2021 12:36:06"},
    {author: "pedro@gmail.com", text: "Hola ¿todo bien?", date: "24/10/2021 12:38:06"},
    {author: "maria@gmail.com", text: "¿como estan?", date: "24/10/2021 12:40:06"},
    {author: "gaston@gmail.com", text: "¿que hacen?", date: "24/10/2021 12:45:06"},
    {author: "marcos@gmail.com", text: "Holaaaa", date: "24/10/2021 12:50:06"},
    {author: "lili@gmail.com", text: "Hola a todos", date: "24/10/2021 12:55:06"},
    {author: "fernanda@gmail.com", text: "Hola chicos", date: "24/10/2021 12:56:06"},
    {author: "belen@gmail.com", text: "Hola que onda?", date: "24/10/2021 12:57:06"},
    {author: "raul@gmail.com", text: "buenas", date: "24/10/2021 12:58:06"},
    {author: "hector@gmail.com", text: "Hola hola", date: "24/10/2021 12:59:06"}
])

db.products.insertMany([
    {timestamp: 1635723518840, name: "Casco", description: "Negro", code: 100, price: 100, stock: 10, photo: "imagen1"},
    {timestamp: 1635723518841, name: "Guante", description: "Negro y azul", code: 101, price: 1000, stock: 10, photo: "imagen2"},
    {timestamp: 1635723518842, name: "Manopla", description: "Negro y rojo", code: 102, price: 5000, stock: 10, photo: "imagen3"},
    {timestamp: 1635723518843, name: "Visera", description: "Negra", code: 103, price: 115, stock: 10, photo: "imagen4"},
    {timestamp: 1635723518844, name: "Anillo", description: "Oro", code: 104, price: 3255, stock: 10, photo: "imagen5"},
    {timestamp: 1635723518845, name: "Remera", description: "Blanca", code: 105, price: 2001, stock: 10, photo: "image6"},
    {timestamp: 1635723518846, name: "Pantalon", description: "Azul", code: 106, price: 500, stock: 10, photo: "imagen7"},
    {timestamp: 1635723518847, name: "Cubierta", description: "Goma", code: 107, price: 900, stock: 10, photo: "imagen8"},
    {timestamp: 1635723518848, name: "Protecciones", description: "Espalda", code: 108, price: 1593, stock: 10, photo: "imagen9"},
    {timestamp: 1635723518849, name: "Cuello Polar", description: "Amarillo", code: 109, price: 4520, stock: 10, photo: "imagen10"}
])

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Listar los documentos de las colecciones--

db.messages.find().pretty()

db.products.find().pretty()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Mostrar la cantidad de documentos--

db.messages.count()

db.products.count()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Agregar un producto mas en la coleccion de "Productos"--

db.products.insertOne({timestamp: 1635723518850, name: "Camiseta", description: "Rallada", code: 110, price: 2480, stock: 10, photo: "imagen11"})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Listar productos con precion menor a 1000--

db.products.find({price: {$lt: 1000}})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Listar productos con precio entre 1000 a 3000--

db.products.find({$and: [{price: {$gt: 1000}}, {price: {$lt: 3000}}]})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Listar productos con precio mayor a 3000--

db.products.find({price: {$gt: 3000}})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--El nombre del tercer producto mas barato--

db.products.find({}, {name: 1, _id: 0}).sort({price: 1}).skip(2).limit(1)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Actualizacion de los productos agregando el stock en 100--

db.products.updateMany({}, {$set: {stock: 100}})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Cambiar el stock a 0 de los productos mayores a 4000--

db.products.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Borrar productos con precio menor a 1000--

db.products.deleteMany({price: {$lt: 1000}})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Crear Usuario = "pepe", Contraseña = "asd456", que solo pueda leer--

use admin

db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            {role: "read", db: "ecommerce"}
        ]
    }
)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
--Verificar que pepe no pueda cambiar la informacion--

mongo -u pepe -p asd456

use ecommerce

db.messages.find().pretty()

db.products.insertOne({timestamp: 1635723518851, name: "Pañuelo", description: "Rojo", code: 111, price: 1500, stock: 10, photo: "imagen12"})

db.products.deleteMany({photo: "imagen12"})