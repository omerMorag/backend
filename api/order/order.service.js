const dbService = require('../../services/db.service')
cconst logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        // const criteria = _buildCriteria(filterBy)         const criteria = {}
        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()

        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        const gig =  await collection.findOne({ '_id': ObjectId(gigId) })
        return gig
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ '_id': ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove car ${gigId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        // peek only updatable fields!
        const orderToAdd = {
            buyer: order.buyer,
            dueOn: new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,0)+'-'+String(new Date().getDate()).padStart(2,0),
            gigId: order.gigId,
            packName: order.packName,
            price: order.price,
            sellerId: order.sellerId,
            status: "pending",
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd;
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(gig) {
    try {
        var id = ObjectId(gig._id)
        delete gig._id
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ "_id": id }, { $set: { ...gig } })
        return gig
    } catch (err) {
        logger.error(`cannot update car ${gigId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
