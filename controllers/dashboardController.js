const { Event, Club, UserEvent } = require("../models");
const respond = require("../utils/respond.js");


const getDashboardStats = async (req, res, next) => {
  try {

    const eventCount = await Event.count();
    const clubCount = await Club.count();

    // acceptance rate 
    const acceptanceCount = await UserEvent.count({
      where: { status: "Accepted" },
    });
    const userEventsCount = await UserEvent.count();

    const declinedCount = await UserEvent.count({
      where: { status: "Declined" },
    });

    const accpetanceRate = Math.round(acceptanceCount / userEventsCount) * 100 ;
    const declineRate = Math.round(declinedCount / userEventsCount) * 100 ;

    const stats = {
      eventCount,
      clubCount,
      accpetanceRate, 
      declineRate,
    };

    res && respond(res, 200, stats);
  } catch(err) {
    return respond(res, 500, err);
  }
}
module.exports = {
  getDashboardStats,
};
