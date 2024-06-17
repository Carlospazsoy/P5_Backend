//Importa en atm y ve directamente a escribir los handlers en funciones

const Category = require("../model/category")
const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find().populate('products');
    return res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id
    const allCategories = await Category.findById(categoryId).populate('products');
    return res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener categoría',
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const categoryInput = req.body;
    const createdCategory = await Category.create(categoryInput);

    return res.status(201).json({
      success: true,
      data: createdCategory,
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return res.status(400).json({
      success: false,
      message: 'Error al crear categoría',
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryInput = req.body;
    const categoryId = req.params.id;
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryInput, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    return res.status(400).json({
      success: false,
      message: 'Error al actualizar categoría',
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    return res.status(202).json({
      success: true,
      data: deletedCategory,
    });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    return res.status(400).json({
      success: false,
      message: 'Error al eliminar categoría',
      error: error.message,
    });
  }
};



module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}
