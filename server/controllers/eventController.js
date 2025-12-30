const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.userId });
  res.json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event.createdBy.toString() !== req.userId)
    return res.status(403).json({ message: "Forbidden" });

  await event.deleteOne();
  res.json({ message: "Deleted" });
};
