// const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const Contact = require('../models/Contact');



dotenv.config();
const contactController = {
  createContact: async (req, res) => {
    const { name, email, message } = req.body;

    try {
      // Create a new contact in the database
      const newContact = new Contact({
        name,
        email,
        message,
      });

      const savedContact = await newContact.save();

      // Set up the Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Configure the email options
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission from ${name} (${email}):\n\n${message}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
      });

      res.json(savedContact);
    } catch (err) { 
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = contactController;