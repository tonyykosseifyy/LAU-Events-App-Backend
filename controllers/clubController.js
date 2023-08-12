const { Club, Event } = require('../models');
const defaultCruds = require('./defaultCruds.js')
const respond = require('../utils/respond.js')

const getAll = defaultCruds.getAll(Club)
const getOne = defaultCruds.getOne(Club)
const create = defaultCruds.create(Club)
const update = defaultCruds.update(Club)
const deleteOne = defaultCruds.deleteOne(Club)

const getWithEvents = async (req, res, next) => {
    try {
        const club = await Club.findByPk(req.params.id, {
            include: [
                {
                  model: Event,
                  through: { attributes: [] }, 
                  as: 'events'
                },
            ],
        });
        if (!club){
            return respond(res, 404, {message: "Item not found"})
        }

        res && respond(res, 200, club)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAll,
    getOne,
    getWithEvents,
    create,
    update,
    deleteOne
}
