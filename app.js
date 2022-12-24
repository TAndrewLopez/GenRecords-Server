const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// const stripe = require("stripe")(process.env.STRIPE_PUBLISHABLE_KEY);
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//STRIPE ROUTES
// app.post("/payment", async (req, res) => {
//   const { amount, id } = req.body;
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "USD",
//       description: "Generational Records",
//       payment_method: id,
//       confirm: true,
//     });

//     console.log("payment", payment);
//     res.json({
//       message: "Payment successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("error", error);

//     res.status(error.statusCode).json({
//       message: error.message,
//       success: false,
//       code: error.code,
//       decline_code: error.decline_code,
//     });
//   }
// });

// app.get("/config", (req, res) => {
//   res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
// });

// app.post("/create-payment-intent", async (req, res, next) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "usd",
//       amount: 1999,
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     next(error);
//   }
// });

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
