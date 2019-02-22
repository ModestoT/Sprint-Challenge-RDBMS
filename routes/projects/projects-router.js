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
    if(!req.body.name || !req.body.description){
        res.status(400).json({ error: 'The Project requires a name and a description' });
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

router.put('/:id', async (req, res) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({ error: 'The Project requires a name and a description' });
    } else {
        try {
            const updated = await Projects.updateProject(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'The Project could not be updated' });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Projects.deleteProject(req.params.id);

        if(deleted) {
            res.status(200).json({ message: 'Project was succesfully deleted'});
        } else {
            res.status(400).json({ error: 'The project with that id does not exist'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The project could not be deleted '});
    }
 })
module.exports = router;