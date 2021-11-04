const knex = require("../../options/mariaDB")

knex.schema.createTable("products", table => {
    table.increments("id")
    table.string("title")
    table.float("price")
    table.string("thumbnail")
})
    .then(() => console.log("Products table created"))
    .catch( error => { console.log(error); throw error })
    .finally(() => { knex.destroy() })