const express = require("express");
const router = express.Router();
const Meal_type = require("../controller/MealTypeController");
const location = require("../controller/LocationController");
const restaurant = require("../controller/RestaurantController");
const users = require("../controller/UsersController");
const menuitems = require("../controller/MenuItemController");
const paymentController = require("../controller/PaymentController");

router.get("/", Meal_type.apiHome);
// meals
router.get("/get-meal-type", Meal_type.getMealType);
router.post("/add-meal-type", Meal_type.addMealType);

// location
router.get("/get-location", location.getLocation);
router.post("/add-location", location.addLocationList);
router.get("/get-location-by-city", location.getLocationByCityName);

// Restaurant
router.get("/get-restaurant", restaurant.getRestaurant);
router.post("/add-restaurant", restaurant.addRestaurantList);
router.get("/get-restaurant-by-id/:id", restaurant.getRestaurantDetailsById);
router.get(
  "/get-restaurant-by-location-id",
  restaurant.getRestaurantByLocationId
);
router.post("/filter", restaurant.filterRestaurant);

//Menuitems
router.post("/add-menuitems", menuitems.addMenuItem);
router.get("/get-menuitems", menuitems.getMenuItem);

// Sign up
router.post("/sign-up", users.userSignUp);
//login
router.post("/login", users.userLogin);

// payment //
router.post("/payment", paymentController.payment); // react
router.post("/callback", paymentController.callback); // react
module.exports = router;
