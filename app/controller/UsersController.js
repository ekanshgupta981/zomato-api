const UsersModel = require("../models/UsersModel");

const UserController = {
  userSignUp: async function (request, response) {
    let data = request.body;
    try {
      const newUser = new UsersModel({
        email: data.email,
        password: data.password,
        firstname: data.firstname ? data.firstname : undefined,
        lastname: data.lastname ? data.lastname : undefined,
      });
      let result = await UsersModel.findOne({ email: data.email });
      if (result) {
        response.status(200).send({
          status: false,
          message: "Email id already exist",
        });
      } else {
        let saveResult = await newUser.save();
        response.status(200).send({
          status: true,
          result: saveResult,
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  userLogin: async function (request, response) {
    let data = request.body;
    try {
      let result = await UsersModel.findOne({
        email: data.email,
      });
      if (result) {
        if (result.password === data.password) {
          let { _id, email, firstname, lastname } = result;
          response.status(200).send({
            status: true,
            result: {
              _id,
              email,
              firstname,
              lastname,
            },
            message: "login successful !!",
          });
        } else {
          response.status(200).send({
            status: false,
            message: "password is wrong",
          });
        }
      } else {
        response.status(200).send({
          status: false,
          message: "user id is wrong",
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = UserController;
