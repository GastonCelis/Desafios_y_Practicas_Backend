const knex = require("../../options/SQLite3")

knex.schema.createTable("messages", table => {
    table.increments("id")
    table.string("author")
    table.string("text")
    table.date("date")
})
    .then(() => console.log("Messages table created"))
    .catch( error => { console.log(error); throw error })
    .finally(() => { knex.destroy() })