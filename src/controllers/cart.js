// const Cart = require("../model/cart");

const Cart = require("../model/cart");


// Controlador para agregar un producto al carrito
const addToCart = async (req, res) => {
  try {
    // Imprimir el cuerpo de la solicitud para depuración
    console.log('Request Body:', req.body);

    // Extraer los valores del cuerpo de la solicitud
    const { userId, productId, quantity } = req.body;

    // Buscar si el producto ya está en el carrito del usuario
    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      cartItem.quantity += quantity;
    } else {
      // Si el producto no está en el carrito, crear un nuevo elemento de carrito
      cartItem = new Cart({
        user: userId,
        product: productId,
        quantity: quantity // Utiliza la cantidad proporcionada
      });
    }

    // Guardar el elemento de carrito actualizado o nuevo
    await cartItem.save();

    // Responder con el elemento de carrito guardado
    res.status(201).json({ 
      success: true, 
      data: cartItem 
    });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
};

// Controlador para obtener todos los productos en el carrito de un usuario
const getCartItems = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cartItems = await Cart.find({ user: userId }).populate('product');

    res.status(200).json({ 
      success: true,
      data: cartItems 
    });

  } catch (error) {
    console.error('Error al obtener productos del carrito:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

// Controlador para actualizar la cantidad de un producto en el carrito
const updateCartItemQuantity = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;

  try {
    if (quantity <= 0) {
      // Eliminar el elemento del carrito si la cantidad es 0
      await Cart.findByIdAndDelete(cartItemId);
      return res.status(200).json({ success: true, message: 'Elemento del carrito eliminado correctamente' });
    }

    // Actualizar la cantidad del elemento del carrito
    const updatedCartItem = await Cart.findByIdAndUpdate(cartItemId, { quantity }, { new: true });

    res.status(200).json({ 
      success: true, 
      cartItem: updatedCartItem
     });
  } catch (error) {
    console.error('Error al actualizar la cantidad del elemento del carrito:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Encontrar el elemento del carrito por ID y eliminarlo
    const cartItem = await Cart.findByIdAndDelete(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Elemento del carrito no encontrado" });
    }

    res.status(200).json({ success: true, message: "Elemento del carrito eliminado correctamente" });
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem
};
