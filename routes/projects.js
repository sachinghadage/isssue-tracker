const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Issue = require('../models/issue');

// Route to render the form for creating a new project
router.get('/new', (req, res) => {
    res.render('createProject');
});

// Route to handle the creation of a new project
router.post('/', async (req, res) => {
    const { name, description, author } = req.body;
    try {
        const project = await Project.create({ name, description, author });
        res.redirect(`/projects/${project._id}`); // Redirect to the newly created project detail page
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating project');
    }
});

// Route to get a specific project and its issues
router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).send('Project not found');
        }

        let query = { project: req.params.projectId };

        if (req.query.search) {
            const searchQuery = new RegExp(req.query.search, 'i'); // Case-insensitive search
            query = {
                ...query,
                $or: [
                    { title: searchQuery },
                    { description: searchQuery }
                ]
            };
        }

        const issues = await Issue.find(query);
        res.render('projectDetail', { project, issues, searchQuery: req.query.search }); // Pass searchQuery to the view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
