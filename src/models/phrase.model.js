// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const phraseSchema = new Schema({
  icebreaker: {
    type: String,
    required: 'Must have icebreaker.'
  },
  subject: {
    type: String,
    required: 'Must have subject.'
  },
});

// Expose the collections functions for use in our controller
module.exports = mongoose.model('phrases', phraseSchema);
