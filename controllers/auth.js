const { response } = require('express') //no vuelve a cargar a libreria, va a usar la libreria ya cargada
const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')




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

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //Generar nuestro JWT
        const token = await generarJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
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

const loginUser = async (req, res = response) => {

    const { email, password } = req.body
    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'No user found with this email'
            })
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Password'
            })
        }

        //Generar nuestro JWT
        const token = await generarJWT(user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
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