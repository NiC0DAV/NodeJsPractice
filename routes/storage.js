const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/storage/handleStorage');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage');
const { validatorGetItem } = require('../middleware/validators/storage')

/**
 * 
 */
router.post('/upload', uploadMiddleware.single("myFile"), createItem);
router.get("/fetchStorages", getItems);
router.get("/fetchStorage/:id?", validatorGetItem, getItem);

// router.put("/updateTrack/:id?", updateItemValidation, updateItem);
router.delete("/deleteTrack/:id?", validatorGetItem, deleteItem);
module.exports = router;