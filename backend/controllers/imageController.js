const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const Image = require('../models/imageModel');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

exports.uploadImage = async (req, res) => {
  try {
    const { text } = req.body;
    const buffer = req.file.buffer;
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const imagePath = path.join(uploadsDir, fileName);
    const filePath = `/uploads/${fileName}`;

    // Save buffer to a local file
    try {
        await fs.promises.writeFile(imagePath, buffer);
        
    } catch (error) {
        console.log(error)
    }
    console.log(`File saved to ${imagePath}`);

    // Use Tesseract.js to analyze the uploaded image

    console.log(`${req.protocol}://${req.headers.host}${filePath}`);
    const worker = await Tesseract.createWorker('eng');
    const { data: { text: analysisResult } } =  await worker.recognize(`${req.protocol}://${req.headers.host}${filePath}`);
    await worker.terminate();

    console.log(`Tesseract analysis result: ${analysisResult}`);

    // Save the result in MongoDB
    const newImage = new Image({
      text,
      imageUrl: filePath,
      analysisResult,
    });

    const savedImage = await newImage.save();
    res.status(200).json(savedImage);
  } catch (err) {
    console.error(`Error during processing: ${err.message}`);
    res.status(500).send(err.message);
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const results = await Image.find().sort({ _id: -1 });
    res.status(200).json(results);
  } catch (err) {
    console.error(`Error fetching results: ${err.message}`);
    res.status(500).send(err.message);
  }
};

exports.deleteResult = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Image.findById(id);
  
      if (!result) {
        return res.status(404).send('Result not found');
      }
  
      // Delete the image file
      const imagePath = path.join(__dirname, '..', result.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      // Delete the result from MongoDB
      await Image.findByIdAndDelete(id);
  
      res.status(200).send('Result deleted');
    } catch (err) {
      console.error(`Error deleting result: ${err.message}`);
      res.status(500).send(err.message);
    }
  };