const quotes = require('../models/quote.model');

exports.getAllquotes = function(req, res) {
  quotes.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.getquote = function(req, res) {
  quotes.findById(req.params.quoteId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.createquote = function(req, res) {
  const newquote = new quotes({
    owner: req.body.owner,
    quote: req.body.quote,
  });
  newquote.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.updatequote = function(req, res) {
  quotes.findOneAndUpdate(
    { _id: req.params.quoteId },
    req.body,
    { new: true },
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

exports.deletequote = function(req, res) {
  quotes.deleteOne({ _id: req.params.quoteId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully. Youre killing independent George!' });
  });
};

exports.getrandom = function(req, res) {
  quotes.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    let size = data.length;
    let randomIndex = Math.floor(Math.random()*size);
    res.json(data[randomIndex]);
  });
};