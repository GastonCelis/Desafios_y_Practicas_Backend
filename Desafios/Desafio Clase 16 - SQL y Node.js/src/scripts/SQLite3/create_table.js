const {options} = require("../../options/SQLite3")
const knex = require("knex")(options)

knex.schema.createTable("messages", table => {
    table.increments("id")
    table.string("author")
    table.string("text")
    table.date("date")
})
    .then(() => console.log("Table messages created"))
    .catch( error => { console.log(error); throw error })
    .finally(() => { knex.destroy() })