/*
    Events Routes
    /api/events
*/

const { Router } = require("express")
const { validateJWT } = require("../middlewares/validate-jwt")
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router()

//Todas tienen que pasar por la validación del JWT
router.use(validateJWT)

// Obtener eventos
router.get('/', getEvent)

// Crear un nuevo evento
router.post('/', createEvent)

// Actualizar evento
router.put('/:id', updateEvent)

// Borrar evento
router.delete('/:id', deleteEvent)

module.exports = router