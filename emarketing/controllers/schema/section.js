const mongoose = require('mongoose');

const postBodySchema = {
    type: 'object',
    properties: {
        type: {type: 'string'},
        data: {
            type: 'object',
            properties: {
                image: { type: 'string' },
                heading: { type: 'string' },
                subHeading: { type: 'string' },
                description: { type: 'string' },
                primaryButtonText: { type: 'string' },
                secondaryButtonText: { type: 'string' },
            }
        },
        order: { type: 'integer' },
    },
};

const sectionSchema = {
    type: 'object',
    properties: {
        _id: {type: 'string'},
        type: {type: 'string'},
        data: {
            type: 'object',
            properties: {
                image: { type: 'string' },
                heading: { type: 'string' },
                subHeading: { type: 'string' },
                description: { type: 'string' },
                primaryButtonText: { type: 'string' },
                secondaryButtonText: { type: 'string' },
            }
        },
        order: { type: 'integer' },
    },
};

const paramsSchema = {
    type: 'object',
    properties: {
        id: {
            type: "string"
        },
        sectionId: {
            type: "string"
        }
    }
}

const querySchema={
    type: "object",
    properties:{
        type: { type: 'string' }
    }
}

module.exports = {
    postBodySchema,
    sectionSchema,
    paramsSchema,
    querySchema
}