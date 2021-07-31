const Sequelize = require("sequelize");

const client = new Sequelize("postgres://postgres:postgres@localhost/ecommerce", {
  logging: false,
  dialect: "postgres"
})

module.exports = client;