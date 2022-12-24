const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//API/STRIPE
router.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

router.post("/create-payment-intent", async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: 1999,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
