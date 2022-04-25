const subjects = require('../models/subject.model');
const { serverError } = require('../utils/handlers');

exports.getAllsubjects = async (req, res) => {
  try {
    subjects.find({}, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.getsubject = async (req, res) => {
  try {
    subjects.findById(req.params.subjectId, function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.createsubject = async (req, res) => {
  try {
    const newsubject = new subjects({
      subject: req.body.subject,
    });
    newsubject.save(function(err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      }
    })
  } catch{serverError(res);}
};

exports.updatesubject = async (req, res) => {
  try {
    subjects.findOneAndUpdate(
      { _id: req.body._id },
      {
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

exports.deletesubject = async (req, res) => {
  try {
    subjects.deleteOne({ _id: req.params.subjectId }, function(err) {
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
    subjects.find({}, function(err, data) {
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