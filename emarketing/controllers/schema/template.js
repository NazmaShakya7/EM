const templateBodySchema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'binary' },
        category: { type: 'string' }, // If file category is needed during upload
        template_name: { type: 'string' },
        Sections: {
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
        },
    },
    // required: ['file'] // Make sure 'file' is required
};

const templateSchema = {
    id: { type: 'string', format: 'binary' },
    category: { type: 'string' }, // If file category is needed during upload
    template_name: { type: 'string' },
    Sections: {
        type: 'object',
        properties: {
            
        image:{type: 'string'},
            heading: { type: 'string' },
                subHeading: { type: 'string' },
                    description: { type: 'string' },
                primaryButtonText: { type: 'string' },
            secondaryButtonText: { type: 'string' },
        order:{type: 'string'},
            
        },}

    // required: ['category', 'template_name'] // Ensure these fields are required in the schema
};

const paramsSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    // required: ['id'] // Ensure 'id' is required
};

module.exports = {
    templateBodySchema,
    templateSchema,
    paramsSchema,
    updateBodySchema
};
