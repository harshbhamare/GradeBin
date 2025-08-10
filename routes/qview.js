// paperViewerRoute.js (or add in your main route file)
const express = require('express');
const router = express.Router();

router.get('/view', (req, res) => {
  const { driveLink } = req.query;

  if (!driveLink) {
    return res.status(400).send("Drive link missing");
  }

  // Render the viewer page and pass the driveLink
  res.render('paper-viewer', { driveLink });
});

module.exports = router;
