const express = require('express')
const { dbConnection } = require('./database/config')
var cors = require('cors')
require('dotenv').config()


// Crear el servidor de express
const app = express()

//Base de datos
dbConnection()

// CORS
app.use(cors())


//Directorio Público. EL USE en express, es conocido como un middleware, que no es más que una función que se ejecuta en el momento que alguien hace una petición a mi servidor
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())


// Rutas
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// })


//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//Escuchar peticiones
app.listen(process.env.PORT, () => { console.log(`Servidor corriendo en puerto ${process.env.PORT}`) })