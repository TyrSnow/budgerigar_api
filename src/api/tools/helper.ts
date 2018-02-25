import * as mongoose from 'mongoose'

export let URL = 'mongodb://localhost/unitTest'

export function connect(callback) {
    mongoose.connect(URL, callback);
}

export function close(callback) {
    mongoose.connection.close(callback);
}

export function getConnection() {
    return mongoose.connection;
}

export function initDB(callback) {
    let connection = mongoose.connection;
    connection.db.dropDatabase(function(err) {
        if (err) {
            throw err;
            // return callback(err);
        }
        callback();
        console.log('Database droped.');
    })
}