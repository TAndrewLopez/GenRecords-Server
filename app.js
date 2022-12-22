const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/payment", async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Generational Records",
      payment_method: id,
      confirm: true,
    });

    console.log("payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("error", error);

    res.status(error.statusCode).json({
      message: error.message,
      success: false,
      code: error.code,
      decline_code: error.decline_code,
    });
  }
});

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
