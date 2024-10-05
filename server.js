require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5501;

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // To handle JSON data, if needed

// Create a transporter object using your email service provider
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services like 'yahoo', 'outlook', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or application-specific password
    }
});

// Route to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, msg } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: process.env.EMAIL_USER,   // List of recipients
        subject: 'New Contact Form Message',
        text: `New message from ${name} (${email}):\n\n${msg}` // Email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.send('Message sent successfully!');
    });
});

// Serve static files (like your HTML files)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
