const { Router } = require("express");
const { addToCart, getCartItems, updateCartItemQuantity, removeCartItem } = require("../controllers/cart");
const { authToken } = require("../middlewares/auth");


function cart(app) {
  const cartRouter = Router()
  app.use("/v1/cart", cartRouter)

  cartRouter.post('/add' , addToCart);
  cartRouter.get('/:userId', getCartItems);
  cartRouter.put('/update/:cartItemId', updateCartItemQuantity);
  cartRouter.delete('/remove/:cartItemId', removeCartItem);
  
}

module.exports = cart