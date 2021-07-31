const { Users, Shopcarts, Products } = require("../models");

const editUser = async (req, res, next) => {
  try {
    const user = await Users.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      hooks:false,
    }); 
    const updated = user[0] //Es un 0 sí no se encontró
    if(!updated)
      res.status(404).send("User not found")
    res.status(200).send(user)
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req,res,next) => {
  try {
    const users = await Users.findAll()
      res.status(200).send(users)
  } catch (error) {
    next(error)
  }
}

const getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await Users.findByPk(userId)
    if(!user)
      return res.status(404).send("User not found!")
    const orders = await user.getOrders({
      include: {
        model: Shopcarts,
        include: {
          model: Products,
        }
      }
    })
    if(!orders.length)
      return res.status(400).send("There are not orders for this user!.")
    res.status(200).send(orders)
  } catch (error) {
    next(error)
  }
}

const getUserCompletedOrders = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await Users.findByPk(userId)
    if(!user)
      return res.status(404).send("User not found!")
    const orders = await user.getOrders({
      where: {
        state: 'fulfilled'
      },
      include: {
        model: Shopcarts,
        include: {
          model: Products,
        }
      }
    })
    if(!orders.length)
      return res.status(400).send("There are not completed orders for this user!.")
    res.status(200).send(orders)
  } catch (error) {
    next(error)
  }
}

const getUserPendingOrders = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await Users.findByPk(userId)
    if(!user)
      return res.status(404).send("User not found!")
    const orders = await user.getOrders({
      where: {
        state: 'pending'
      },
      include: {
        model: Shopcarts,
        include: {
          model: Products,
        }
      }
    })
    if(!orders.length)
      return res.status(400).send("There are not pending orders for this user!.")
    res.status(200).send(orders)
  } catch (error) {
    next(error)
  }
}


const getUser = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const user = await Users.findOne({
      where: { id: userId },
      attributes: { exclude: ["password", "salt"] },
    });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
  const destroyedUser = await Users.destroy({
    where:{id : req.params.id}
  })   
  destroyedUser ? res.sendStatus(204) : res.sendStatus(404)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  editUser,
  getUser,
  getAllUsers,
  getUserOrders,
  getUserCompletedOrders,
  getUserPendingOrders,
  deleteUser
};
