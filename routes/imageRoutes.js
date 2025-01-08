const express = require('express');
const multer = require('multer');
const { uploadImages } = require('../controllers/imageController');

const router = express.Router();

// Multer setup for local file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// API Endpoint to upload multiple images
router.post('/upload', upload.array('images', 10), uploadImages);

module.exports = router; 