const companyBodySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        address: { type: "string" },
        phone: { type: "string" },
        logo: { type: "string" },
        slug: { type: "string" },
        template: {  type: "string"},
        createdAt: { type: "string", format: "date-time" }
    },
    required: ['name','address','phone','logo','slug']
}
const updateBodySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        address: { type: "string" },
        phone: { type: "string" },
        logo: { type: "string" },
        slug: { type: "string" },
        template: {  type: "string"},
        createdAt: { type: "string", format: "date-time" }
    }
}
const companySchema = {
    type: "object",
    properties: {
        _id: {type: "string"},
        name: { type: "string" },
        address: { type: "string" },
        phone: { type: "string" },
        logo: { type: "string" },
        slug: { type: "string" },
        template: {
            type: "object",
            properties: {
                _id: { type: "string" },
                category: { type: "string" },
                template_name: {type: "string"}
            }
        },
        createdAt: { type: "string", format: "date-time" }
    }
}
const paramsSchema= {
    id : {
        type: "string"
    }
}
module.exports= {
    companyBodySchema,
    companySchema,
    paramsSchema,
    updateBodySchema
}