const { User } = require('../models');
const defaultCruds = require('./defaultCruds.js')
const respond = require('../utils/respond.js')

const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'email', 'major', 'isVerified', 'userType','createdAt', 'updatedAt']
        });
        res && respond(res, 200, users)
    } catch (err) {
        next(err);
    }
}

const getOne = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'email', 'major', 'isVerified', 'userType','createdAt', 'updatedAt']
        });
        if (!user){
            return respond(res, 404, {message: "Item not found"})
        }

        res && respond(res, 200, user);
    } catch(err) {
        next(err);
    }
}
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
