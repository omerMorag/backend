const gigService = require('./gig.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getGigs(req, res) {
  try {
    const gigs = await gigService.query()
    res.json(gigs);
  } catch (err) {
    logger.error('Failed to get gigs', err)
    res.status(500).send({ err: 'Failed to get gigs' })
  }
}

// GET BY ID 
async function getGigById(req, res) {
  try {
    const gigId = req.params.id;
    const gig = await gigService.getById(gigId);
    res.json(gig)
  } catch (err) {
    logger.error('Failed to get gig', err)
    res.status(500).send({ err: 'Failed to get gig' })
  }
}

// POST (add car)
async function addGig(req, res) {
  try {
    const gig = req.body;
    const addedGig = await gigService.add(gig)
    res.json(addedGig)
  } catch (err) {
    logger.error('Failed to add gig', err)
    res.status(500).send({ err: 'Failed to add gig' })
  }
}

// PUT (Update car)
async function updateGig(req, res) {
  try {
    const gig = req.body;
    const updatedGig = await gigService.update(gig)
    res.json(updatedGig)
  } catch (err) {
    logger.error('Failed to update gig', err)
    res.status(500).send({ err: 'Failed to update gig' })

  }
}

// DELETE (Remove car)
async function removeGig(req, res) {
  try {
    const gigId = req.params.id;
    const removedId = await gigService.remove(gigId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove gig', err)
    res.status(500).send({ err: 'Failed to remove gig' })
  }
}

module.exports = {
  getGigs,
  getGigById,
  addGig,
  updateGig,
  removeGig
}
