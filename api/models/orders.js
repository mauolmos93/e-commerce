const S = require("sequelize");
const db = require("../db");

class Orders extends S.Model {}

Orders.init({
    payment_method: {
        type: S.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
          },
      },
      state: {
        type: S.STRING,
        allowNull: false,
        defaultValue: "pending",
      }
},{sequelize: db, modelName: "orders"})

module.exports = Orders;