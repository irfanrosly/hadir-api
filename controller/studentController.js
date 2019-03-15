import Student from "../models/student";

exports.index = function(req, res) {
  Student.find(function(err, student) {
    if (err) {
      res.json({
        status: "Error",
        message: err
      });
    }
    res.json({
      status: "Success",
      message: "Student retrieved successfully!",
      data: student
    });
  });
};

exports.new = async function(req, res) {
  const getStudent = await Student.findOne({ id: req.body.id });

  if (getStudent) {
    res
      .status(422)
      .json({ status: "Fail", message: "Student ID already exists!" });
  } else {
    var student = new Student({
      id: req.body.id,
      name: req.body.name.toLowerCase(),
      year: req.body.year,
      class: req.body.class.toLowerCase()
    });

    student.save(function(err) {
      res.json({
        status: "Success",
        message: "Student registered!",
        data: student
      });
    });
  }
};

exports.view = function(req, res) {
  Student.find({ year: req.params.year, class: req.params.class }, function(
    err,
    student
  ) {
    if (err) res.send(err);
    res.json({
      status: "Success",
      message: "Students retrieved!",
      data: student
    });
  });
};

exports.delete = function(req, res) {
  Student.remove(
    {
      id: req.params.id
    },
    function(err, student) {
      if (err) res.send(err);
      res.json({
        status: "Success",
        message: "Student deleted!"
      });
    }
  );
};
