const S = require("sequelize")
const db = require("../db")

class Shopcarts extends S.Model {}

Shopcarts.init({
  total_price: {
    type: S.FLOAT,
    allowNull: false,
    validate: {
      min: 1
    }
  },
}, { sequelize: db, modelName: 'shop_carts' })

module.exports = Shopcarts;

