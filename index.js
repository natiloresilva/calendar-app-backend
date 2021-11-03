const { response } = require('express')
const express = require('express')
require('dotenv').config()

console.log(process.env);
// Crear el servidor de express
const app = express()

//Directorio Público. EL USE en express, es conocido como un middleware, que no es más que una función que se ejecuta en el momento que alguien hace una petición a mi servidor
app.use(express.static('public'))


// Rutas
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// })

app.use('/api/auth', require('./routes/auth'))

//Escuchar peticiones
app.listen(process.env.PORT, () => { console.log(`Servidor corriendo en puerto ${process.env.PORT}`) })