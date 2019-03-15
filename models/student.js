// get an instance of mongoose and mongoose.Schema
import mongoose from "mongoose";

var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model(
  "Student",
  new Schema({
    id: Number,
    name: String,
    year: Number,
    class: String
  })
);
