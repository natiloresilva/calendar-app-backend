/*

    Rutas de usuarios /Auth
    host + /api/auth

*/

const { Router } = require("express")
const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

const { createUser, loginUser, revalidateToken } = require('../controllers/auth')
const { fieldValidator } = require("../middlewares/field-validator")

router.post(
    '/new',
    [//middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'It must be a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser)

router.post(
    '/',
    [
        check('email', 'It must be a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser)


router.get('/renew', validateJWT, revalidateToken)

module.exports = router