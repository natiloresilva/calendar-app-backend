const { response } = require('express') //no vuelve a cargar a libreria, va a usar la libreria ya cargada
const { validationResult } = require('express-validator')
const User = require('../models/User')



const createUser = async (req, res = response) => {

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exist'
            })
        }

        user = new User(req.body)
        await user.save()

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })

    }



    //MANEJO DE ERRORES
    //Para no tener que validar de esta manera, vamos a utilizar los middlewares que nos proporciona el express-validator

    // if (name.length < 5) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'Name is too short'
    //     })
    // }


    //Cómo este código se repite, vamos a implementarlo en mi custom middleware: field-validator
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     })
    // }
}

const loginUser = (req, res = response) => {

    const { email, password } = req.body

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