const mongoose = require('mongoose');
const schema = require("../controllers/schema/page");
const Page = require('../models/page');
const setupSwagger = require('../config/swagger');

module.exports = async function(fastify, options) {
  await setupSwagger(fastify);

  fastify.post("/new", {
    schema: {
      description: "Add a Page",
      tags: ["Page"],
      body: schema.pageBodySchema,
      response: {
        200: schema.pageSchema,
      },
    },
    handler: async function addPageHandler(request, reply) {
      try {
        const newPage = new Page(request.body);
        const savedPage = await newPage.save();
        console.log(savedPage);
        const final = await savedPage.populate('section');
        console.log(final,'========24');
        reply.code(200);
        return {
            data:'Hello'
        };
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: "Internal Server Error" });
      }
    }
  });
};
