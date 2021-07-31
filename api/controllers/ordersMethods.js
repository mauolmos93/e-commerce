const { Orders, Users, Shopcarts, Products } = require("../models")


const getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      include: {
        model: Shopcarts,
        include: {
          model: Products,
        }
      }
    })
    res.status(200).send(orders)
  } catch (error) {
    next(error)
  }
}

const postOrder = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload
    const { payment_method, shopcartId } = req.body
    const user = await Users.findByPk(userId)
    if(!user)
      return res.status(400).send("User not found!")
    const shopcart = await Shopcarts.findByPk(shopcartId)
    if(!shopcart)
      return res.status(400).send("Shopcart was not found")
    const order = await Orders.create({ payment_method })
    const linkedShopcart = await order.setShop_cart(shopcart)
    await user.addOrder(order)
    res.status(201).send(linkedShopcart)
  } catch (error) {
    next(error)
  }
}

const putSpecificOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const { state } = req.body
    const order = await Orders.findByPk(orderId, {
      include: {
        model: Shopcarts,
        include: {
          model: Products,
        }
      }
    })
    if(!order)
      return res.status(400).send("Order not found!")
    if(order.state === state)
      return res.status(304).send(order)
    order.state = state
    const modifiedOrder = await order.save()
    res.status(200).send(modifiedOrder)
  } catch (error) {
    next(error)
  }
}

const deleteSpecificOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = await Orders.findByPk(orderId)
    if(!order)
      return res.status(400).send("Order not found!")
    const shopcart = await order.getShop_cart()
    if(!shopcart)
      return res.status(400).send("There is no shopcart linked to this order!.")
    await shopcart.destroy()
    await order.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getOrders,
  postOrder,
  putSpecificOrder,
  deleteSpecificOrder,
}