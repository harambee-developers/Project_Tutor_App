require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
const { FRONTEND_URL, STRIPE_PRIVATE_KEY, GOOGLE_REFRESH_TOKEN } = process.env;
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(STRIPE_PRIVATE_KEY);
const { User } = require("../model/User");
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const createGoogleMeetLink = async () => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const attendeesEmails = [
      { 'email': 'user1@example.com' },
      { 'email': 'user2@example.com' }
      ];

    const event = {
      summary: 'Tutoring Session',
      description: 'Tutoring session booked through our platform',
      conferenceData: {
        createRequest: {
          requestId: 'tutoring-session',
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      start: {
        dateTime: '2024-06-28T10:00:00-07:00', // Set this to the appropriate time
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2024-06-28T11:00:00-07:00', // Set this to the appropriate time
        timeZone: 'America/Los_Angeles',
      },
      attendees: attendeesEmails, // Add attendee email
    };

    const response = calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    if (!response.data.hangoutLink) {
      throw new Error('Failed to create Google Meet link');
    }

    return response.data.hangoutLink;
  } catch (error) {
    console.error('Error creating Google Meet link:', error);
    throw new Error('Could not create Google Meet link');
  }
};

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
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/payment-success", async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Retrieve the session. If you need more details, you can expand the line_items or customer
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const meetLink = await createGoogleMeetLink();

      // Send email to the user with the Google Meet link
      const emailResponse = await sendEmail({
        to: session.customer_email,
        subject: "Your Tutoring Session Link",
        text: `Thank you for your payment. Here is your Google Meet link for the tutoring session: ${meetLink}`,
      });

      res
        .status(200)
        .json({ message: "Meet link sent successfully", meetLink });
    } else {
      res.status(400).json({ message: "Payment not successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const sendEmail = async ({ to, subject, text }) => {
  // Use your preferred email sending service (e.g., SendGrid, Nodemailer)
  // Example with Nodemailer:
  const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
};

module.exports = router;
