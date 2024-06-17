const express = require("express");
const { Router } = express;

// Importar createOrder sin usar "default"
const {createOrder} = require("../controllers/payments");

function payments(app) {
  const paymentsRouter = Router();
  app.use('/v1/payments', paymentsRouter);
  paymentsRouter.post('/create', createOrder);
}

module.exports = payments;
