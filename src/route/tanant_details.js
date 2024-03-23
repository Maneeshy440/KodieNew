const express = require("express");
const router = express.Router();
const tanant_details = require("../controller/tanant_details");

// Apply token authentication middleware to all routes
// Retrieve all leaves
router.get("/getAll/tanant", tanant_details.findAll);

router.get("/getAll/tanant/manually", tanant_details.findAllTenant_Manually);

router.get("/get/tenantmanually/:upd_key_param", tanant_details.findtenant_manually_by_upd);

router.get("/get/document/:fileReferenceKey", tanant_details.findAlldocument);

router.post("/get/documents", tanant_details.finddocument);

// Create a new leave
router.post("/create/person", tanant_details.tanant_details);

router.post("/create/company", tanant_details.create_tenant_company);

module.exports = router;