const respond = require('../utils/respond.js')


const getAll = (Model) => {
    console.log("Model: ", Model)
    return async (req, res, next) => {
        try {
            const output = await Model.findAll()
            respond(res, 200, output)
        } catch (err) {
            next(err)
        }
    }
}

const getOne = (Model) => {
    return async (req, res, next) => {
        try {
            const output = await Model.findByPk(req.params.id)
            if (!output){
                return respond(res, 404, {message: "Item not found"})
            }
            respond(res, 200, output)
        } catch (err) {
            next(err)
        }
    }
}

const create = (Model) => {
    return async (req, res, next) => {
        try {
            const output = await Model.create(req.body)
            return respond(res, 201, output)
        } catch (err) {
            next(err)
        }
    }
}

const update = (Model) => {
    return async (req, res, next) => {
        try {
            const output = await Model.findByPk(req.params.id)
            if (!output){
                return respond(res, 404, {message: "Item not found"})
            }
            await output.update(req.body)
            respond(res, 200, output)
        } catch(err){
            next(err)
        }
    }
}

const deleteOne = (Model) => {
    return async (req, res, next) => {
        try {
          const output = await Model.findByPk(req.params.id);
          if (!output) {
            return respond(res, 404, { message: 'Item not found' })
          }
          await output.destroy();
          respond(res, 204, { message: 'Item deleted successfully' });
        } catch (err) {
          next(err);
        }
      };
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}