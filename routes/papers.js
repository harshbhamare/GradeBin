const express = require("express");
const router = express.Router();
const QuestionPaper = require("../models/QuestionPaper");

// Get unique subjects based on department + year
router.get("/subjects", async (req, res) => {
  try {
    const { department, year } = req.query;
    if (!department || !year) {
      return res.status(400).json({ error: "Department and year required" });
    }

    const subjects = await QuestionPaper.distinct("name", { department, year });
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// router.get('/search', async (req, res) => {
//   try {
//     const { department, year, type, subject } = req.query;

//     const query = {};

//     if (department && department !== 'Select Department') {
//       query.department = new RegExp(`^${department.trim()}$`, 'i');
//     }
//     if (year) {
//       query.year = Number(year);
//     }
//     if (type && type !== 'Select Paper Type') {
//       query.type = new RegExp(`^${type.trim()}$`, 'i');
//     }
//     if (subject && subject !== 'Select Subject') {
//       // Subject is part of name, so do a case-insensitive substring search on 'name'
//       query.name = { $regex: subject.trim(), $options: 'i' };
//     }

//     const papers = await QuestionPaper.find(query).lean();
//     res.json(papers);
//   } catch (err) {
//     console.error('Search papers error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.get('/search', async (req, res) => {
  try {
    const { department, year, type, subject } = req.query;

    const query = {};

    if (department && department !== 'Select Department') {
      query.department = new RegExp(`^${department.trim()}$`, 'i');
    }
    if (year) {
      query.year = Number(year);
    }
    if (type && type !== 'Select Paper Type') {
      query.type = new RegExp(`^${type.trim()}$`, 'i');
    }
    if (subject && subject !== 'Select Subject') {
      // Subject is part of name, so do a case-insensitive substring search on 'name'
      query.name = { $regex: subject.trim(), $options: 'i' };
    }

    const papers = await QuestionPaper.find(query).lean();
    res.json(papers);
  } catch (err) {
    console.error('Search papers error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
