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

router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.getProjectById(req.params.id);

        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ error: 'That Project id does not exist' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The Project information could not be retrieved' });
    }
});

router.post('/', async (req, res) => {
    if(!req.body.name){
        res.status(400).json({ error: 'The Project requires a name' });
    } else {
         try {
             const project = await Projects.addProject(req.body);
             res.status(200).json(project);
         } catch (error) {
             console.log(error);
             res.status(500).json({ error: 'The Projects could not be added to the Database' });
         }
    }
});

module.exports = router;