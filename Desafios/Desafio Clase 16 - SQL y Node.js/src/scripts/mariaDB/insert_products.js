const {options} = require("../../options/mariaDB")
const knex = require("knex")(options)

const products = [
    {   
        title: "Campera Moto",
        price: 25000,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_692012-MLA44676907607_012021-W.jpg"
    },
    {
        title: "Moto",
        price: 500000,
        thumbnail: "https://tiendup.cdn.appdomain.cloud/business/86/products/DRqG3g_5c9960ba13522_large.jpg"
    },
    {
        title: "Casco Moto",
        price: 30000,
        thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/940/460/products/352_tribal_51-c6f0cf4fee02942d0d15857476903749-480-0.jpg"
    }
]


knex("products").insert(products)
    .then(() => console.log("Data inserted in table products"))
    .catch( error => { console.log(error); throw error })
    .finally(() => { knex.destroy() })