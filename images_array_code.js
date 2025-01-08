const express = require('express');
const dotenv = require('dotenv');

const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/imageRoutes'); // Import the router

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the image routes
app.use('/api/images', imageRoutes); // Prefix the routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});