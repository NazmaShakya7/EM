const schema = require("../controllers/schema/section");
const Section = require("../models/section");
const setupSwagger = require('../config/swagger');
const Template = require("../models/template");
const mongoose = require('mongoose');
const Page = require("../models/page");

module.exports = async function(fastify, options) {
    await setupSwagger(fastify);
    fastify.get("/:sectionId", {
        schema: {
            description: "Get a section by ID",
            tags: ["Section"],
            params: schema.paramsSchema,                     
            response: {
                200: schema.sectionSchema
            }
        },
        handler: async function getSectionHandler(request, reply) {
            try {
                const { id, sectionId } = request.params
                console.log(id, "id=====21");
                const templateID = new mongoose.Types.ObjectId(id);
                const sectionID = new mongoose.Types.ObjectId(sectionId);
        
                const template= await Template.findById({_id: templateID})
                console.log(template, "template=====24");
                const section = template.section.find(section=>section._id.toString() === sectionID.toString())
                reply.code(200);
                return section;
            } catch (error) {
                this.log.error(error);
                reply.code(500);
                return { error: "Internal Server Error" };
            }
        }
    });
    fastify.post("/new", {
        schema: {
            description: "Add a section by ID",
            tags: ["Section"],
            params: {
                id: {  type: "string"   }
            },
            
            body: schema.postBodySchema,                     
            response: {
                200: schema.sectionSchema
            }
        },
        handler: async function addSectionHandler(request, reply) {
            try {
                const { id }= request.params
                const { type, data} = request.body;
                const template = await Template.findById(id);
                console.log(template, "==========54")
                const pageDetails = await Page.findById(template.page).populate('section');
                console.log(pageDetails,"=======57")
                const newOrder = 0;
                const sectionData = {
                    type: type,
                    data: data || {}, 
                    order: newOrder 
                };
                //create new section instance
                const section = await Section.create(sectionData)
                //insert new section in the template 
                await Template.findByIdAndUpdate({_id: id},
                {$push : {section: section._id} }
                )
                console.log(section, "-----section----")
                reply.code(200);
                return section;
            } catch (error) {
                this.log.error(error);
                reply.code(500);
                return { error: "Internal Server Error" };
            }
        }
    });
    
    

    fastify.put("/:sectionId", {
        schema: {
            description: "Update a section by ID",
            tags: ["Section"],
            params: schema.paramsSchema,
            body: schema.postBodySchema,
            response: {
                200: schema.sectionSchema
            }
        },
        handler: async function updateSectionHandler(req, reply) {
            try {
                const { id, sectionId }= req.params
                const template = await Template.findOne({_id: id})
                const section=  template.section.find(section => section._id.equals(sectionId))
                // Update the section
                const sectionUpdate = await Section.findOneAndUpdate(
                {_id: section._id},
                { "$set": req.body },
                {new: true}
                );
                return sectionUpdate
              } catch (error) {
                reply.code(500)
                return { error: "Internal Server Error"}
              }
        }
    });
    // fastify.delete( "/:sectionId",{
    //     schema: {
    //       description: "Delete single section",
    //       tags: ["Section"],
    //       params: schema.paramsSchema,
    //     },
    //     handler: async function deleteSectionHandler(request, reply){
    //       try {
    //         await Section.findByIdAndDelete(request.params.id)
    //         reply.code(204);
    //         return {message: "Successfully deleted"}
    //       } catch (error) {
    //         this.log.error(error)
    //         reply.code(500)
    //         return { error: "Cannot delete data" }
    //       }
    //     }
    //   })
};
