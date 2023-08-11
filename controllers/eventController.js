const { Event, ClubEvent, UserEvent, Club, User, sequelize } = require("../models");
const defaultCruds = require("./defaultCruds.js");
const respond = require("../utils/respond.js");

const getAll = defaultCruds.getAll(Event);

const update = defaultCruds.update(Event);
const deleteOne = defaultCruds.deleteOne(Event);

const getOneEvent = async (req, res, next) => {
  // get the event, and include if its accepted or declined by this user 
  const userId = req.userId ;
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] },
        }
      ],
    }) ;

    if (!event) {
      return respond(res, 404, { message: "Event not found" });
    }

    // check if the user has accepted or declined the event
    const userEvent = await UserEvent.findOne({
      where: {
        userId,
        eventId: req.params.id,
      },
    });
    if ( userEvent ) {
      event.dataValues.userStatus = userEvent.status;
      event.dataValues.userEventId = userEvent.id;
    }

    res && respond(res, 200, event);
  } catch (err) {
    return respond(res, 500, err);
  }
}

const getEventDetails = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] }, 
        },
        {
          model: User,
          attributes: ["email"],
          through: {
            attributes: [],
            where: { status: "Accepted" }, 
          },
        },
      ],
    });

    if (!event) {
      return respond(res, 404, { message: "Event not found" });
    }
    // count the number of users who have declined the event
    const countDeclinedUser = await UserEvent.count({
      where: { 
        eventId: req.params.id,
        status: "Declined"
       },
    });

    // attach it to the response 
    event.dataValues.declinedUsers = countDeclinedUser;

    res && respond(res, 200, event);
  } catch (err) {
    return respond(res, 500, err);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { clubIds, eventName, eventDescription, startTime, endTime, status } = req.body;

    const event = await Event.create({
      eventName,
      eventDescription,
      startTime,
      endTime,
      status,
    });

    if (clubIds && Array.isArray(clubIds)) {
      const clubs = await Club.findAll({
        where: { id: clubIds }
      });
      await event.setClubs(clubs);
    }

    res.status(201).json(event);

  } catch(err) {
    return respond(res, 500, err);
  }
}


const deleteAll = async (req, res, next) => {
  try {
    await ClubEvent.destroy({ where: {} });
    await UserEvent.destroy({ where: {} });
    await Event.destroy({ where: {} });

    return respond(res, 200, { message: "All events and associated records deleted successfully" });
  } catch (err) {
    return respond(res, 500, err);
  }
}

const getAllEvents = async (req, res, next) => {
  try {
    // return all events, with their clubs populated 
    const events = await Event.findAll({
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] }, // Exclude the join table attributes
        },
      ],
    });

    res && respond(res, 200, events);

  } catch(err) {

    return respond(res, 500, err);
  }
}

const getAllDeclinedEvents = async (req, res, next) => {
  try {
    const userId = req.userId;

    const declinedEvents = await UserEvent.findAll({
      attributes: ['eventId', 'responseTime'],
      where: {
        userId,
        status: "Declined"
      },
      include: [
        {
          model: Event,
        },
      ],
    });
      return respond(res, 200, declinedEvents);
  } catch (err) {
      return respond(res, 500, err);
  }
}

module.exports = {
  getAll: getAllEvents,
  getOne: getOneEvent,
  create: createEvent,
  update,
  deleteOne,
  getEventDetails,
  deleteAll,
  getAllDeclinedEvents
};
