const templateBodySchema = {
    type: 'object',
    properties: {
        template_name: { type: 'string' },
        category: {type: 'string'},
        page: {type: 'string'},
        company: { type: 'string' },
        },
        required: ['template_name', 'category', 'page', 'company'],
      };




const templateSchema = {
    _id: { type: 'string' },
    category: { type: 'string' },
    template_name: { type: 'string' },
    page: {
      type: 'object',
      properties: {
        id: { type: 'string' }, 
        pagetype: { type: 'string' },
        section: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              type: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  image: { type: 'string' },
                  heading: { type: 'string' },
                  subHeading: { type: 'string' },
                  description: { type: 'string' },
                  primaryButtonText: { type: 'string' },
                  secondaryButtonText: { type: 'string' },
                },
              },
              order: { type: 'integer' },
            },
          },
        },
      },
    },
    company: { type: 'string' },
  };
  
  const paramsSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  };
  
  module.exports = {
    templateBodySchema,
    templateSchema,
    paramsSchema,
  };