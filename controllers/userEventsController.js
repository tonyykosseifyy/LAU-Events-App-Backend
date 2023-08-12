const { Event, UserEvent } = require("../models");
const defaultCruds = require("./defaultCruds.js");
const respond = require("../utils/respond.js");

const getAll = defaultCruds.getAll(UserEvent)
const getOne = defaultCruds.getOne(UserEvent)
const deleteOne = defaultCruds.deleteOne(UserEvent)


const update = async (req, res, next) => {
    const userEventId = req.params.id;
    const status = req.body.status;
    try {
        const userEvent = await UserEvent.findByPk(userEventId);
        if (!userEvent) {
            return respond(res, 404, { message: "UserEvent not found" });
        }
        if (userEvent.status === status) {
            return respond(res, 400, { message: `User already ${status} the event` });
        }
        if ( status === 'Accepted' && userEvent.status === 'Declined' ) {
            userEvent.isRescheduled = true ;
            userEvent.rescheduledTime = new Date() ;
        }
        if ( status === 'Declined' && userEvent.status === 'Accepted' && userEvent.isRescheduled ) {
            userEvent.isRescheduled = false ;
            userEvent.rescheduledTime = null ;
        }

        userEvent.status = status;

        await userEvent.save();

        res && respond(res, 200, userEvent);
    } catch (err) {
        return respond(res, 500, err);
    }
}
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