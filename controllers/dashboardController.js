const { Event, Club, UserEvent, User } = require("../models");
const respond = require("../utils/respond.js");
const { Sequelize } = require("../models");

const getDashboardStats = async (req, res, next) => {
  try {

    const eventCount = await Event.count();
    const clubCount = await Club.count();

    // acceptance rate 
    const acceptanceCount = await UserEvent.count({
      where: { status: "Accepted" },
    });
    const userEventsCount = await UserEvent.count()

    const acceptanceRate = Math.round(( acceptanceCount / userEventsCount ) * 100 ) ;
    const declineRate = 100 - acceptanceRate;

    const stats = {
      eventCount,
      clubCount,
      acceptanceRate, 
      declineRate,
    };

    res && respond(res, 200, stats);
  } catch(err) {
    return respond(res, 500, err);
  }
}

const getAllData = async (req, res, next) => {
  try {
      const userEvents = await UserEvent.findAll({ 
        attributes: [],
        include: [
          {
            model: User,
            attributes: ["createdAt","major"],
            as: 'user'
          },
          {
            model: Event,
            attributes: [
              "eventDescription",
              [Sequelize.fn('DATE', Sequelize.col('UserEvent.acceptedTime')), 'acceptedDate'],
              [Sequelize.fn('TIME', Sequelize.col('UserEvent.acceptedTime')), 'acceptedTime'],
              [Sequelize.fn('DATE', Sequelize.col('UserEvent.declinedTime')), 'declinedDate'],
              [Sequelize.fn('TIME', Sequelize.col('UserEvent.declinedTime')), 'declinedTime'],
              [Sequelize.fn('DATE', Sequelize.col('UserEvent.rescheduledTime')), 'rescheduledDate'],
              [Sequelize.fn('TIME', Sequelize.col('UserEvent.rescheduledTime')), 'rescheduledTime']
            ],
            as: 'event',
          }
        ]
      });
      res && respond(res, 200, userEvents);
  } catch (err) {
      console.log(err);
      return respond(res, 500, err);
  }
}


module.exports = {
  getDashboardStats,
  getAllData
};
