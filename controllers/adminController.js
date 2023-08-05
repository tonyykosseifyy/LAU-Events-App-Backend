const { Admin } = require('../models');
const { User } = require('../models');
const defaultCruds = require('./defaultCruds.js')
const  respond  = require('../utils/respond.js')

const getAll = defaultCruds.getAll(Admin)
const getOne = defaultCruds.getOne(Admin)
const create = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.body.id)

        if (!user) {
          respond(res, 404, {message: 'Item not found'})
        }
        const output = await Admin.create(req.body)
        await user.update({userType: "Admin"})
        return respond(res, 201, output)
    } catch (err) {
        next(err)
    }
}
const update = defaultCruds.update(Admin)
const deleteOne = async (req, res, next) => {
    try {
      const output = await Admin.findByPk(req.params.id);
      if (!output) {
        return respond(res, 404, { message: 'Item not found' })
      }
      await output.destroy();
      const user = await User.findByPk(req.params.id)
      await user.update({userType: "User"})
      respond(res, 204, { message: 'Item deleted successfully' });
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}
