const express = require('express');
const multer = require('multer');
const { uploadImage, getAllResults,deleteResult } = require('../controllers/imageController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/upload', getAllResults);
router.delete('/upload/:id', deleteResult);

module.exports = router;