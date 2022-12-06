const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//PROJECT ROUTES
app.use("/api", require("./api"));

//ERROR HANDLING FOR SERVER SIDE ISSUES
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json(err.message || "Internal Server Error. ❌ ");
});

module.exports = app;
