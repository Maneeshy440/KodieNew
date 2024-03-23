const express = require("express");
const router = express.Router();
const notices_reminder_controller =require('../controller/notices_reminder_controller');
const path = require("path");
const multer = require('multer');

const DIR = path.join(__dirname, "../../upload/photo");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

 // You can adjust this based on your needs
const upload = multer({ storage: storage });
router.post("/get_details_by_account_id_notices_reminder",notices_reminder_controller.getdetails_by_account__details_notices_reminder);
router.post("/create_notices_reminder",upload.single("file_name") ,notices_reminder_controller.insert_create_new_notices_reminder);
router.post("/get_notices_reminder_details",notices_reminder_controller.get_new_notices_reminder);
router.put("/update_notices_reminder",upload.single("file_name") ,notices_reminder_controller.updated_create_new_notices_reminder);
router.post("/delete_notices_reminder_details",notices_reminder_controller.deleted_new_notices_reminder);
module.exports =router; 

