const schema = require("../controllers/schema/section");
const mongoose = require('mongoose');
const Section = require("../models/section");
const Template = require('../models/template');
const setupSwagger = require('../config/swagger');

module.exports = async function(fastify, options) {
    await setupSwagger(fastify);
    
    fastify.post("/new", {
        schema: {
            description: "Add a section by ID",
            tags: ["Section"],
            body: schema.postBodySchema, 
                     
            response: {
                200: schema.sectionSchema
            }
        },
        handler: async function addSectionHandler(request, reply) {
            try {
                const section = new Section(request.body);
                const result = await section.save();
                const final = await result.populate('template');
                reply.code(200);
                return final;
            } catch (error) {
                this.log.error(error);
                reply.code(500);
                return { error: "Internal Server Error" };
            }
        }
    });

    fastify.put("/", {
        schema: {
            description: "Update a section by ID",
            tags: ["Section"],
            params: schema.paramsSchema,
            body: schema.updateBodySchema,
            response: {
                200: schema.sectionSchema
            }
        },
        handler: async function updateSectionHandler(req, reply) {
            try {
                const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('template');
                reply.code(200);
                return section;
            } catch (err) {
                reply.status(500);
                return { error: "Internal Server Error" };
            }
        }
    });
};
