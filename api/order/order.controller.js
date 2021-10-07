const orederService = require('./order.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getOrders(req, res) {
  try {
    var queryParams = req.query;
    console.log(queryParams);
    const gigs = await orederService.query(queryParams)
    res.json(gigs);
  } catch (err) {
    logger.error('Failed to get orders', err)
    res.status(500).send({ err: 'Failed to get orders' })
  }
}

// GET BY ID 
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orederService.getById(orderId)
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}

// POST (add car)
async function addOrder(req, res) {
  try {
    const order = req.body;
    const addedOrder = await orederService.add(order)
    res.json(addedOrder)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}

// DELETE (Remove car)
async function removeOrder(req, res) {
  try {
    const orderId = req.params.id;
    const removedId = await orederService.remove(orderId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove order', err)
    res.status(500).send({ err: 'Failed to remove order' })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
 removeOrder
}
