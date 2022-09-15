// import mongoose schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const mealTypeSchema = new Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  meal_type: { type: Number },
});

const mealTypeModel = mongoose.model("mealType", mealTypeSchema);

module.exports = mealTypeModel;
