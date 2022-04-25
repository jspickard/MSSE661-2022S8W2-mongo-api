const phrases = require('../models/phrase.model');
const { serverError } = require('../utils/handlers');

exports.getAllphrases = async (req, res) => {
  try {
    phrases.find({}, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.getphrase = async (req, res) => {
  try {
    phrases.findById(req.params.phraseId, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.createphrase = async (req, res) => {
  try {
    const newphrase = new phrases({
      icebreaker: req.body.icebreaker,
      subject: req.body.subject,
    });
    newphrase.save(function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.updatephrase = async (req, res) => {
  try {
    phrases.findOneAndUpdate(
      { _id: req.body._id },
      {
        icebreaker: req.body.icebreaker,
        subject: req.body.subject,
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

exports.deletephrase = async (req, res) => {
  try {
    phrases.deleteOne({ _id: req.params.phraseId }, function(err) {
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
    phrases.find({}, function(err, data) {
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