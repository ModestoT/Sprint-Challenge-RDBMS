const db = require('../../db/dbconfig.js');

module.exports = {
    getActions,
    addAction,
    updateAction,
    deleteAction
};

function getActions() {
    return db('actions');
}

function getActionById(id) {
    return db('actions')
        .where({ id })
        .first();
}

function addAction(actions) {
    return db('actions')
        .insert(actions);
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