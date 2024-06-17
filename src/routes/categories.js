const { Router } = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } = require('../controllers/categories');
const { authToken } = require('../middlewares/auth');

function categories(app) {
  const categoriesRouter = Router();
  
  // Monta el router de categorías en /v1/categories
  app.use('/v1/categories', categoriesRouter);

  // Ruta para obtener todas las categorías
  categoriesRouter.get('/', getCategories);
  // Ruta para obtener una categoria
  categoriesRouter.get('/:id', getCategoryById);

  // Ruta para crear una nueva categoría (protegida por autenticación)
  categoriesRouter.post('/', authToken, createCategory);

  // Ruta para actualizar una categoría existente por ID (protegida por autenticación)
  categoriesRouter.put('/:id', authToken, updateCategory);

  // Ruta para eliminar una categoría existente por ID (protegida por autenticación)
  categoriesRouter.delete('/:id', authToken, deleteCategory);
}

module.exports = categories;
