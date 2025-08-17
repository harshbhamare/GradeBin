require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//  "mongodb://127.0.0.1:27017/tesstttttt"

const dbURI = process.env.MONGO_URI; 

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Views setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Import routers
const homeRouter = require("../routes/homeRoute");
const searchRouter = require("../routes/searchPaper");
const contactRouter = require("../routes/contactRoute");
const aboutRouter = require("../routes/aboutRoute");
const termRouter = require("../routes/termsRoute");

const adminLogin = require("../routes/adminLogin");
const adminDashboard = require("../routes/admindashboard");
const adminSignup = require("../routes/adminSignup");

const userDash = require("../routes/userDashRoute");
const papersRoute = require("../routes/papers");
const paperViewerRoute = require("../routes/qview");

// Routes
app.use("/", homeRouter);
app.use("/search", searchRouter);
app.use("/contact", contactRouter);
app.use("/about-us", aboutRouter);
app.use("/terms-and-condition", termRouter);

app.use("/admin-dashboard", adminDashboard);
app.use("/question-papers", adminDashboard);  // handles create, edit, delete

app.use("/login-admin", adminLogin);
app.use("/signup-admin", adminSignup);

app.use("/user-dashboard", userDash);
app.use("/papers", papersRoute);
app.use('/papers', paperViewerRoute);

// Start server
// app.listen(process.env.PORT || 4000, () => {
//   console.log("Server running on port", process.env.PORT || 4000);
// });

module.exports = app;