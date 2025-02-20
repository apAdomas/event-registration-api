const { Sequelize } = require('sequelize');

const {
    SQL_USERNAME,
    SQL_PASSWORD,
    SQL_DATABASE_NAME,
    SQL_HOST,
    SQL_PORT,
    SQL_DIALECT,
    SQL_SSL_REQUIRE,
    SQL_SSL_REJECT_UNAUTHORIZED
} = process.env

const sequelize = new Sequelize(SQL_DATABASE_NAME, SQL_USERNAME, SQL_PASSWORD, {
    host: SQL_HOST,
    port: SQL_PORT,
    dialect: SQL_DIALECT || 'postgres',
    dialectOptions: {
        ssl: {
            required: SQL_SSL_REQUIRE === 'true',
            rejectUnauthorized: SQL_SSL_REJECT_UNAUTHORIZED === 'true',
        },
    },
    logging: false,
});
console.log({ SQL_SSL_REQUIRE, SQL_SSL_REJECT_UNAUTHORIZED });

module.exports = sequelize;