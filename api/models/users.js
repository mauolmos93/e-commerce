const crypto = require("crypto");
const S = require("sequelize");
const db = require("../db");

class Users extends S.Model {}

Users.init(
  {
    user_name: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    first_name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    full_name: {
      type: S.VIRTUAL,
      get() {
        return `${this.first_name} ${this.last_name}`;
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
    user_address: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    shipping_address: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone_number: {
      type: S.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
      },
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    is_admin: {
      type: S.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    salt: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "users", timestamps: false }
);

//-----------------------------------------------------------//
//                      Hooks
//-----------------------------------------------------------//

Users.addHook("beforeValidate", (user) => {
  user.salt = crypto.randomBytes(20).toString("hex");
  user.password = user.hashPassword(user.password);
});

//-----------------------------------------------------------//
//               Métodos de instancia
//-----------------------------------------------------------//

Users.prototype.hashPassword = function (password) {
  return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
};

Users.prototype.validPassword = function (loginPassword) {
  return this.password == this.hashPassword(loginPassword);
};

//-----------------------------------------------------------//

module.exports = Users;
