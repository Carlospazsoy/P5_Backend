const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio"],
    trim: true,
    minlength: [3, "El nombre de la categoría debe tener al menos 3 caracteres"],
    maxlength: [50, "El nombre de la categoría no puede exceder los 50 caracteres"]
  },
  products: [{ /* contendra un arreglo de muchos id's de productos guardados en la coleccion Product */
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
