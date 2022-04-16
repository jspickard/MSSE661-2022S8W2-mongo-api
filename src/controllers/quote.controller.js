const quotes = require('../models/quote.model');
const { serverError } = require('../utils/handlers');

exports.getAllquotes = async (req, res) => {
  try {
    quotes.find({}, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.getquote = async (req, res) => {
  try {
    quotes.findById(req.params.quoteId, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.createquote = async (req, res) => {
  try {
    const newquote = new quotes({
      owner: req.body.owner,
      quote: req.body.quote,
      episode: req.body.episode,
      air_date: req.body.air_date,
    });
    newquote.save(function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.updatequote = async (req, res) => {
  try {
    quotes.findOneAndUpdate(
      { _id: req.body._id },
      {
        owner: req.body.owner,
        quote: req.body.quote,
        episode: req.body.episode,
        air_date: req.body.air_date,
      },
      { new: true },
      (err, data) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json(data);
        }
      }
    );
  } catch{serverError(res);}
};

exports.deletequote = async (req, res) => {
  try {
    quotes.deleteOne({ _id: req.params.quoteId }, function(err) {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ msg: 'Deleted successfully. Youre killing independent George!' });
      }
    })
  } catch{serverError(res);}
};

exports.getrandom = async (req, res) => {
  try {
    quotes.find({}, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        let size = data.length;
        let randomIndex = Math.floor(Math.random()*size);
        res.json(data[randomIndex]);
      }
    });
  } catch{serverError(res);}
};