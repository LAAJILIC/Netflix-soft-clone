const functions = require("firebase-functions");

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  // init Stripe, secret key through CLI
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ["card"],
    amount: 7.99,
    currency: "eur",
  });
  const {client_secret: clientSecret, id} = paymentIntent;

  return {
    id,
    clientSecret,
    message: "Created",
  };
});
