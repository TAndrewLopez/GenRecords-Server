const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//PROJECT API ROUTES
app.use("/api", require("./api"));

//ERROR HANDLING FOR SERVER SIDE ISSUES
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json(err.message || "Internal Server Error. ❌ ");
});

module.exports = app;
