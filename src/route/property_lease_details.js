const express = require("express");
const router = express.Router();
const property_lease_details = require("../controller/property_lease_details");

// Apply token authentication middleware to all routes
// Retrieve all leaves
router.get("/getAll/:upd_key", property_lease_details.findAll);

router.get("/get/paymentdetails/:upd_key", property_lease_details.find_PAYMENT_DETAILS);

router.get("/getAll/Lease/:lease_key", property_lease_details.findAllleaseDetails);

// Create a new leave
router.post("/create", property_lease_details.property_lease_details);

router.post("/create/paymentlog", property_lease_details.create_rental_payment_log);

module.exports = router; 