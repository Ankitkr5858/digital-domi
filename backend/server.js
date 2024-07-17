const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file


const app = express();
const port = 3001;
app.use(cors())

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/', imageRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});