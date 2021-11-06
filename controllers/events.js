const { response } = require('express')
const Event = require('../models/Events');

const getEvent = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name')

    res.json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body)

    try {

        event.user = req.uid

        const saveEvent = await event.save()

        res.json({
            ok: true,
            event: saveEvent
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that id'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to edit this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            event: eventUpdated
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const deleteEvent = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteEvent'
    })
}

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}