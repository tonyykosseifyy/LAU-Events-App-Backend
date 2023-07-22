const { Club } = require('../models');
const defaultCruds = require('./defaultCruds.js')

const getAll = defaultCruds.getAll(Club)
const getOne = defaultCruds.getOne(Club)
const create = defaultCruds.create(Club)
const update = defaultCruds.update(Club)
const deleteOne = defaultCruds.deleteOne(Club)

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}
