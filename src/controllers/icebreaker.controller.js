const icebreakers = require('../models/icebreaker.model');
const { serverError } = require('../utils/handlers');

exports.getAllicebreakers = async (req, res) => {
  try {
    icebreakers.find({}, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.geticebreaker = async (req, res) => {
  try {
    icebreakers.findById(req.params.icebreakerId, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.createicebreaker = async (req, res) => {
  try {
    const newicebreaker = new icebreakers({
      icebreaker: req.body.icebreaker,
    });
    newicebreaker.save(function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.updateicebreaker = async (req, res) => {
  try {
    icebreakers.findOneAndUpdate(
      { _id: req.body._id },
      {
        icebreaker: req.body.icebreaker,
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

exports.deleteicebreaker = async (req, res) => {
  try {
    icebreakers.deleteOne({ _id: req.params.icebreakerId }, function(err) {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ msg: 'Deleted successfully.' });
      }
    })
  } catch{serverError(res);}
};

exports.getrandom = async (req, res) => {
  try {
    icebreakers.find({}, function(err, data) {
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