const S = require("sequelize");
const db = require("../db");

class Categories extends S.Model {}

Categories.init({
    name: {
        type: S.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      /* NO SABEMOS SI INCLUIR EL INCON */
    // icon: {
    //     type: S.STRING,
    //     allowNull: false,
    //   },
},{ sequelize: db, modelName: "categories", timestamps: false })

module.exports = Categories;