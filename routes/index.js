const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/', async (req, res) => {
    const projects = await Project.find({});
    res.render('home', { projects });
});

module.exports = router;
