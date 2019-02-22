const express = require('express'); 
const helmet = require('helmet');
const server = express();

const projectsRouter = require('./routes/projects/projects-router.js');
const actionsRouter = require('./routes/actions/actions-router.js');

server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;