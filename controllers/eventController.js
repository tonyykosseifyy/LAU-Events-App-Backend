const { Event, ClubEvent, UserEvent, Club, User } = require("../models");
const defaultCruds = require("./defaultCruds.js");
const respond = require("../utils/respond.js");
const sendNotificationToAllUsers = require("./notifications.js");

const update = defaultCruds.update(Event);
const deleteOne = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return respond(res, 404, { message: "Event not found" });
    }
    await event.setClubs([]);
    // delete the event
    await event.destroy();
    res && respond(res, 200, { message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getOneEvent = async (req, res, next) => {
  // get the event, and include if its accepted or declined by this user
  const userId = req.userId;
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] },
          as: "clubs",
        },
      ],
    });

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
    if (userEvent) {
      event.dataValues.userStatus = userEvent.status;
      event.dataValues.userEventId = userEvent.id;
    }

    res && respond(res, 200, event);
  } catch (err) {
    return respond(res, 500, {
      message: "An error occurred while retrieving the event.",
    });
  }
};

const getEventDetails = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] },
          as: "clubs",
        },
        {
          model: User,
          attributes: ["email"],
          as: "users",
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
        status: "Declined",
      },
    });

    // attach it to the response
    event.dataValues.declinedUsers = countDeclinedUser;

    res && respond(res, 200, event);
  } catch (err) {
    return respond(res, 500, {
      message: "An error occurred while retrieving the event details.",
    });
  }
};

const createEvent = async (req, res, next) => {
  try {
    const {
      clubIds,
      eventName,
      eventDescription,
      startTime,
      endTime,
      status,
      imagePath,
    } = req.body;

    const event = await Event.create({
      eventName,
      eventDescription,
      startTime,
      endTime,
      status,
      imagePath,
    });

    if (
      !clubIds ||
      !Array.isArray(clubIds) ||
      !clubIds.length ||
      clubIds.length < 1
    ) {
      return respond(res, 400, {
        message:
          "Provided clubIds must be a non-empty array of existing Club IDs.",
      });
    }

    const clubs = await Club.findAll({
      where: { id: clubIds },
    });
    if (!clubs || !Array.isArray(clubs) || !clubs.length) {
      return respond(res, 400, {
        message:
          "Provided clubIds must be a non-empty array of existing Club IDs.",
      });
    }
    await event.setClubs(clubs);

    // dont wait for this to finish
    // sendNotificationToAllUsers(event);

    setTimeout(() => {
      sendNotificationToAllUsers(event);
    }, 1000);

    res.status(201).json(event);
  } catch (err) {
    return respond(res, 500, {
      message: { message: "An error occurred while creating the event." },
    });
  }
};

const deleteAll = async (req, res, next) => {
  try {
    await ClubEvent.destroy({ where: {} });
    await UserEvent.destroy({ where: {} });
    await Event.destroy({ where: {} });

    return respond(res, 200, {
      message: "All events and associated records were deleted successfully",
    });
  } catch (err) {
    return respond(res, 500, {
      message:
        "An error occurred while deleting all events and associated records.",
    });
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    // return all events, with their clubs populated
    const events = await Event.findAll({
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] }, // Exclude the join table attributes
          as: "clubs",
        },
      ],
    });

    res && respond(res, 200, events);
  } catch (err) {
    return respond(res, 500, {
      message: "An error occurred while retrieving all events.",
    });
  }
};

const getAllDeclinedEvents = async (req, res, next) => {
  try {
    const userId = req.userId;

    // GET all events that this user declined
    const declinedEvents = await Event.findAll({
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] },
          as: "clubs",
        },
        {
          model: User,
          attributes: [],
          as: "users",
          through: {
            attributes: [],
            where: { status: "Declined" },
          },
          where: {
            id: userId,
          },
        },
      ],
    });

    return respond(res, 200, declinedEvents);
  } catch (err) {
    return respond(res, 500, {
      message: "An error occurred while retrieving all declined events.",
    });
  }
};

module.exports = {
  getAll: getAllEvents,
  getOne: getOneEvent,
  create: createEvent,
  update,
  deleteOne,
  getEventDetails,
  deleteAll,
  getAllDeclinedEvents,
};
