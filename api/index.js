// Load environment variables from .env at the very top
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.json());

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use environment variable for MongoDB URI
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yourdbname')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const homeRouter = require('../routes/homeRoute');
const searchRouter = require('../routes/searchPaper');
const contactRouter = require('../routes/contactRoute');
const aboutRouter = require('../routes/aboutRoute');
const termRouter = require('../routes/termsRoute');

const adminLogin = require('../routes/adminLogin');
const adminDashboard = require("../routes/admindashboard");
const adminSignup = require('../routes/adminSignup');

const userDash = require("../routes/userDashRoute");
const papersRoute = require("../routes/papers");
const paperViewerRoute = require('../routes/qview');

app.use("/", homeRouter);
app.use("/search", searchRouter);
app.use("/contact", contactRouter);
app.use("/about-us", aboutRouter);
app.use("/terms-and-condition", termRouter);

app.use("/admin-dashboard", adminDashboard);
app.use("/question-papers/submit", adminDashboard);
app.use("/question-papers", adminDashboard);
app.use("/question-papers/edit/:id", adminDashboard);
app.use("/submit", adminDashboard);
app.use("/question-papers/delete/:id", adminDashboard);

app.use("/login", adminLogin);
app.use("/login-admin", adminLogin);

app.use("/signup", adminSignup);
app.use("/signup-admin", adminSignup);

app.use("/user-dashboard", userDash);
app.use("/papers", papersRoute);
app.use('/papers', paperViewerRoute);

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;