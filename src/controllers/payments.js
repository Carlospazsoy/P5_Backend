const qs = require('qs') /* convierte objetos de JS query y viceversa string Ex. clave1=valor1&clave2=valor2 */
const { paypalClientId, paypalClientSecret } = require('../config')
const axios = require('axios').default //atencion a ponerle .default para poder utilizar os metodos

// Documentacion de paypal Get Started https://developer.paypal.com/api/rest/

const createOrder = async (req, res)=>{
    const {total,} = req.body // se define el body en postman solo es esto { "total": 100.00 } , puedes importar un currency personalizado asi {total, currency

    // En la documentacion nos aparece con fetch pero tzuzul usó axios https://developer.paypal.com/docs/api/orders/v2/#orders_create
    // fue tomando como guia la parte de getstarted> postman
    try {
        //objetivo de 1er consulta es extraer el token de acceso oauth2 lo que permite al backend de paypal direccionar el pago hacia nuestra cuenta 
        //syntax apiURL, querystring(tipo del cuerpo de la solicitud), {headers:{}, auth:{}}}
        const response = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", // url obtenido de los ejemplos con curl en la documentacion
            qs.stringify({
                'grant_type': 'client_credentials'}),   //grant_type es una cadena de consulta que se anexara al enviarse el cuerpo de la solicitud
            {
            headers:{
                "Content-Type": 'x-www-form-urlencoded', // formato standard para enviar datos de formulario, requiere que utilizemos qs
                "Accept": 'application/json'    // Se aceptan respuestas en formato json
            },
            auth:{ 
                username: paypalClientId,       //Definimos en el .env se eobtienen en dashboard>apps and credentials
                password: paypalClientSecret
            }})

        const token = response.data.access_token // access_token es una propiedad del objeto response indicado en la documentacion get started
        console.log(token)
        console.log(response.data) // Mostrara objeto como {scope, access_token, token_type, etc...}

        // el objetivo de esta 2nda consulta es emitir una orden de pago a nombre del cliente con la autorizacion del token recien extraido
        /*cuando el usuario pague le indicamos que llegue a nuestra cuenta */
        const responsePaymentOrder = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders',{
            /* estracto del ejemplo cn curl */
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "MXN", // se puede cmbiar por una variable llamada currency
                        "value": total // Debe apuntar a un valor definido en el body
                    }
                }
            ],
        }, {
            headers:{
                'Authorization': 'Bearer '+token //este token valida que nuestra cuenta es autentica
            }
        })

        // console.log(responsePaymentOrder.data) nos devuelve id, status, payment resource y todos los links pero no todos nos funcionan 
        // 3er objetivo mandar un vinculo de pago al cliente
        // Debes logearte con un usuario personal de sandbox accounts https://developer.paypal.com/dashboard/accounts
        
        const paymentLink = responsePaymentOrder.data.links[1].href // extraemos el objeto link que nos interesa pero solamente su propiedad href
        console.log(paymentLink)
        // Extraemos el id de la transaccion que tambien nos interesa, lo ponemos en la respuesta de nuestro backend para su posterior uso en el front end
        return res.json({
            success: true,
            orderID: responsePaymentOrder.data.id,   //todo esto se debe mirar en postman. se oberva id dinamico
            paymentLink
        })
    } catch (error) {
        console.log(error.response?.data)  // error.response.data es algo bastante convencional, aveces error.response.message
        console.log(error)
        return res.json({
            success: false
        })
    }

    
}

module.exports = {
    createOrder
}

// Recuerda que los controladores SIEMPRE van en bloques try catch

//El objetivo de este controlador es crear un orden de pago en paypal utilizando la docuemntacion de paypal
