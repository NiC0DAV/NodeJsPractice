const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');
const { createItemValidation, getItemValidation, updateItemValidation, deleteItemValidation } = require('../middleware/validators/tracks')
const express = require("express");
const router = express.Router();

router.get("/fetchTracks", getItems);
router.get("/fetchTrack/:id?", getItemValidation, getItem);
router.post("/createTrack", createItemValidation ,createItem);
router.put("/updateTrack/:id?", updateItemValidation, updateItem);
router.delete("/deleteTrack/:id?", deleteItemValidation, deleteItem);
router.post('/admin', function(req, res){
    console.log(req.body);
});

module.exports = router;