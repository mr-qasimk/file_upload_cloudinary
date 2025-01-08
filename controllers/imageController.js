const cloudinary = require('cloudinary').v2; // Import Cloudinary
const fs = require('fs');

// Load environment variables
require('dotenv').config(); // Ensure this line is present

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Controller function to handle image uploads
const uploadImages = async (req, res) => {
  console.log('Received files:', req.files);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded!',
    });
  }

  try {
    const uploadPromises = req.files.map(file => {
      return cloudinary.uploader.upload(file.path, {
        folder: 'uploads', // Optional: organize images in a specific folder
      }).then(result => {
        // Remove the file from the local server after uploading to Cloudinary
        fs.unlinkSync(file.path);
        return result;
      });
    });

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: 'Images uploaded successfully!',
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image upload failed!',
      error: error.message,
    });
  }
};

module.exports = {
  uploadImages,
}; 