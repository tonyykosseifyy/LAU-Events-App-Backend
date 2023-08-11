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
const update = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user){
            return respond(res, 404, {message: "Item not found"})
        }
        const updated_user = await user.update(req.body);
        res && respond(res, 200, {
            id: updated_user.id,
            email: updated_user.email,
            major: updated_user.major,
            isVerified: updated_user.isVerified,
            userType: updated_user.userType,
            createdAt: updated_user.createdAt,
            updatedAt: updated_user.updatedAt
        });
    } catch (err) {
        next(err);
    }
}
const deleteOne = defaultCruds.deleteOne(User)
const findOne = defaultCruds.findOne(User)

module.exports = {
    getAll,
    getOne,
    update,
    deleteOne,
    findOne
}
