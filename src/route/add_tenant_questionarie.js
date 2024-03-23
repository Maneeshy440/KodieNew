const express = require('express');
const add_tenant_questionarie = require('../controller/add_tenant_questionarie');

const router = express.Router();

router.post('/create', add_tenant_questionarie.add_tenant_questionarie);

router.get("/getAll/:uad_key", add_tenant_questionarie.findAll);

// router.post('/companycontact', ContactController.companycontact);

module.exports = router;
