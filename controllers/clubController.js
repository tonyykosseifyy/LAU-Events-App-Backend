const { Club } = require('../models');
const defaultCruds = require('./defaultCruds.js')
const addClubSchema = require('../validations/addClubSchema.js')
const respond = require('../utils/respond.js')

const getAll = defaultCruds.getAll(Club)
const getOne = defaultCruds.getOne(Club)
const create = defaultCruds.create(Club, addClubSchema)
const update = defaultCruds.update(Club)
const deleteOne = defaultCruds.deleteOne(Club)

const getWithEvents = async (req, res, next) => {
    try {
        const club = await Club.findByPk(req.params.id);
        if (!club){
            return respond(res, 404, {message: "Item not found"})
        }
        const events = await club.getEvents();
        
        club.dataValues.events = events;
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
