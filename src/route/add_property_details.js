const express =require('express');
const router =express.Router();
const add_property_details_Controller = require('../controller/add_property_details');
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

router.post('/add_property_details',add_property_details_Controller.createadd_property_details);
router.post('/add_property_images_video', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 10 }]), add_property_details_Controller.createadd_images_and_video);
router.post('/get_property_details',upload.any(),add_property_details_Controller.get_property_details_by_id);
router.put('/update_property_details',add_property_details_Controller.updateadd_property_details);
router.put('/update_property_images_video_details', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 10 }]), add_property_details_Controller.updateadd_images_and_video);
router.delete('/delete_property_by_id',upload.any(),add_property_details_Controller.delete_property_details_by_id);

router.post('/get_property_details_by_filter',upload.any(),add_property_details_Controller.filter_property_details_by_id);
router.post('/archieve_property',upload.any(),add_property_details_Controller.archieve_property_details_by_id);
router.get('/get_vacant_property_list',add_property_details_Controller.get_vacant_details);
module.exports =router; 