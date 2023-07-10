import {MongoClient} from 'mongodb';
const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

export function connectToMongo(callback){
    client.connect().then( (client) => {
        return callback();
    }).catch( err => {
        callback(err);
    })
}

export function getDb(dbName = process.env.DB_NAME){
    return client.db(dbName);
}


// These are just used for closing the connection properly
function singleHandler(){
    console.log("Closing MongoDB connection..");
    client.close();
    process.exit();
}

process.on('SIGINT', singleHandler);
process.on('SIGTERM', singleHandler);
process.on('SIGQUIT', singleHandler);
