const express =require('express');
const router = express.Router();
const marketplace_controller =require('../controller/marketplace_controller');

router.post("/property_market_by_account_id",marketplace_controller.getmarketplace);
router.post("/property_market_place_enable_bidding",marketplace_controller.insert_bidding_details);


module.exports =router;