const schema = require("../controllers/schema/company");
const mongoose = require('mongoose');
const Company = require("../models/company")
const Template=require('../models/template')
const setupSwagger = require('../config/swagger');
module.exports = async function(fastify, options){
    await setupSwagger(fastify);
    fastify.post( "/new",{
      schema: {
        description: "post a company",
        tags: ["company"],
        body: schema.companyBodySchema,
        response: {
          200: schema.companySchema
        }
      },
      handler: async function addCompanyHandler(request, reply){
        try {
          const { name, address, phone, logo, slug, template, createdAt } = request.body
          const templateId = Array.isArray(template)
          ? template.map(id => new mongoose.Types.ObjectId(id))
          : [new mongoose.Types.ObjectId(template)];
          console.log(templateId)
          const company = new Company({name, address, phone, logo, slug, template: templateId})
          const result = await company.save();
          const final = await result.populate('template')
          reply.code(200);
          return (final)
        } catch (error) {
          this.log.error(error)
          reply.code(500)
          return { error: "Internal Server Error" }
        }
      }
    }
    )
    fastify.get( "/",{
      schema: {
        description: "Get all companies",
        tags: ["company"],
        querystring:{
          type: "object",
          properties: {
            page:{type: "integer"},
            pageSize:{type: "integer"}
          }
        },
        response: {
          200: {
            type : "object",
            properties: {
              page: {type: "integer"},
              limit: {type: "integer"},
              count: {type: "integer"},
              items: {
                type: "array",
                schema: schema.companySchema
              }
            }
          }
        }
      },
      handler: async function listCompanyHandler(request, reply){
        try {
          const page= request.query.page ;
          const limit=request.query.pageSize;
          const skip=(page - 1) * limit
          const count = await Company.countDocuments()
          const pages= Math.ceil(count/ limit)
          if (page > pages) {
            reply.code(404)
            return { error: "No page found" }
          }
          const company = await Company.find().populate('template').skip(skip).limit(limit)
          reply.code(200)
          return ({
            page,
            limit,
            count,
            items: company
          });
        } catch (error) {
          this.log.error(error)
          reply.code(500)
          return { error: "Internal Server Error" }
        }
      }
    }

    )
    fastify.get( "/:id",{
      schema: {
        description: "Get single company",
        tags: ["company"],
        params:schema.paramsSchema,
        response: {
          200: schema.companySchema,
        }
      },
      handler: async function getCompanyHandler(request, reply){
        try {
          const {id} = request.params
          const company = await Company.findOne({_id: id}).populate('template')
          if (!company){
            reply.code(404);
            return {error : "Company not found"}
          }
          reply.code(200);
          return company
        } catch (error) {
          this.log.error(error)
          reply.code(500)
          return { error: "Internal Server Error" }
        }
      }
    }

    )
    fastify.put( "/:id",{
      schema: {
        description: "Update single company",
        tags: ["company"],
        body: schema.updateBodySchema,
        response: {
          200: schema.companySchema,
        }
      },
      handler: async function updateCompanyHandler(request, reply){
        try {
          const company = await Company.findByIdAndUpdate( request.params.id, request.body,{new: true} ).populate('template')
          if(!company){
            reply.code(404)
            return {error: "Company not found"}
          }
          reply.code(200);
          return company
        } catch (error) {
          if(error.code === 11000){
            reply.code(409);
            return{ error: "A company with this data already exists"}
          }
          reply.code(500)
          return { error: "Internal Server Error"}
        }
      }
    }

    )
    fastify.delete( "/:id",{
      schema: {
        description: "Delete single company",
        tags: ["company"],
        params: schema.paramsSchema,
      },
      handler: async function deleteCompanyHandler(request, reply){
        try {
          await Company.findByIdAndDelete(request.params.id)
          reply.code(204);
          return {message: "Successfully deleted"}
        } catch (error) {
          this.log.error(error)
          reply.code(500)
          return { error: "Cannot delete data" }
        }
      }
    }
  )


}