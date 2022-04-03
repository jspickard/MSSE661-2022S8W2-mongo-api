// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const subjectSchema = new Schema({
  subject: {
    type: String,
    required: 'Must have subject.'
  }
});

// Expose the collections functions for use in our controller
module.exports = mongoose.model('subjects', subjectSchema);
