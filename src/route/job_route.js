const express = require('express');
const multer = require('multer');
const JobController = require('../controller/job_controller');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post('/create', JobController.insertJobDetails);
router.post('/get', upload.any(),JobController.getJobDetails);
router.get('/getAlljobs/:p_jm_uad_user_id', JobController.getAllJobDetails);
router.put('/updateJob/:p_jm_job_id' ,JobController.updateJobById);
router.delete('/deletejob/:p_jm_job_id', JobController.deleteJob);
router.get('/lookup/:parentCode/:type', JobController.fetchLookupMaster);
router.post('/addJobArchieve', JobController.addJobToArchieve);
router.put('/updatejobimages/:p_jm_job_id', upload.any(),JobController.updateJobImagesVideosById);
router.post('/addBidding', JobController.addBiddingdata);
router.post('/getallBidRequestForJob', JobController.getallBidRequestForJob);
router.post('/getJobbyFilter',  upload.any(),JobController.getJobByFilterByAccountid);
router.get('/getContractor/:user_key',JobController.getContactorDetailsByUserKey);
router.post('/getJobbyFilter_Service',  upload.any(),JobController.getJobByFilterByAccountid_Service);
router.post('/searchJobs', JobController.searchJobs);
router.get('/getjobsummary/:job_id',JobController.getJobSummuryForBid);
router.post('/insertBidRequestData', JobController.insertBidRequestDetails);
router.post('/acceptBidReqest', JobController.acceptBidRequest);

router.post('/uploadJobFiles', upload.fields([
  { name: 'frontImage', maxCount: 5 },
  { name: 'leftImage', maxCount: 5 },
  { name: 'rightImage', maxCount: 5 },
  { name: 'video', maxCount: 3 }
]), JobController.insertJobImages)

module.exports = router;
