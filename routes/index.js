const express = require('express')

const controller = require('../controller/clubHouseController')

const router = express.Router()

router.get('/',controller.messageList)

router.get('/login',controller.login_get)

router.post('/login',controller.login_post)

router.get('/sign_up',controller.sign_up_get)

router.post('/sign_up',controller.sign_up_post)

module.exports = router