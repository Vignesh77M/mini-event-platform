const Event = require("../models/Event");

exports.rsvp = async (req, res) => {
  const event = await Event.findOneAndUpdate(
    {
      _id: req.params.id,
      capacity: { $gt: 0 },
      attendees: { $ne: req.userId }
    },
    {
      $push: { attendees: req.userId },
      $inc: { capacity: -1 }
    },
    { new: true }
  );

  if (!event)
    return res.status(400).json({ message: "Event full or already joined" });

  res.json(event);
};
