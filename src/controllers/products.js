const Category = require("../model/category");
const Product = require("../model/product");

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    // el populate recibe el campo category que pertenece al modelo
    const productos = await Product.find().populate('category');

    return res.status(200).json({
      success: true,
      data: productos,
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

// Controlador para obtener productos por nombre
const getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    // Remover signos de puntuación y convertir a minúsculas
    const cleanedName = name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

    // Usamos una expresión regular para hacer la búsqueda insensible a mayúsculas/minúsculas y a acentos
    const regex = new RegExp(cleanedName, "i");

    const products = await Product.find({ name: { $regex: regex } });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontraron productos que coincidan con '${name}'.`,
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error al obtener productos por nombre:", error.message);
    res.status(500).json({
      success: false,
      message: "Error al obtener productos por nombre",
      error: error.message,
    });
  }
};


const getProductById = async (req, res) => {
  try {
    // el populate recibe el campo category que pertenece al modelo
    const productId = req.params.id
    const productos = await Product.findById(productId).populate('category');

    return res.status(200).json({
      success: true,
      data: productos,
    });
  } catch (error) {
    console.error('Error al obtene producto:', error);
    return res.status(500).json({
      success: false,
      message: "Error al obtene producto",
      error: error.message,
    });
  }
};
const getProductByCategory = async (req, res) => {
  try {
    // el populate recibe el campo category que pertenece al modelo
    const categoryId = req.params.id
    const productos = await Product.findById(categoryId); //.populate('products');

    return res.status(200).json({
      success: true,
      data: productos,
    });
  } catch (error) {
    console.error('Error al obtener productos en esta categoria:', error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener productos en esta categoria",
      error: error.message,
    });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { imageURL, name, brand, model, color, price, description, category } = req.body;

    // Quitamos la validación de imageURL aquí
    const newProduct = new Product({
      imageURL,
      name,
      brand,
      model,
      color,
      price,
      description,
      category,
    });

    // Guardar en coleccion products
    const savedProduct = await newProduct.save();

    // Guardar en coleccion categories opcion 1
     // Actualizar la categoría para incluir el nuevo producto (relación manual )
     /* await Category.updateOne(  //Sintax: filtrado , operacion de actualizacion
      { _id: { $in: category } },  //_id: "match with the one in req.body.category"
      { $push: { products: savedProduct._id } }  // on the found category push the new id in the products property
    ); */

    // Guardar en coleccion categories opcion 2
    await Category.findByIdAndUpdate(
      category, // ID de la categoría
      { $push: { products: savedProduct._id } },
      { new: true } // Para devolver el documento actualizado
    );

    

    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return res.status(400).json({
      success: false,
      message: "Error al crear producto",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    // el populate recibe el campo category que pertenece al modelo
    const productInput = req.body;
    const productId = req.params.id;
    const productos = await Product.findByIdAndUpdate(productId, productInput, { new:true }).populate('category');

    return res.status(200).json({
      success: true,
      data: productos,
      message: "Producto actualizado exitosamente"
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // el populate recibe el campo category que pertenece al modelo
    const productId = req.params.id
    const productos = await Product.findByIdAndDelete(productId).populate('category');

    return res.status(200).json({
      success: true,
      data: productos,
      message: "Producto eliminado exitosamente"
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar producto",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductByName,
  getProductById,
  getProductByCategory,
  updateProduct,
  deleteProduct
};
