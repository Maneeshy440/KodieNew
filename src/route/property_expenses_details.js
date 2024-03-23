const express = require("express");
const router = express.Router();
const property_expenses_details = require("../controller/property_expenses_details");

// Apply token authentication middleware to all routes
// Retrieve all leaves
router.get("/getAll/:upd_key", property_expenses_details.findAll);

router.get("/getAll/Expenses/:Expenses_key", property_expenses_details.findAllExpensesDetails);

// Create a new leave
router.post("/create", property_expenses_details.property_expenses_details);

// router.post("/create/paymentlog", property_lease_details.create_rental_payment_log);

module.exports = router; 