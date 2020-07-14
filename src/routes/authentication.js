const { Router } = require('express')
const passport = require('passport')
const router = Router()

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/profile', (req, res) => {
  
})

module.exports = router