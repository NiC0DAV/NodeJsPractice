const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');
const { createItemValidation } = require('../middleware/validators/tracks')
const express = require("express");
const router = express.Router();

router.get("/fetchTracks", getItems);
router.get("/fetchTrack", getItem);
router.post("/createTrack", createItemValidation ,createItem);
router.put("/updateTrack", updateItem);
router.delete("/deleteTrack", deleteItem);
router.post('/admin', function(req, res){
    console.log(req.body);
});

module.exports = router;