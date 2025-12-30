const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { rsvp } = require("../controllers/rsvpController");

router.post("/:id", auth, rsvp);

module.exports = router;
