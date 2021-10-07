const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addOrder, getOrders, deleteOrder,getOrderById,removeOrder} = require('./Order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', addOrder)
//router.put('/:id', updateOrder)
router.delete('/:id', removeOrder)

module.exports = router