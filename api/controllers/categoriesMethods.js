const { Categories } = require("../models");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.findAll({
      attributes: {
        exclude: ['id', 'productId']
      }
    })
    const filteredCategories = []
    categories.forEach(({name}) => {
      /* console.log(name) */
      if(!filteredCategories.includes(name))
        filteredCategories.push(name)
    })
    /* console.log(filteredCategories) */ // ['Hoodie', 'Jeans', etc]
    /* const finalCategories = filteredCategories.map(category => ({ name: category })) */
    const finalCategories = { categories: filteredCategories }
    res.status(200).send(finalCategories)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategories,
}