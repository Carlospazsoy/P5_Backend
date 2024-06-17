//Recuerda mongoose es un ODM, un mapeador de objetos documento para mongoDB y es el gestor entre tus modelos y tu base de datos
const { default: mongoose } = require("mongoose"); //deja que el editor te importe esta linea para que te autocomplete los metodos
const { dbURL } = require(".");

const connect = async () => {
  try {
    const connection = await mongoose.connect(dbURL);
    console.log('Conectado a la base de datos:', connection.connection.host);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

module.exports = connect

// La pura implemetnacion del try/catch soluciono el ultimo error con la conexion a mongo compass