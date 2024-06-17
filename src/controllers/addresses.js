const { default: mongoose } = require("mongoose");
const Address = require("../model/address");
const User = require("../model/user");

const getAddresses = async (req, res) => {
  try {
    const allAddresses = await Address.find();
    
    return res.status(200).json({
      success: true,
      data: allAddresses
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "No se encontraron domicilios",
    });
  }
}

const getAddressesByid = async (req, res) => {
  try {
    const addressId = req.params.id;
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Dirección no encontrada",
      });
    }

    return res.status(200).json({
      message: "Dirección obtenida con éxito",
      data: address,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Error al obtener la dirección",
      error: error.message,
    });
  }
};


const createAddress = async (req, res) => {
  try {
    console.log('createAddress funcioando');
    // Crear el domicilio
    const createdAddress = await Address.create(req.body);

    // Obtener el ID del usuario desde req.auth
    const userId = req.auth._id;
    // console.log(userId);

    // Asociar el domicilio al usuario
    await User.findByIdAndUpdate(userId, { $push: { addresses: createdAddress._id } });

    // Actualizar el domicilio con el ID del usuario
    await Address.findByIdAndUpdate(createdAddress._id, { $push: { users: userId } });

    // Obtener el domicilio actualizado
    const updatedAddress = await Address.findById(createdAddress._id);

    return res.status(200).json({
      message: "Domicilio agregado con éxito",
      data: updatedAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Domicilio no publicado",
      error: error.message,
    });
  }
};


// Update an existing address
const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updateData = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(addressId, updateData, { new: true });

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Dirección no encontrada",
      });
    }

    return res.status(200).json({
      message: "Dirección actualizada con éxito",
      data: updatedAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "No se pudo actualizar la dirección",
      error: error.message,
    });
  }
};



// Delete an existing address
const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    // Encuentra y elimina la dirección
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    // console.log(deletedAddress);

   /*  if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Dirección no encontrada",
      });
    } */

    // Encuentra al usuario que tiene esta dirección y elimina la referencia
    const userId = req.auth._id; // Asumiendo que el ID del usuario está disponible en req.auth
    console.log(userId);
    await User.findByIdAndUpdate(userId, { $pull: { addresses: addressId } });

    return res.status(200).json({
      message: "Dirección eliminada con éxito",
      data: deletedAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "No se pudo eliminar la dirección",
      error: error.message,
    });
  }
};

module.exports = {
  getAddresses,
  getAddressesByid,
  createAddress,
  updateAddress,
  deleteAddress
};
