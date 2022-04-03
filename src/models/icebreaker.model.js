// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const icebreakerSchema = new Schema({
  icebreaker: {
    type: String,
    required: 'Must have icebreaker.'
  }
});

// Expose the collections functions for use in our controller
module.exports = mongoose.model('icebreakers', icebreakerSchema);
