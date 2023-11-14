const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../config");
const testapp = express();
const app = express();
const port = config.api.port;
const userRoutes = require("../src/routes/userRoutes");
app.use(bodyParser.json());
testapp.use(bodyParser.json());
app.use("/users", userRoutes);
testapp.use("/users", userRoutes);

mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("db connected successfully");
    app.listen(port, () => {
      console.log(`listening @ ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
  });

module.exports = testapp;
