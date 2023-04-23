require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoutes = require("./app/routes/api-routes");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

console.log("connecting to database...");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    () =>
      app.listen(process.env.PORT || 4000, function () {
        console.log(
          "your server is running on http://localhost:",
          process.env.PORT
        );
      }),
    console.log("DataBase connected !!!")
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
