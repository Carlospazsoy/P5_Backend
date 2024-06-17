  const mongoose = require("mongoose");

  const productSchema = new mongoose.Schema({
    imageURL: {
      type: String,
      required: [true, "La URL de la imagen es obligatoria"],
      /* validate: {
        validator: function(v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
        },
        message: props => `${props.value} no es una URL de imagen válida`
      } */
    },
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      minlength: [3, "El nombre del producto debe tener al menos 3 caracteres"],
      // maxlength: [100, "El nombre del producto no puede exceder los 100 caracteres"]
    },
    brand: {
      type: String,
      required: [true, "La marca del producto es obligatorio"],
      trim: true,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "El precio del producto es obligatorio"],
      min: [0, "El precio del producto no puede ser negativo"]
    },
    description: {
      type: String,
      trim: true,
      // maxlength: [1000, "Los detalles del producto no pueden exceder los 1000 caracteres"]
    },
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, "La categoría del producto es obligatoria"]
    }]
  }, {
    timestamps: true
  });
  /* Se asocia una coleccion al schema dando origen al modelo */
  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;
