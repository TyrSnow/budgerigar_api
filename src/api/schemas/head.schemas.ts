/**
 * DocCtrl对应的schemas
 */
const DocSchemas = {
  create: {
    body: {
        type: 'object',
        properties: {
            urls: {
                'type': 'array',
                'minItems': 1,
                'items': {
                    'type': 'string'
                },
                'required': true
            }
        }
    }
  },
}
export default DocSchemas