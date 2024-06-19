require("dotenv").config();
const { FRONTEND_URL_DEV, FRONTEND_URL_PROD ,STRIPE_PRIVATE_KEY } = process.env;
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(STRIPE_PRIVATE_KEY);
const { User } = require("../model/User");

router.post("/create-checkout-session", async (req, res) => {
  try {
    const items = req.body.items; // [{ id: "tutorId", quantity: 2 }]
    const line_items = await Promise.all(
      items.map(async (item) => {
        // Fetch the tutor's details from the database
        const tutor = await User.findById(item.id);
        if (!tutor) {
          throw new Error("Tutor not found");
        }

        // Calculate the total price for the session
        const totalCost = tutor.profile.hourlyRate * 100 * item.quantity; // Convert to cents

        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Tutoring session with ${tutor.username}`,
            },
            unit_amount: totalCost,
          },
          quantity: 1, // This could represent the number of hours booked
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${FRONTEND_URL_PROD}/success`,
      cancel_url: `${FRONTEND_URL_PROD}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
