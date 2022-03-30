// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const quoteSchema = new Schema({
  owner: {
    type: String,
    required: 'Must cite the name of the character who spoke the quote. Thats a shame.'
  },
  quote: {
    type: String,
    required: 'Must include the quote itself. She’s a sentence finisher. It’s like dating Mad Libs.'
  },
  episode: {
    type: Number
  },
  air_date: {
    type: Date
  }
});

// Expose the collections functions for use in our controller
module.exports = mongoose.model('quotes', quoteSchema);
