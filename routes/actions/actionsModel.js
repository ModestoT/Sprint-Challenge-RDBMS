const db = require('../../db/dbconfig.js');

module.exports = {

};

function getProjects() {
    return db('projects');
}

function addProject(project) {
    return db('projects')
        .insert(project);
}