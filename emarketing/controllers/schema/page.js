const mongoose = require('mongoose');

const pageBodySchema = { 
  type: 'object',
  properties: {
    pagetype: { type: 'string' },
    section: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};

const pageSchema = { 
  type: 'object',
  properties: { 
    _id: {type: 'string'},
    pagetype: {type: 'string'},
    section: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};

const paramsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
});

module.exports = {
  pageBodySchema,
  pageSchema,
  paramsSchema,
};
