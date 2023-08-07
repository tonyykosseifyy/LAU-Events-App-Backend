const respond = require('../utils/respond.js')


const getAll = (Model) => {
    return async (req, res, next) => {
        try {
            const output = await Model.findAll()
            res && respond(res, 200, output)
        } catch (err) {
            next(err)
        }
    }
}

const findOne = (Model) => {
    return async (whereClause, res) => {
      try {
        const output = await Model.findOne({ where: whereClause });
        if (!output) {
          return respond(res, 404, { message: "Item not found" });
        }
        return output;
      } catch (err) {
        console.log(err)
      }
    };
};

const getOne = (Model) => {
    return async (req, res, next) => {
        try {
            const output = await Model.findByPk(req.params.id)
            if (!output){
                return respond(res, 404, {message: "Item not found"})
            }
            res && respond(res, 200, output)
        } catch (err) {
            next(err)
        }
    }
}

const create = (Model, schema) => {
    return async (req, res, next) => {
        try {
            if (schema){
                const {error} = schema.validate(req.body);
                if (error) {
                    return respond(res, 400, error.details[0].message);
                }
            }

            const output = await Model.create(req.body)
            res && respond(res, 201, output)
            return output
        } catch (err) {
            console.log(err)
        }
    }
}

const update = (Model) => {
    return async (req, res, next) => {
        try {
            let output;
            if(req.body.where){
                output = await Model.findOne({ where: req.body.where })
            } else {
                output = await Model.findByPk(req.params.id)
            }

            if (!output){
                return respond(res, 404, {message: "Item not found"})
            }
            await output.update(req.body)
            return respond(res, 200, output)
        } catch(err){
            res && respond(res, 500, {message: err.message})
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
          res && respond(res, 204, { message: 'Item deleted successfully' });
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
    deleteOne,
    findOne
}