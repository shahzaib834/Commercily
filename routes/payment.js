const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const router = express.Router();

router.route('/create-checkout-session').post(async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 1000,
          },
          quantity: item.toOrder,
        };
      }),
      success_url: 'http://localhost:4200/checkout',
      cancel_url: 'http://localhost:4200/checkout',
    });
    return res.status(200).json({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err,
    });
  }
});

module.exports = router;
