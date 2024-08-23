const mongoose = require('mongoose');
const schema = require("../controllers/schema/template");
const Section = require("../models/section");
const Template = require('../models/template');
const setupSwagger = require('../config/swagger');

module.exports = async function(fastify, options) {
    await setupSwagger(fastify);
    
    fastify.post("/new", {
        schema: {
            description: "Add a template",
            tags: ["Template"],
            body: schema.templateBodySchema, 
            response: {
                200: schema.templateSchema
            }
        },
        handler: async function addtemplateHandler(request, reply) {
            try {
                const { template_name, category, page } = request.body;

                const sectionId = Array.isArray(page.section)
                    ? page.section.map(id => new mongoose.Types.ObjectId(id))
                    : [new mongoose.Types.ObjectId(page.section)];

                const template = new Template({
                    template_name, 
                    category, 
                    page: { section: sectionId }
                });

                const result = await template.save();
                const populatedResult = await result.populate('page.section');
                
                console.log("Final result:", populatedResult);
                
                reply.code(200);
                return populatedResult;
            } catch (error) {
                fastify.log.error(error);
                reply.code(500);
                return { error: "Internal Server Error" };
            }
        }
    });

    fastify.get("/:id", {
        schema: {
            description: "Get a template by ID",
            tags: ["Template"],
            querystring: schema.querySchema,
            response: {
                200: schema.templateSchema
            }
        },
        handler: async function getTemplateHandler(request, reply) {
            try {
                const { id } = request.params;
                const result = await Template.findById(id).populate('page.section');

                if (!result) {
                    reply.code(404);
                    return { error: "Template not found" };
                }

                reply.code(200);
                return result;
            } catch (error) {
                fastify.log.error(error);
                reply.code(500);
                return { error: "Internal Server Error" };
            }
        }
    });

    // Uncomment and use if you need a route to get sections by template ID
    // fastify.get("/:id/sections", {
    //     schema: {
    //         description: "Get sections by template ID",
    //         tags: ["Section"],
    //         params: schema.paramsSchema,
    //         response: {
    //             200: schemaSection.sectionSchema
    //         }
    //     },
    //     handler: async function getSectionsByTemplateIdHandler(request, reply) {
    //         try {
    //             const { id } = request.params;
    //             const result = await Template.findById(id).populate('page.sections');

    //             if (!result) {
    //                 reply.code(404);
    //                 return { error: "Template not found" };
    //             }

    //             reply.code(200);
    //             return result.page.sections;
    //         } catch (error) {
    //             fastify.log.error(error);
    //             reply.code(500);
    //             return { error: "Internal Server Error" };
    //         }
    //     }
    // });

};
