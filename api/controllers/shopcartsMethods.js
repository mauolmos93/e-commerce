const { Op } = require("sequelize");
const { Shopcarts, Products, ShopcartItems } = require("../models");

const getShopcarts = async (req, res, next) => {
  try {
    const shopcarts = await Shopcarts.findAll({
      include: {
        model: Products
      }
    });
    res.status(200).send(shopcarts);
  } catch (error) {
    next(error)
  }
};

const getShopcart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shopCart = await Shopcarts.findOne({
      where: { id },
    });
    if(!shopCart)
      return res.status(400).send("Shopcart not found")
    const products = await shopCart.getProducts()
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

const postShopcart = async (req, res, next) => {
  try {
    const productsInfoArray = req.body;
    const productsIds = productsInfoArray.map(product => product.id)
    const productsQuantities = productsInfoArray.map(product => product.quantity)
    const products = await Products.findAll({
      where: {
        id: {
          [Op.or] : productsIds
        }
      }
    })

    const prices = products.map(product => product.price);
    const total_price = prices.map((price, i) => price * productsQuantities[i]).reduce((accumulator, price) => accumulator + price)
    const emptyShopcart = await Shopcarts.create({ total_price })
    const shopcart = await emptyShopcart.addProducts(products)
    shopcart.forEach(async (shopcartItem, i) => {
      try {
        if(shopcartItem.quantity !== productsQuantities[i]){
          shopcartItem.quantity = productsQuantities[i]
          await shopcartItem.save()
        }
      } catch (error) {
        console.log(error)
      }
    });

    res.status(201).send(shopcart);
  } catch (error) {
    next(error)
  }
};



const putShopCartProduct = async (req, res, next) => {
  try {
    const { shopcartId, productId } = req.params
    const { quantity } = req.body
    if( quantity <= 0 )
      return res.status(400).send("Quantity cannot be zero or negative")
      const product = await Products.findByPk(productId)
      if(!product)
        return res.status(400).send("Product not found")
      const shopCart = await Shopcarts.findByPk(shopcartId)
      if(!shopCart)
        return res.status(400).send("Shopcart not found")
    const shopcart_item = await ShopcartItems.findOne({
      where: { productId }
    })
    if(quantity === shopcart_item.quantity)
      return res.status(304).send("Quantity was not modified")
/*     
    console.log("SHOP CART ITEM.QUANTITY", shopcart_item.quantity)
    console.log("QUANTITY", quantity)
    console.log("PARAMS", req.params)
    console.log("TOTAL PRICE", shopCart.total_price)
    console.log("PRECIO PRODUCTO", product.price)
    console.log("SHOP CART ITEM", shopcart_item) */
    const total_price = shopcart_item.quantity > quantity
                          ? shopCart.total_price - product.price * (shopcart_item.quantity - quantity)
                          : shopCart.total_price + product.price * (quantity - shopcart_item.quantity) 
    console.log("FINAL TOTAL PRICE", total_price)                      
    shopCart.total_price = total_price
    await shopCart.save()
    shopcart_item.quantity = quantity
    await shopcart_item.save()
    res.status(200).send(shopcart_item);
  } catch (error) {
    next(error)
  }
};

const putShopcart = async (req, res, next) => {
  try {
    const { shopCartId } = req.params
    const modifications = req.body
    /* console.log(modifications) */
    const shopcart = await Shopcarts.findByPk(shopCartId)
    if(!shopcart)
      return res.status(400).send("Shopcart not found!")
    const shopcartItems = await ShopcartItems.findAll({ where: { shopCartId } })
    shopcartItems.forEach(async (shopcartItem, i) => {
      try {
        const product = await Products.findByPk(shopcartItem.productId)
        /* console.log("shopcartItem.quantity ->", shopcartItem.quantity)
        console.log('modifications[i].quantity ->', modifications[i].quantity)
        console.log({antes: shopcart.total_price}) */
        const total_price = shopcartItem.quantity > modifications[i].quantity
                              ? shopcart.total_price - product.price * (shopcartItem.quantity - modifications[i].quantity)
                              : shopcart.total_price + product.price * (modifications[i].quantity - shopcartItem.quantity)
        if(modifications[i].quantity === 0) {
          await shopcart.removeProduct(product)
        } else {
          shopcartItem.quantity = modifications[i].quantity
        }
        shopcart.total_price = total_price
        await shopcart.save()
        /* console.log({despues: shopcart.total_price}) */
        await shopcartItem.save()
      } catch (error) {
        next(error)
      }
    });
    res.status(200).send(shopcartItems)
  } catch (error) {
    next(error)
  }
}




/* const putShopcart = async (req, res, next) => {
  try {
    const { shopCartId } = req.params
    const modifications = req.body
    const shopcart = await Shopcarts.findByPk(shopCartId)
    if(!shopcart)
      return res.status(400).send("Shopcart not found!")
    const shopcartItems = await ShopcartItems.findAll({ where: { shopCartId } })
    shopcartItems.forEach(async (shopcartItem, i) => {
      try {
        shopcartItem.quantity = modifications[i].quantity
        if(modifications[i].quantity === 0) {
          const product = await Products.findByPk(shopcartItem.productId)
          await shopcart.removeProduct(product)
        }
        await shopcartItem.save()
      } catch (error) {
        next(error)
      }
    });
    res.status(200).send(shopcartItems)
  } catch (error) {
    next(error)
  }
} */



const deleteShopcartProduct = async (req, res, next) => {
  try {
    const { shopcartId, productId } = req.params
    //sin user
    const shopCart = await Shopcarts.findByPk(shopcartId)
    if(!shopCart)
      return res.status(400).send("Shopcart not found")
    const product = await shopCart.getProducts({ where: { id: productId } })
    // console.log("product ->", product)
    if(!product.length)
      return res.status(400).send("Product not found")
    await shopCart.removeProduct(product)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

const deleteShopCart = async (req, res, next) => {
  try {
    const {shopcartId} = req.params
    const shopCart = await Shopcarts.findByPk(shopcartId)
    if (!shopCart) {
      return res.status(400).send("ShopCart not found")
    }
    await shopCart.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getShopcarts,
  getShopcart,
  putShopCartProduct,
  putShopcart,
  postShopcart,
  deleteShopcartProduct,
  deleteShopCart,
};