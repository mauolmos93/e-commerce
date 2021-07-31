const Categories = require("./categories");
const Orders = require("./orders");
const Products = require("./products");
const Shopcarts = require("./shopCarts");
const ShopcartItems = require("./shopCartItems");
const Users = require("./users");

// Relaciones
Products.hasMany(Categories);
Shopcarts.belongsToMany(Products, { through: ShopcartItems, uniqueKey: false });
Users.hasMany(Orders);
Orders.hasOne(Shopcarts);

module.exports = {
  Categories,
  Orders,
  Products,
  Shopcarts,
  ShopcartItems,
  Users,
};
