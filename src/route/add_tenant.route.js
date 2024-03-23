// route.js
const express = require('express');
const ContactController = require('../controller/add_tenant.controller');

const router = express.Router();

router.post('/tenant', ContactController.createContact);

router.post('/companycontact', ContactController.companycontact);

module.exports = router;
