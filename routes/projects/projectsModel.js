const db = require('../../db/dbconfig.js');

module.exports = {
    getProjects,
    addProject,
    getProjectById
}

function getProjects() {
    return db('projects');
}

function addProject(project) {
    return db('projects')
        .insert(project);
}

function getProjectById(id) {
    const query = db('projects').where({ id }).first();
    const promises = [query, getProjectActions(id)];
    
    return Promise.all(promises).then( function(results){
        let project = results[0];
        let actions = results[1];

        if(project) {
            project.actions = actions;
        } else {
            return null;
        }
        const result = {...project};

        if(project.actions){
            result.actions = project.actions.map(action => ({ ...action}));
        }

        return result;
    })
}

function getProjectActions(id) {
    return db('actions')
        .where('projectID', id)
        .then( actions => 
            actions.map( 
                action => {
                     return {
                          ...action 
                        }}));
}