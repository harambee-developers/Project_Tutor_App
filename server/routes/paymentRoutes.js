require("dotenv").config();
const { FRONTEND_URL, STRIPE_PRIVATE_KEY } = process.env;
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(STRIPE_PRIVATE_KEY);
const { User } = require("../model/User");

router.post("/create-checkout-session", async (req, res) => {
  try {
    const items = req.body.items; // [{ id: "tutorId", subject: "python", price: 30, hours: 2 }]
    const line_items = await Promise.all(
      items.map(async (item) => {
        // Fetch the tutor's details from the database
        const tutor = await User.findById(item.id);
        if (!tutor) {
          throw new Error("Tutor not found");
        }

        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${item.subject} session with ${tutor.username}`,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.hours, // This could represent the number of hours booked
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
