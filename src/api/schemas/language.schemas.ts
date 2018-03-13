const schemas = {
  create: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          required: true,
        },
        code: {
          type: 'string',
          required: true,
        },
        desc: {
          type: 'string',
        },
        flag: {
          type: 'string',
        },
      }
    }
  },
  query_names: {
    query: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          required: true,
        },
      },
    },
  },
  update: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
        desc: {
          type: 'string',
        },
        flag: {
          type: 'string',
        },
      }
    }
  },
};

export default schemas;
