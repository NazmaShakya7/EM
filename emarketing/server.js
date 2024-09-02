const fastify = require('fastify')({ logger: true });
require("dotenv").config();
const setupMongoDB = require('./config/mongodb');
const setupMiddleware = require('./middleware/middleware');
const companyRoutes = require("./routes/companyRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const templateRoutes = require("./routes/templateRoutes");
const pageRoutes = require("./routes/pageRoutes");

const renderRoutes = require('./routes/renderRoutes');
fastify.register(import('@fastify/swagger'));
fastify.register(import('@fastify/swagger-ui'), {
  routePrefix: '/documentation'
});

//register routes
fastify.register(renderRoutes);
fastify.register(pageRoutes, {prefix: '/template/page'});
fastify.register(companyRoutes, {prefix: '/company'});
fastify.register(sectionRoutes, {prefix: '/template/:id/section'});
fastify.register(templateRoutes, {prefix: '/template'});




const start = async () => {
  try {
    await setupMongoDB();
    setupMiddleware(fastify);
    fastify.listen({ port: 4000 }, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      console.log(`Server listening on ${address}`);
      console.log('Swagger docs available at http://localhost:4000/documentation');
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};



start();
