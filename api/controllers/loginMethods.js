const jwt = require("jsonwebtoken")
const { Users } = require("../models");

const postLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password)
      res.status(400).send("Email or password cannot be null")
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(400).send("User doesn't exists");
    if (!user.validPassword(password))
      return res.status(401).send("Invalid password");
    const token = jwt.sign({ userId: user.id }, "plataforma5");
    const { id, full_name, user_name, first_name, last_name, user_address, shipping_address, phone_number, is_admin } = user;
    return res.status(200).send({ id, email, full_name, user_name, first_name, last_name, user_address, shipping_address, phone_number, is_admin, token });
  } catch(error) {
    next(error)
  }
};

module.exports = {
    postLoginUser
};
