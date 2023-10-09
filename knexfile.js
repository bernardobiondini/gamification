require('dotenv').config();

const knexconfig = {
    client: 'mysql2',
    connection: {
        host : 'localhost',
        port : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'migrations',
        directory: './database/migrations'
    }
};

module.exports = knexconfig;