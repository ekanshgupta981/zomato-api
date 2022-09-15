const RestaurantModel = require("../models/RestaurantModel");
const restaurantList = require("../models/resources/restaurant.json");

const RestaurantController = {
  getRestaurant: async function (request, response) {
    try {
      let result = await RestaurantModel.find();
      response.status(200).send({
        status: true,
        restaurantList: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addRestaurantList: async function (request, response) {
    try {
      await RestaurantModel.insertMany(restaurantList);
      response.status(200).send({
        status: true,
        message: "Restaurant added successfully",
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRestaurantDetailsById: async function (request, response) {
    try {
      let { id } = request.params;
      let data = await RestaurantModel.findById(id);
      response.status(200).send({
        status: true,
        result: data,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRestaurantByLocationId: async function (request, response) {
    let { lid, rest } = request.query;

    try {
      let data = await RestaurantModel.find(
        {
          name: { $regex: rest + ".*", $options: "i" },
          location_id: Number(lid),
        },
        { name: 1, image: 1, locality: 1, id: 1, city: 1 }
      );
      response.status(200).send({ status: true, result: data });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  filterRestaurant: async function (request, response) {
    let {
      mealtype,
      location,
      cuisine,
      lcost,
      hcost,
      page,
      sort,
      itemsPerPage,
    } = request.body;

    sort = sort ? sort : 1;

    page = page ? page : 1;
    itemsPerPage = itemsPerPage ? itemsPerPage : 2;

    let StartingIndex = page * itemsPerPage - itemsPerPage;
    let lastIndex = page * itemsPerPage;

    let filterObject = {};

    if (mealtype) filterObject["mealtype_id"] = mealtype;
    if (location) filterObject["location_id"] = location;
    if (cuisine) filterObject["cuisine_id"] = { $in: cuisine };
    if (lcost && hcost)
      filterObject["min_price"] = { $gte: lcost, $lte: hcost };

    try {
      let result = await RestaurantModel.find(filterObject, {
        aggregate_rating: 1,
        city: 1,
        image: 1,
        locality: 1,
        name: 1,
        min_price: 1,
        cuisine: 1,
      }).sort({
        min_price: sort,
      });
      const pageFilterResult = result.slice(StartingIndex, lastIndex);
      response.status(200).send({
        status: true,
        result: pageFilterResult,
        PageCount: Math.ceil(result.length / 2),
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

module.exports = RestaurantController;
