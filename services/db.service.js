const MongoClient = require('mongodb').MongoClient
//const uri='mongodb+srv:omer_morag:omer2003@cluster0.tyezt.mongodb.net/cinco?retryWrites=true&w=majority'
const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'cincodb'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL , { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




