const express = require("express");
const multer = require("multer");
const ProfileController = require("../login controller/profile_controller");
const router = express.Router();
const path = require("path");
const DIR = path.join(__dirname, "../../upload/photo");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.put("/updateProfile", upload.single("profile_photo"), ProfileController.updateProfile);
// router.post("/addusercompanydata", upload.single("UCDM_COMPANY_LOGO"),ProfileController.addUserCompanyData);
router.put("/updateusercompanydata", upload.single("company_logo"), ProfileController.updateUserCompanyData);
router.put("/updateContactdetails", ProfileController.updateContactDetails);
router.delete("/deleteuseraccount", ProfileController.deleteUserAccount);
router.post("/getUserCompanyDetails",ProfileController.getUserCompanyDetails);


module.exports = router;
