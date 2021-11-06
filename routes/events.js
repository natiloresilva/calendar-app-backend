/*
    Events Routes
    /api/events
*/

const { Router } = require("express")
const { validateJWT } = require("../middlewares/validate-jwt")
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { check } = require('express-validator')
const { fieldValidator } = require("../middlewares/field-validator")
const { isDate } = require('../helpers/isDate');

const router = Router()

//Todas tienen que pasar por la validación del JWT
router.use(validateJWT)

// Obtener eventos
router.get('/', getEvent)

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is require').custom(isDate),
        check('end', 'End date is require').custom(isDate),
        fieldValidator
    ],
    createEvent)

// Actualizar evento
router.put('/:id', updateEvent)

// Borrar evento
router.delete('/:id', deleteEvent)

module.exports = router