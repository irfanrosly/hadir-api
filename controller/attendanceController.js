import moment from "moment";

import Attendance from "../models/attendance";
import Student from "../models/student";

exports.index = function(req, res) {
  Attendance.find(function(err, attendance) {
    if (err) {
      res.json({
        status: "Error",
        message: err
      });
    }
    res.json({
      status: "Success",
      message: "Attendance retrieved successfully",
      data: attendance
    });
  });
};

exports.new = async function(req, res) {
  const student = await Student.findOne({ id: req.body.id });
  const checkAttendance = await Attendance.findOne({
    id: req.body.id,
    date: moment().format("YYYYMMDD")
  });

  if (student && !checkAttendance) {
    var attendance = new Attendance({
      id: student.id,
      name: student.name.toLowerCase(),
      year: student.year,
      class: student.class.toLowerCase(),
      date: moment().format("YYYYMMDD")
    });

    attendance.save(function(err) {
      res.json({ message: "Attendance recorded!", data: attendance });
    });
  } else if (checkAttendance) {
    res
      .status(422)
      .json({ status: "Fail", message: "Attendance already recorded!" });
  } else {
    res
      .status(400)
      .json({ status: "Fail", message: "Student does not exist!" });
  }
};

exports.view = function(req, res) {
  Attendance.find(
    {
      date: req.params.date,
      year: req.params.year,
      class: req.params.class.toLowerCase()
    },
    function(err, attendance) {
      if (err) res.send(err);
      res.json({
        message: "Attendances retrieved!",
        data: attendance
      });
    }
  );
};
