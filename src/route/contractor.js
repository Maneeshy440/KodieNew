const express =require('express');
const router =express.Router();
const contractor = require('../controller/contractor');

//add
router.post('/invitecontractor_details',contractor.inviteadd_contractor_details);
//get by account_id
router.post('/invitecontractor_details_account_id',contractor.invite_get_contractor_details);
//get by contractor id
router.post('/invitecontractor_details_contractor_id',contractor.invite_get_contractor_details_id);
router.put('/invitecontractor_details_update_by_id',contractor.inviteupdate_contractor_details);
router.post('/invitecontractor_details_delete',contractor.invite_delete_contractor_details);
router.post('/Contractor_details_by_account_id',contractor.get_contractor_details_id);
router.get('/Current_contractor_details',contractor.get_current_contractor_details);
router.get('/previous_contractor_details',contractor.get_previous_contractor_details);
module.exports =router; 