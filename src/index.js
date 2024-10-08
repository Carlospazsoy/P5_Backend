//esta pagina conecta a base de datos ejecuta middlewares , ejecuta rutas e inicia servicio  
const express = require("express");
const { port } = require("./config");
const connect = require("./config/db");
const auth = require("./routes/auth");
const products = require("./routes/products");
const categories = require("./routes/categories");
const cors = require("cors");
const { handleAuthError } = require("./middlewares/auth");
const payments = require("./routes/payments");
const addresses = require("./routes/addresses");
const cart = require("./routes/cart");


const app = express();

// DB
connect();

//Conexion entre back y front

app.use(cors());

/* app.use(cors({
  // origin: ['http://localhost:3000'],
  origin: ['https://carlospazsoy.github.io'],
  // origin: ['https://carlospazsoy.github.io/'],
})) */

/* app.use(cors({
  // origin: 'http://localhost:5173/', 
  origin: 'https://carlospazsoy.github.io/P5_Frontend', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
})); */

// Middleware para ser capaces de intercambiar formato json entre nuestro backend y frontend
app.use(express.json());

//Monitor antes de la lógica de rutas
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

// Monitor antes de la lógica de rutas
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Rutas 
auth(app);
products(app)
categories(app)
payments(app)
addresses(app)
cart(app)

// Middleware de manejo de error al no proprcionar token de autorizacion
app.use(handleAuthError)

app.get("/", (req, res) => {
  return res.json({
    message: "Backend de Carlos Paz en ejecución 👍🏽",
  });
});



app.listen(port, () => {
  console.log(`Escuchando en el puerto http://localhost:${port}`);
});
