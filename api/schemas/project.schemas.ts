/**
 * ProjectCtrl对应的schemas
 */
const projectSchemas = {
  create: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          required: true
        }
      }
    }
  },
  getOneDoc: {
  },
  query: {
    query: {
      type: 'object',
      properties: {
        current: { type: 'string'},
        size: { type: 'string'},
      }
    }
  }
};

export default projectSchemas;
