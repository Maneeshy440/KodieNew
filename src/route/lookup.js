const express = require("express");
const router = express.Router();
const lookup = require('../controller/lookup');

router.post("/lookup_details", lookup.createLookup  )
router.get("/get_key_features", lookup.key_features  )
router.post("/add_feedback_details", lookup.feedback_details  )
router.post("/Contact_Us", lookup.Contact_Us  )
router.post("/Search_For_Rental",lookup.Search_For_Rental)
// Code For Profile completion
router.post("/Profile_Completion",lookup.Profile_Completion)
router.post("/Profile_Day",lookup.Profile_Day)
//Subscription modules
router.post("/subscription",lookup.Subscription)
router.get("/getAccount_details/:user_id",lookup.get_Account_details)
module.exports =router; 