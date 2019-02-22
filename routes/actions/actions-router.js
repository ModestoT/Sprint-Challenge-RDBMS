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

module.exports = router;