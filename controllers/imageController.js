const { Club, Event } = require('../models');

exports.uploadImage = async (req, res) => {
  try {
    const { type, targetId } = req.body;
    const imagePath = req.file.path;

    if (type === 'club') {
      const club = await Club.findByPk(targetId);
      if (!club) return res.status(404).send({ message: "Club not found." });

      club.imagePath = imagePath;
      await club.save();

      return res.status(200).send({ message: 'Club image uploaded successfully', imagePath });
    } else if (type === 'event') {
      const event = await Event.findByPk(targetId);
      if (!event) return res.status(404).send({ message: "Event not found." });

      event.imagePath = imagePath;
      await event.save();

      return res.status(200).send({ message: 'Event image uploaded successfully', imagePath });
    } else {
      return res.status(400).send({ message: "Invalid type. It must be 'club' or 'event'." });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
