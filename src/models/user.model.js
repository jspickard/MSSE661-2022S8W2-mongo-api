// Require Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'User must have unique name.'
  },
  email: {
    type: String,
    required: 'User must have email.'
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});


userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  return user;
};

// Expose the collections functions for use in our controller
const User = mongoose.model('user', userSchema);

module.exports = User;