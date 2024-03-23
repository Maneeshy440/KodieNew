const express =require('express');
const router =express.Router();
const search_for_controller = require('../controller/search_for_contractor_controller');


router.post('/get_property_details_my_acc_id',search_for_controller.getproperty_details_by_account_id);
router.post('/search_for_contractor',search_for_controller.search_for_contractor);


module.exports =router; 