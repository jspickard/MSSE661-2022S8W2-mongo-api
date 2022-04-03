const icebreakers = require('../models/icebreaker.model');

exports.getAllicebreakers = function(req, res) {
  icebreakers.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.geticebreaker = function(req, res) {
  icebreakers.findById(req.params.icebreakerId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.createicebreaker = function(req, res) {
  const newicebreaker = new icebreakers({
    owner: req.body.owner,
    icebreaker: req.body.icebreaker,
  });
  newicebreaker.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.updateicebreaker = function(req, res) {
  icebreakers.findOneAndUpdate(
    { _id: req.params.icebreakerId },
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

exports.deleteicebreaker = function(req, res) {
  icebreakers.deleteOne({ _id: req.params.icebreakerId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};

exports.getrandom = function(req, res) {
  icebreakers.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    let size = data.length;
    let randomIndex = Math.floor(Math.random()*size);
    res.json(data[randomIndex]);
  });
};