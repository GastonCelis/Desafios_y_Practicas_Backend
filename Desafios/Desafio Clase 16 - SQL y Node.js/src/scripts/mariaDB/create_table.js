const {options} = require("../../options/mariaDB")
const knex = require("knex")(options)

knex.schema.createTable("products", table => {
    table.increments("id")
    table.string("title")
    table.integer("price")
    table.string("thumbnail")
})
    .then(() => console.log("Table products created"))
    .catch( error => { console.log(error); throw error })
    .finally(() => { knex.destroy() })