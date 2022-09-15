const MealTypeModel = require("../models/MealTypeModel");
const mealType = require("../models/resources/mealtype.json");

const MealTypeController = {
  apiHome: function (request, response) {
    response.status(200).send({
      status: true,
    });
  },

  getMealType: async function (request, response) {
    try {
      let result = await MealTypeModel.find();
      response.status(200).send({
        status: true,
        meal_type: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addMealType: async function (request, response) {
    try {
      let result = await MealTypeModel.insertMany(mealType);
      response.status(200).send({
        status: true,
        message: "meal type add successfully",
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = MealTypeController;
