const LocationModel = require("../models/LocationModel");
const LocationList = require("../models/resources/location.json");

const LocationController = {
  getLocation: async function (request, response) {
    try {
      let result = await LocationModel.find();
      response.status(200).send({
        status: true,
        locationList: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getLocationByCityName: async function (request, response) {
    let { name } = request.query;
    try {
      let result = await LocationModel.find({
        city: { $regex: name + ".*", $options: "i" },
      });
      response.status(200).send({
        status: true,
        locationList: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addLocationList: async function (request, response) {
    try {
      let result = await LocationModel.insertMany(LocationList);
      response.status(200).send({
        status: true,
        message: "location added successfully",
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

module.exports = LocationController;
