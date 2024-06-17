const {Router} = require('express')
const { createAddress, getAddresses, updateAddress, deleteAddress, getAddressesByid } = require("../controllers/addresses");
const { authToken, verifyRole, verifyAllRoles } = require('../middlewares/auth');


function addresses(app) {
  const addressesRouter = Router();
  app.use("/v1/address", addressesRouter);

  addressesRouter.get('/', getAddresses )
  addressesRouter.get('/:id', getAddressesByid )
  addressesRouter.post("/", authToken, verifyAllRoles(['ADMIN', 'EDITOR', 'REGULAR']), createAddress ); 
  addressesRouter.put('/:id', updateAddress );
  addressesRouter.delete('/:id', authToken, deleteAddress);
  
}

module.exports = addresses;