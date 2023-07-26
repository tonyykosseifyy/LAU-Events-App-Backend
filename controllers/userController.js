const { User } = require('../models');
const defaultCruds = require('./defaultCruds.js')

const getAll = defaultCruds.getAll(User)
const getOne = defaultCruds.getOne(User)
const create = defaultCruds.create(User)
const update = defaultCruds.update(User)
const deleteOne = defaultCruds.deleteOne(User)
const findOne = defaultCruds.findOne(User)

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    findOne
}
