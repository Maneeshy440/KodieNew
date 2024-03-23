const express = require('express');
const PushController = require('../login controller/push_notification');

const router = express.Router();

// router.post('/tenant', ContactController.createContact);

router.post('/sendpush', PushController.sendPushNotification);

module.exports = router;