const schemas = {
  create: {
    body: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          required: true,
        },
        translates: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              lang: {
                type: 'string',
              },
              text: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

export default schemas;
