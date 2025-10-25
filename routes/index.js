var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
var cors = require('cors')
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET About page */
router.get('/about', function(req, res, next) {
  console.log("About page requested");
  res.render('about', { title: 'About' });
});

/* GET Contact page */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* GET Project page */
router.get('/project', function(req, res, next) {
  res.render('project', { title: 'Projects' });
});
/* Get Expense Project Details */
router.get('/expense', function(req, res, next) {
  res.render('expense', { title: 'expense' });
});
/* Get rental project details */
router.get('/rental', function(req, res, next) {
  res.render('rental', { title: 'rental' });
});
/* Get ai project details */
router.get('/ai', function(req, res, next) {
  res.render('ai', { title: 'ai' });
});
/* Guljo project details*/
router.get('/guljo', function(req, res, next) {
  res.render('guljo', { title: 'guljo' });
});
/* Logistics Management SYstem */
router.get('/logistics', function(req, res, next) {
  res.render('logistics', { title: 'logistics' });
});
/* Leave Management System */
router.get('/leave', function(req, res, next) {
  res.render('leave', { title: 'leave' });
});
/* ride */
router.get('/ride', function(req, res, next) {
  res.render('ride', { title: 'ride' });
});
/* chat */
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'chat' });
});
/* social */
router.get('/social', function(req, res, next) {
  res.render('social', { title: 'social' });
});
/* loan kycs */
router.get('/loan', function(req, res, next) {
  res.render('loan', { title: 'loans' });
});
/* muj */
router.get('/muj', function(req, res, next) {
  res.render('muj', { title: 'muj' });
});
/* Send Email */
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  //  Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    //  Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    //  Email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Your inbox
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <hr>
        <p style="font-size: 12px; color: gray;">
          Sent from your website contact form.
        </p>
      `
    };
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(" Email sent successfully");
    res.status(200).json({ success: "Email sent successfully!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
module.exports = router;