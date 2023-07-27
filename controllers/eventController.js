const { Event, Club, User } = require("../models");
const defaultCruds = require("./defaultCruds.js");
const respond = require("../utils/respond.js");

const getAll = defaultCruds.getAll(Event);
const getOne = defaultCruds.getOne(Event);
const update = defaultCruds.update(Event);
const deleteOne = defaultCruds.deleteOne(Event);

const getEventDetails = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Club,
          attributes: ["clubName"],
          through: { attributes: [] }, // Exclude the join table attributes
        },
        {
          model: User,
          attributes: ["email"],
          through: {
            attributes: [],
            where: { status: "Accepted" }, // Filter users whose status is "Accepted"
          },
        },
      ],
    });

    if (!event) {
      return respond(res, 404, { message: "Event not found" });
    }

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

module.exports = {
  getAll,
  getOne,
  create: createEvent,
  update,
  deleteOne,
  getEventDetails,
};
