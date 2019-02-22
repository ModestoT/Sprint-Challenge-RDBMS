const express = require('express');

const Actions = require('./actionsModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.getActions(req.query);
        res.status(200).json(actions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The Actions information could not be retrieved' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.getActionById(req.params.id)

        if(action) {
            res.status(200).json(action);
        } else {
            res.status(400).json({ error: 'The Action by that ID does not exist' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The Action information could not be retrieved' });
    }
});

router.post('/', async (req, res) => {
    
    if(req.body.length > 0){
        const actions = req.body;
        for(let i = 0; i < actions.length; i ++){
            if(!req.body[i].notes || !req.body[i].description || !req.body[i].projectID){
                res.status(400).json({ error: 'Please ensure that the actions hav a description, notes and a project id that they are associated with' })
            }
        }

        try {
            const newActions = await Actions.addAction(req.body);
            res.status(200).json(actions);
        } catch (error) {
            console.log(error);
            if(error.errno === 19){
                res.status(404).json({ error: 'The project by that ID does not exist' });
            } else {
                res.status(500).json({ error: 'The Actions could not be added to the Database' });
            }
        }
        
    } else {
        if(!req.body.description || !req.body.notes || !req.body.projectID){
            res.status(400).json({ error: 'Please ensure that the action has a description, notes and a project id that it is associated with' });
        } else {
             try {
                 const actions = await Actions.addAction(req.body);
                 
                 res.status(200).json(actions);
             } catch (error) {
                 console.log(error);
                 if(error.errno === 19){
                    res.status(404).json({ error: 'The project by that ID does not exist' });
                 } else {
                    res.status(500).json({ error: 'The Action could not be added to the Database' });
                 }
             }
        }
    }
});

router.put('/:id', async (req, res) => {
    if(!req.body.notes || !req.body.description){
        res.status(400).json({ error: 'The Action requires notes and a description' });
    } else {
        try {
            const updated = await Actions.updateAction(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'The Project could not be updated' });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Actions.deleteAction(req.params.id);

        if(deleted) {
            res.status(200).json({ message: 'Action was succesfully deleted'});
        } else {
            res.status(400).json({ error: 'The action with that id does not exist'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The action could not be deleted '});
    }
});

module.exports = router;