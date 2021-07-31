const S = require("sequelize")
const db = require("../db")

class ShopcartItems extends S.Model {}

ShopcartItems.init({
  quantity: {
    type: S.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, { sequelize: db, modelName: 'shop_cart_items', timestamps: false })

module.exports = ShopcartItems

/* ShopcartItems.addHook("beforeBulkCreate", async shopcartItems => {
  try {
    console.log("shopcartItem beforeBulkCreate ->", shopcartItems) //Es un arreglo :o
    
  } catch (error) {
    console.log(error)
  }
})

ShopcartItems.addHook("beforeValidate", async shopcartItem => {
  console.log("shopcartItem beforeValidate ->", shopcartItem)
  const quantity = await ShopcartItems.count({ where: { productId: shopcartItem.productId }})
  console.log("quantity ->", quantity)
  if(quantity)
    await shopcartItem.destroy()
})

ShopcartItems.addHook("beforeUpdate", async shopcartItem => {
  console.log("shopcartItem beforeUpdate ->", shopcartItem)
}) */