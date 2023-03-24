const tracksController = require('../controllers/tracks');
const express = require("express");
const router = express.Router();

router.get("/", tracksController.getItems);

module.exports = router;