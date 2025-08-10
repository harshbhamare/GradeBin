const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const AdminModel = require('../models/AdminModel');

router.get("/", (req, res) => {
  res.render("admin-signup");
});

router.post("/", async (req, res) => {
  const { aName, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.render("admin-signup", { error: "Passwords do not match!" });
  }

  try {
    const existingUser = await AdminModel.findOne({ email });
    if (existingUser) {
      return res.render("admin-signup", { error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    const newUser = new AdminModel({
      name: aName,
      email: email,
      password: hashedPassword,
      role: 'admin'
    });

    await newUser.save();

    return res.redirect('/login');

  } catch (err) {
    console.error(err);
    return res.render("admin-signup", { error: "Something went wrong. Please try again." });
  }
});

module.exports = router;
