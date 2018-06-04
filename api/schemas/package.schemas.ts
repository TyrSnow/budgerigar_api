const schemas = {
  create: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          required: true,
        },
        project: {
          type: 'string',
          required: true,
        },
        desc: {
          type: 'string',
        },
        languages: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
  update_info: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        desc: {
          type: 'string',
        },
        languages: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

export default schemas;
