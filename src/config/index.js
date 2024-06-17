require('dotenv').config();

const config = {
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  dbURL: process.env.DB_URL,
  paypalClientId: process.env.PAYPAL_ID,
  paypalClientSecret: process.env.PAYPAL_SECRET,
  sendGridApiKey: process.env.CHARLY_SENDGRID_API_KEY
  
}

module.exports = config