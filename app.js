const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/issueTracker');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const indexRoutes = require('./routes/index');
const projectRoutes = require('./routes/projects');
const issueRoutes = require('./routes/issues');

app.use('/', indexRoutes);
app.use('/projects', projectRoutes);
app.use('/projects/:projectId/issues', issueRoutes);

app.listen(3000, function() {
    console.log('Server started on port 3000');
});
