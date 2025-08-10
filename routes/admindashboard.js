const express = require('express');
const router = express.Router();
const QuestionPaper = require('../models/QuestionPaper');
const isAuthenticated = require('../middlewares/auth');

// Show all papers + blank form
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const papers = await QuestionPaper.find().sort({ createdAt: -1 });
    res.render('admindashboard', { papers, editPaper: null, error: null });
  } catch (err) {
    console.error(err);
    res.render('admindashboard', { papers: [], editPaper: null, error: 'Failed to load data' });
  }
});

// Edit form with prefilled data
router.get('/edit/:id', async (req, res) => {
  try {
    const papers = await QuestionPaper.find().sort({ createdAt: -1 });
    const editPaper = await QuestionPaper.findById(req.params.id);
    if (!editPaper) {
      return res.redirect('/question-papers');
    }
    res.render('admindashboard', { papers, editPaper, error: null });
  } catch (err) {
    console.error(err);
    res.redirect('/question-papers');
  }
});

// Create or update paper
router.post('/', async (req, res) => {
  try {
    const { id, name, semester, year, department, type, driveLink } = req.body;

    // Validate required fields
    if (!name || !semester || !year || !department || !type || !driveLink) {
      const papers = await QuestionPaper.find().sort({ createdAt: -1 });
      return res.render('admindashboard', {
        papers,
        editPaper: id ? { _id: id, name, semester, year, department, type, driveLink } : null,
        error: 'All fields are required.'
      });
    }

    // Validate driveLink
    const driveLinkPattern = /^https:\/\/drive\.google\.com\/.*/;
    if (!driveLinkPattern.test(driveLink)) {
      const papers = await QuestionPaper.find().sort({ createdAt: -1 });
      return res.render('admindashboard', {
        papers,
        editPaper: id ? { _id: id, name, semester, year, department, type, driveLink } : null,
        error: 'Invalid Google Drive link format.'
      });
    }

    if (id) {
      // Update existing paper
      const paper = await QuestionPaper.findById(id);
      if (!paper) return res.redirect('/question-papers');

      paper.name = name;
      paper.semester = semester;
      paper.year = year;
      paper.department = department;
      paper.type = type;
      paper.driveLink = driveLink;
      await paper.save();
    } else {
      // Create new paper
      const newPaper = new QuestionPaper({
        name,
        semester,
        year,
        department,
        type,
        driveLink,
        uploadedBy: 'Admin'
      });
      await newPaper.save();
    }

    res.redirect('/question-papers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete paper
router.post('/delete/:id', async (req, res) => {
  try {
    await QuestionPaper.findByIdAndDelete(req.params.id);
    res.redirect('/question-papers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
