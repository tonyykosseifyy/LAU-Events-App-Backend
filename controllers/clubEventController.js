const { ClubEvent } = require('../models');
const defaultCruds = require('./defaultCruds.js')

const getAll = defaultCruds.getAll(ClubEvent)
const getOne = defaultCruds.getOne(ClubEvent)
const create = defaultCruds.create(ClubEvent)
const update = defaultCruds.update(ClubEvent)
const deleteOne = defaultCruds.deleteOne(ClubEvent)

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}
