const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  apartment: {
    type: String,
    required: false
  },
  neighborhood: {
    type: String,
    required: false
  },
  zipCode: {
    type: String,
    required: true
  },
  // Referencia a los usuarios que utilizan esta dirección
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
