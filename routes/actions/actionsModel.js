const db = require('../../db/dbconfig.js');

module.exports = {
    getActions,
    addAction,
    updateAction,
    deleteAction,
    getActionById
};

function getActions() {
    return db('actions');
}

function getActionById(id) {
    return db('actions')
        .where({ id })
        .first();
}

function addAction(action) {
    return db('actions')
        .insert(action)
        .then(action => (action.length <= 1 ? getActionById(action[0]) : null ));
}

function updateAction(id, changes) {
    return db('actions')
        .where({ id })
        .update(changes)
        .then(updated => (updated > 0 ? getActionById(id) : null ));
}

function deleteAction(id) {
    return db('actions')
        .where({ id })
        .del()
}