const { Event, Club, User, UserEvent } = require("../models");
const defaultCruds = require("./defaultCruds.js");
const respond = require("../utils/respond.js");

const getAll = defaultCruds.getAll(UserEvent)
const getOne = defaultCruds.getOne(UserEvent)
const update = defaultCruds.update(UserEvent)
const deleteOne = defaultCruds.deleteOne(UserEvent)


const create = async (req, res, next) => {
    try {
        const userId = req.userId;
        const eventId = req.body.eventId;
        const status = req.body.status;
        const event = await Event.findByPk(eventId);
        if (!event) {
            return respond(res, 404, { message: "Event not found" });
        }

        const oldUserEvent = await UserEvent.findOne({
            where: {
                eventId,
                userId,
            },
        });
        if ( oldUserEvent ) {
            return respond(res, 400, { message: `User already ${oldUserEvent.status} the event` });
        }

        const userEvent = await UserEvent.create({
            eventId,
            userId,
            status,
        });

        res && respond(res, 201, userEvent);
    } catch (err) {
        return respond(res, 500, err);
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
};