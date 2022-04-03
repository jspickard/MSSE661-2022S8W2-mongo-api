const subjects = require('../models/subject.model');

exports.getAllsubjects = function(req, res) {
  subjects.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.getsubject = function(req, res) {
  subjects.findById(req.params.subjectId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.createsubject = function(req, res) {
  const newsubject = new subjects({
    owner: req.body.owner,
    subject: req.body.subject,
  });
  newsubject.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.updatesubject = function(req, res) {
  subjects.findOneAndUpdate(
    { _id: req.params.subjectId },
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

exports.deletesubject = function(req, res) {
  subjects.deleteOne({ _id: req.params.subjectId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};

exports.getrandom = function(req, res) {
  subjects.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    let size = data.length;
    let randomIndex = Math.floor(Math.random()*size);
    res.json(data[randomIndex]);
  });
};