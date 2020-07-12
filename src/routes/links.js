const { Router } = require('express')
const db = require('../database')
const router = Router()

router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', async (req, res) => {
  res.send('received')
})

module.exports = router