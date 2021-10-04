const gigService = require('./gig.service')

async function getAllGigs(req, res) {
    try {
        const gigs = await gigService.query();
        console.log('gigs',gigs);
        res.send(gigs);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function getGig(req, res) {
    console.log(req.params);
    const { gigId } = req.params
    try {
        const gig = await gigService.getById(gigId);
        res.send(gig);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
    }
}


module.exports = {
    getAllGigs,
    getGig
}