import * as mongoose from 'mongoose'
import * as log4js from 'log4js'

import config from '../config'

mongoose.connect(config.db.uri);

(<any>mongoose).Promise = global.Promise;

let db = mongoose.connection;

let logger = log4js.getLogger('default')

db.on('error', (err) => {
    logger.fatal('[DB]Initialize error: ', err);
})
