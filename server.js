const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const port = 8989

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')).toString())

// cors origin
const whitelist = ['http://localhost:3000', 'http://localhost:9000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.get('/', (req, res) => res.send(db))

app.get('/latest-order/:userId', (req, res, next) => {
    const userId = req.params.userId
    const latestOrderId = db.latestOrders[userId]
    const order = db.orders[latestOrderId]
    res.send(JSON.stringify(order))
})

app.listen(port, () => console.log(`App listening on port ${port}`))