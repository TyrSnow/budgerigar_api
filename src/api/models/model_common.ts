import * as helper from '../tools/helper'

export default () => {
    before((done) => {
        helper.connect(done);
    });
    
    after((done) => {
        helper.close(done);
    });
    
    beforeEach((done) => {
        helper.initDB(done);
    })
}
