const { UserEvent } = require('../models');
const defaultCruds = require('./defaultCruds.js')

const getAll = defaultCruds.getAll(UserEvent)
const getOne = defaultCruds.getOne(UserEvent)
const create = defaultCruds.create(UserEvent)
const update = defaultCruds.update(UserEvent)
const deleteOne = defaultCruds.deleteOne(UserEvent)

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}
