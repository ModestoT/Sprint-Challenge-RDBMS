const db = require('../../db/dbconfig.js');

module.exports = {
    getProjects,
    addProject
}

function getProjects() {
    return db('actions');
}

function addProject(action) {
    return db('actions')
        .insert(action);
}