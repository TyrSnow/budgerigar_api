/**
 * DocCtrl对应的schemas
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
    }
}
export default DocSchemas