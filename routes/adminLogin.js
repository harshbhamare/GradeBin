const express = require('express');
const router = express.Router();
const AdminModel = require("../models/AdminModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", function(req, res){
    res.render("admin-login")
})

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(401).render('admin-login', { error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).render('admin-login', { error: 'Invalid email or password' });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
    });


    return res.redirect('/admin-dashboard'); 

  } catch (err) {
    console.error(err);
    return res.status(500).render('admin-login', { error: 'Server error, please try again later' });
  }
});

module.exports = router;
