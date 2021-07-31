const { Users } = require("../models");

const postRegisterUser = async (req, res, next) => {
  try {
    const user = req.body;
    const { email } = user;
    const alreadyExists = await Users.findOne({ where: { email } });
    if (alreadyExists) {
      res.status(302).send("The user already exists");
    } else {
      const newUser = await Users.create(req.body);
      res.status(201).send(newUser);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postRegisterUser,
};
