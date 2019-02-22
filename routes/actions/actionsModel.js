const db = require('../../db/dbconfig.js');

module.exports = {
    getActions,
    addAction
};

function getActions() {
    return db('actions');
}

function addAction(actions) {
    return db('actions')
        .insert(actions);
}