const { Products, Categories } = require("../models");
const { Op } = require("sequelize");

//---------------------- GET ---------------------------//


const getProducts = async (req, res, next) => {
  try {
    const products = await Products.findAll({
      include: {
        model: Categories,
        attributes: ["name"]
      }
    })
    res.status(200).send(products)
  } catch (error) {
    next(error)
  }
};

const getProductsId = async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id)
    if(!product)
      res.status(404).send("Product doesn't exists")
    res.status(200).send(product)
  } catch (error) {
    next(error)
  }
};

// http://localhost:3001/products?category=pantuflas
const getProductsByCategory = async (req, res, next) => {
  try {
    //El req.query -> { category: 'pantuflas' }
    const { category } = req.query
    if(!category)
      res.status(400).send("Not valid query!")
    const products = await Products.findAll({
      include : {
        model : Categories,
        where: {
          name : category
        }
      }
    })
    res.status(200).send(products)
  } catch (error) {
    next(error)
  }
}

// nombre del producto: "Remera Mandalorian" -> "<Tipo de prenda> <Busqueda>"
// http://localhost:3001/products?search=remera
const getProductsBySearch = async (req,res,next) => {
  try {
    const { key } = req.query
    if(!key)
      res.status(400).send("Not valid query!")
    const products = await Products.findAll({
      where: {
        name: {
          [Op.substring] : key
        }
      }
    })
    res.status(200).send(products)
  } catch (error) {
    next(error)
  }
}

//---------------------- POST ---------------------------//


const postProduct = async (req, res, next) => {
  try {
    if(!Array.isArray(req.body) && typeof req.body === "object") {
      const { name, description, price, image, stock, color, size, genre, thumbnail } = req.body
      const product = { name, price, description, stock, image, color, size, genre, thumbnail }
      const categories = req.body.categories.split(" ");
      const [createdProduct, wasCreated] = await Products.findOrCreate({
        where: product,
        defaults: product
      });
      if(!wasCreated)
        return res.status(302).send("Product already exists.")
      for (const category of categories) {
        const createdCategory = await Categories.create({ name: category });
        createdProduct.addCategory(createdCategory);
      }
      res.status(201).send(createdProduct);
    } else if (Array.isArray(req.body)) {
      const products = req.body.map(product => {
        const { name, description, price, image, stock, color, size, genre, thumbnail } = product
        return { name, description, price, image, stock, color, size, genre, thumbnail }
      })
      const categoriesArrayOfArrays = req.body.map(product => product.categories.split(" ").map(category => ( { name: category } )))
      const builtProducts = []
      const wasIndeedBuild = [] // -> [false, false, true, false]
      for(const product of products) {
        const [builtProduct, wasBuild] = await Products.findOrBuild({
          where: product,
          defaults: product
        });
        if(wasBuild) {
          builtProducts.push(builtProduct)
          wasIndeedBuild.push(true)
        } else {
          wasIndeedBuild.push(false)
        }
      }
      /* console.log(builtProducts) */
      if(wasIndeedBuild.includes(false))
        return res.status(302).send({ERROR: 'Already exists!!', ...products[wasIndeedBuild.indexOf(false)]})
      const createdProducts = []
      for(const product of builtProducts) {
        const createdProduct = await product.save()
        createdProducts.push(createdProduct)
      }
      const createdCategoriesArrayOfArrays = []
      for(const categoriesArray of categoriesArrayOfArrays) {
        const createdCategoriesArray = []
        for(const category of categoriesArray) {
          const newCategory = await Categories.create(category)
          createdCategoriesArray.push(newCategory)
        }
        createdCategoriesArrayOfArrays.push(createdCategoriesArray)
      }
      /* console.log(createdCategoriesArrayOfArrays) */
      for(let i=0; i<createdProducts.length; i++) {
        for(const category of createdCategoriesArrayOfArrays[i]) {
          /* console.log("categoryyyyy ->", category) */
          await createdProducts[i].addCategory(category)
        }
      }
      res.status(201).send(createdProducts)
    } else res.sendStatus(400)
  } catch (error) {
    /* console.log({ error }) */
    if(error.message === "Validation error") {
      const errors = error.errors.map(errorInstance => ({ ERROR: 'Validation error!!', message: errorInstance.message, instance: errorInstance.instance }))
      return res.status(400).send(errors) //Si no pongo return hace el next(error)
    }
    next(error);
  }
}

//---------------------- PUT ---------------------------//


const putProduct = async (req, res, next) => {
  console.log(req.body)
  try {
    const product = await Products.update(req.body,{
      where: { id: req.params.id },
      returning: true,
    })
    const updated = product[0] //Es un 0 sí no se encontró
    if(!updated)
      res.status(404).send("Product not found")
    res.status(200).send(product)
  } catch (error) {
    next(error)    
  }
};

//Error si quiero modificar algo con lo mismo -> 

//---------------------- DELETE ---------------------------//

const deleteProduct = async (req, res, next) => {
  try {
    const destroyedProduct = await Products.destroy({
      where : {id : req.params.id}
    })
    destroyedProduct ? res.sendStatus(204) : res.sendStatus(404)
  } catch (error) {
    next(error)
  }
};



module.exports = {
  getProducts,
  getProductsId,
  postProduct,
  putProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsBySearch
};


//FIXME Revisar los return para que salgan de la funcion en los errores y no se ejecute lo de abajo e.e