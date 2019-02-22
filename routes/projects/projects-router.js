const express = require('express');

const Projects = require('./projectsModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.getProjects(req.query);
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The Projects information could not be retrieved' });
    }
});

module.exports = router;