const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const quoteRoutes = require('./routes/quote.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const middleware = require('./middleware/errors.middleware');
const icebreakerRoutes = require('./routes/icebreaker.routes');
const subjectRoutes = require('./routes/subject.routes');
const phraseRoutes = require('./routes/phrase.routes');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';
const env = process.env.NODE_ENV;

if (env != 'test') {
  app.use(logger(logLevel));
}

// Make connection to the db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MSSE661-2022S8W2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Store the instance of db so we can listen to events.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connection Successful!');
});

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Partial API endpoints.
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/icebreakers', icebreakerRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/phrases', phraseRoutes);

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests
// applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});
