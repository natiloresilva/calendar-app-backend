const { response } = require('express') //no vuelve a cargar a libreria, va a usar la libreria ya cargada
const { validationResult } = require('express-validator')




const createUser = (req, res = response) => {

    const { name, email, password } = req.body

    //MANEJO DE ERRORES
    //Para no tener que validar de esta manera, vamos a utilizar los middlewares que nos proporciona el express-validator

    // if (name.length < 5) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'Name is too short'
    //     })
    // }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
    })
}

const loginUser = (req, res = response) => {

    const { email, password } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revalidateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}