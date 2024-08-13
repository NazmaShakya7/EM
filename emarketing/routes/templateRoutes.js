const schema = require("../controllers/schema/section");
const mongoose = require('mongoose');
const Section = require("../models/section");
const Template = require('../models/template');
const setupSwagger = require('../config/swagger');

module.exports = async function(fastify, options) {
    await setupSwagger(fastify);
    
    fastify.post("/new", {
        schema: {
            description: "Add a template by ID",
            tags: ["Template"],
            body: schema.postBodySchema, 
                     
            response: {
                200: schema.templateSchema
            }
        },
        handler: async function addtemplateHandler(request, reply) {
            try {
                const template = new Template(request.body);
                const result = await template.save();
                const final = await result.populate('section');
                reply.code(200);
                return final;
            } catch (error) {
                this.log.error(error);
                reply.code(500);
                return { error: "Internal Server Error" };
            }
        }
    });

};