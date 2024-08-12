
const mongoose = require('mongoose');
const postBodySchema = {
    type: 'object',
    properties: {
        
    image:{type: 'string'},
    heading: { type: 'string' },
    subHeading: { type: 'string' },
    description: { type: 'string' },
    primaryButtonText: { type: 'string' },
    secondaryButtonText: { type: 'string' },
    order:{type: 'string'},
    },
    
    //required: ['heading', 'subHeading', 'description', 'primaryButtonText', 'secondaryButtonText'],
};
const updateBodySchema = {
    
        
          type: "object",
          properties: {
            image:{type: 'string'},
                heading: { type: 'string' },
                    subHeading: { type: 'string' },
                        description: { type: 'string' },
                            primaryButtonText: { type: 'string' },
                        secondaryButtonText: { type: 'string' },
                    order:{type: 'string'},
            
          },
        };
   

const sectionSchema = {
    type: "object",
    properties: {
        image:{type: 'string'},
            heading: { type: 'string' },
                subHeading: { type: 'string' },
            description: { type: 'string' },
        primaryButtonText: { type: 'string' },
        secondaryButtonText: { type: 'string' },
        order:{type: 'string'},
        template: {
            type: 'string',
            // required: [true],
          }
    
    },
        
};
const paramsSchema= {
    id : {
        type: "string"
    }
}
module.exports= {
    postBodySchema,
    sectionSchema,
    paramsSchema,
    updateBodySchema
}