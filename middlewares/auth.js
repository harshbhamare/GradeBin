const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies.token;

  if (!authHeader) {
    return res.status(401).redirect('/admin/login');
  }

  // If from header, token format: 'Bearer tokenstring'
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // user info inside token payload
    next();
  } catch (err) {
    return res.status(401).redirect('/admin/login');
  }
}

module.exports = isAuthenticated;
