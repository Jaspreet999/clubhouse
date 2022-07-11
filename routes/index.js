const express = require('express')
const router = express.Router()

const controller = require('../controller/clubHouseController')
const messageController = require('../controller/messageController')


router.get('/',messageController.messageList)

router.get('/login',controller.login_get)

router.post('/login',controller.login_post)

router.get('/sign_up',controller.sign_up_get)

router.post('/sign_up',controller.sign_up_post)

router.get('/admin',controller.admin_get)

router.post('/admin',controller.admin_post)

router.get('/membership',controller.membership_get)

router.post('/membership',controller.membership_post)

router.get('/createmessage',messageController.createmessage_get)

router.post('/createmessage',messageController.createmessage_post)

router.get("/delete/:id",messageController.message_delete_get)

router.get("/update/:id",messageController.message_update_get)
router.post("/update/:id",messageController.message_update_post)
module.exports = router