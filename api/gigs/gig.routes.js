const express = require('express')
const {getAllGigs,getGig} = require('./gig.controller')

const router = express.Router()

router.get('/explore', getAllGigs)

router.get('/gig/:gigId', getGig)

module.exports = routern