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
      }
    }
  }
};

export default schemas;
