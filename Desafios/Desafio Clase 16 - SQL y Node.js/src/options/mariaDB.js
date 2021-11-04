const knex = require('knex')(
    {
        client: 'mysql',
        connection: {
                host: 'localhost',
                user: 'root',
                port: 3306,
                password: '',
                database: 'products_mariadb'
            },
        pool: { min: 0, max: 7 }
    }
)

module.exports = knex