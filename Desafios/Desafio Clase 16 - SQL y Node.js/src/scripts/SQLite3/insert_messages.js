const {options} = require("../../options/mariaDB")
const knex = require("knex")(options)

const messages = [

]


knex("products").insert(messages)
    .then(() => console.log("Data inserted in table messages"))
    .catch( error => { console.log(error); throw error })
    .finally(() => { knex.destroy() })