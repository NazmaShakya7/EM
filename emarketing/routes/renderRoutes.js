const renderTemplate = require('../controllers/renderTemplate.js');

const routes = async (fastify) => {
  fastify.get('/render', renderTemplate);
};

module.exports = routes;
