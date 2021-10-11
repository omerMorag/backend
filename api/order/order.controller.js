const orderService = require('./order.service.js');
const logger = require('../../services/logger.service');
const socketService = require('../../services/socket.service');

// GET LIST
async function getOrders(req, res) {
  try {
    var queryParams = req.query;
    const orders = await orderService.query(queryParams)
    res.json(orders);
  } catch (err) {
    logger.error('Failed to get orders', err)
    res.status(500).send({ err: 'Failed to get orders' })
  }
}

// GET BY ID 
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderService.getById(orderId)
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}

// POST 
async function addOrder(req, res) {
  try {
    const order = req.body;
    const addedOrder = await orderService.add(order)
    socketService.newOrderAdded(addedOrder)
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
    const removedId = await orderService.remove(orderId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove order', err)
    res.status(500).send({ err: 'Failed to remove order' })
  }
}

async function updateOrder(req, res) {
  try {
      const order = req.body
      const savedOrder = await orderService.update(order)
      res.send(savedOrder)
  } catch (err) {
      logger.error('Failed to update user', err)
      res.status(500).send({ err: 'Failed to update user' })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
 removeOrder,
 updateOrder
}
