/**
 * ProjectCtrl对应的schemas
 */
const DocSchemas = {
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
  queryDocs: {
    query: {
      type: 'object',
      properties: {
        i: { type: 'string'},
        s: { type: 'string'},
      }
    }
  }
}
export default DocSchemas