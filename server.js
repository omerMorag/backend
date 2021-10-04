const express = require('express')
const cors = require('cors')
const app = express()

const gigRoutes = require('./api/gigs/gig.routes')

app.use('/', gigRoutes)
app.use(cors())
app.use(express.json())
const port = 3000
app.listen(port, () => console.log('Server listening on port 3000!'))