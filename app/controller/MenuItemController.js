const MenuItemModel = require("../models/MenuItemModel");
const menuItemList = require("../models/resources/menuitems.json");

const MenuItemsController = {
  addMenuItem: async function (request, response) {
    try {
      let result = await MenuItemModel.insertMany(menuItemList);
      response.status(200).send({
        status: true,
        message: "menuitem added successfully",
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
  getMenuItem: async function (request, response) {
    let id = request.query.resid;
    id = id ? id : 0;

    try {
      let result = await MenuItemModel.find({ restaurantId: id });
      response.status(200).send({
        status: true,
        menu_items: result,
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

module.exports = MenuItemsController;
