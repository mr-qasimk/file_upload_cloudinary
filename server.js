const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post('/upload', upload.array('images', 10), (req, res) => {
  console.log('Received files:', req.files); // Debugging line
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded!',
    });
  }
  res.json({
    success: true,
    message: 'Files uploaded successfully!',
    files: req.files,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
