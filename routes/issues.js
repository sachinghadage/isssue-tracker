const express = require('express');
const router = express.Router({ mergeParams: true });
const Issue = require('../models/issue');
const Project = require('../models/project');

// Route to render the form for creating a new issue
router.get('/new', async (req, res) => {
    console.log('Render createIssue view');
    const project = await Project.findById(req.params.projectId);
    res.render('createIssue', { project });
});

// Route to handle the creation of a new issue
router.post('/', async (req, res) => {
    const { title, description, labels, author } = req.body;
    const issue = new Issue({
        title,
        description,
        labels: labels.split(',').map(label => label.trim()),
        author,
        project: req.params.projectId
    });
    await issue.save();
    res.redirect(`/projects/${req.params.projectId}`);
});

module.exports = router;
