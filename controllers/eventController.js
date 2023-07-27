const { Event } = require('../models');
const defaultCruds = require('./defaultCruds.js')
const addEventSchema = require('../validations/addEventSchema.js')

const getAll = defaultCruds.getAll(Event)
const getOne = defaultCruds.getOne(Event)
const create = defaultCruds.create(Event)
const update = defaultCruds.update(Event)
const deleteOne = defaultCruds.deleteOne(Event)

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}
