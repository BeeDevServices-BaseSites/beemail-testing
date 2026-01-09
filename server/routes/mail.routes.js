const express = require('express')
const {sendBasicContactMail} = require('../controllers/basicMail.controller')
const router = express.Router()


router.post('/sendBasicContactMail', sendBasicContactMail)


module.exports = router