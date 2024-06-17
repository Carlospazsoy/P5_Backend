const { Router } = require("express");
const {createProduct, getProducts, getProductById, deleteProduct, updateProduct, getProductByCategory, getProductByName} = require("../controllers/products");
const {authToken} = require("../middlewares/auth");

function products(app) {
  const productRouter = Router();
  app.use("/v1/products", productRouter);

  productRouter.get("/", getProducts );
  productRouter.get("/name/:name", getProductByName);
  productRouter.get("/:id", getProductById );
  productRouter.get("/category/:id", getProductByCategory );
  productRouter.patch("/:id", updateProduct );
  productRouter.delete("/:id", deleteProduct );

  

  
 
  productRouter.post('/', authToken, createProduct )
  
}

module.exports = products;
