const {Router} = require('express')
const db = require('../database')
const { isLoggedIn } = require('../lib/auth')
const router = Router()

router.get('/add', isLoggedIn, (req, res) => {
  res.render('links/add')
})

router.get('/', isLoggedIn, async (req, res) => {
  const links = await db.query('SELECT * FROM links')
  res.render('links/list', { links })
})

router.post('/add', isLoggedIn, async (req, res) => {
  const { title, url, description } = req.body
  const newLink = {
    title, url, description
  }
  await db.query('INSERT INTO links set ?', [newLink])
  req.flash('success', 'Link saved successfully')
  res.redirect('/links')
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params
  await db.query('DELETE FROM links WHERE id = ?', [id])
  req.flash('success', 'Links removed successfully')
  res.redirect('/links')
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params
  const link = await db.query('SELECT * FROM links WHERE id = ?', [id])
  res.render('links/edit', { link: link[0] })
})

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params
  const { title, url, description } = req.body
  const newLink = {
    title, url, description
  }
  await db.query('UPDATE links SET ? WHERE id = ?', [newLink, id])
  req.flash('success', 'Links updated successfully')
  res.redirect('/links')
})

module.exports = router