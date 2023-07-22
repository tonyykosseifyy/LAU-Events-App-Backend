const { UserClub } = require('../models');
const defaultCruds = require('./defaultCruds.js')

const getAll = defaultCruds.getAll(UserClub)
const getOne = defaultCruds.getOne(UserClub)
const create = defaultCruds.create(UserClub)
const update = defaultCruds.update(UserClub)
const deleteOne = defaultCruds.deleteOne(UserClub)

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}
