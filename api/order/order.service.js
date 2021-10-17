const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

async function query() {
  try {
    const criteria = {};
    const collection = await dbService.getCollection("order");
    var orders = await collection.find(criteria).toArray();

    return orders.reverse();
  } catch (err) {
    logger.error("cannot find orders", err);
    throw err;
  }
}

async function getById(orderId) {
  console.log("order", orderId);
  try {
    const collection = await dbService.getCollection("order");
    const order = await collection.findOne({ _id: ObjectId(orderId) });
    return order;
  } catch (err) {
    logger.error(`while finding gig ${orderId}`, err);
    throw err;
  }
}

async function remove(gigId) {
  try {
    const collection = await dbService.getCollection("order");
    await collection.deleteOne({ _id: ObjectId(gigId) });
    return gigId;
  } catch (err) {
    logger.error(`cannot remove car ${gigId}`, err);
    throw err;
  }
}

async function add(order) {
  try {
    const orderToAdd = {
      gigName: order.gigName,
      buyer: order.buyer,
      buyerId: order.buyerId,
      dueOn:
        String(new Date().getDate()).padStart(2, 0) +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, 0) +
        "-" +
        new Date().getFullYear(),
      gigId: order.gigId,
      packName: order.packName,
      price: order.price,
      sellerId: order.sellerId,
      status: "pending",
    };
    const collection = await dbService.getCollection("order");
    await collection.insertOne(orderToAdd);
    return orderToAdd;
  } catch (err) {
    logger.error("cannot insert order", err);
    throw err;
  }
}

async function update(order) {
  try {
    let id = ObjectId(order._id);
    delete order._id;
    let collection = await dbService.getCollection("order");
    await collection.updateOne({ _id: id }, { $set: { ...order } });
    return order;
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err);
    throw err;
  }
}
module.exports = {
  remove,
  query,
  getById,
  add,
  update,
};
