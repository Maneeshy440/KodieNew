const multer = require("multer");
const express = require("express");
const app = express();
app.use("/upload/images", express.static("upload/images"));
const Job = require("../model/kodie_job_module");
const dbConn = require('../../config/db.config');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

function generateImagePaths(imageNames, request, prefixText) {
  if (!imageNames) {
    return [];
  }

  const imageNamesArray = imageNames.split(",").map((name) => name.trim());
  const base_url = `${request.protocol}://${request.get(
    "host"
  )}/upload/images/`; 

  const imagePathsArray = imageNamesArray.map(
    (imageName) => `${base_url}${imageName}`
  );

  return imagePathsArray;
}

const JobController = {
  insertJobDetails: async (req, res) => {
    try {
      const jobDetails = req.body;
      console.log("jobDetails", jobDetails);

      const result = await Job.insertJobDetails(jobDetails);
      console.log("result", result);
      if (result.response === "fail") {
        return res.status(201).json({
          id: result.jobId,
          message: " Job details already exist",
        });
      } else {
        return res.status(201).json({
          job_id: result.jobId,
          success: true,
          error: false,
          message: "Job details inserted successfully",
        });
      }
    } catch (error) {
      console.error("Error inserting job details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error inserting job details.",
      });
    }
  },

  insertJobImages: async (req, res) => {
    try {
      const JM_JOB_ID = req.body.JM_JOB_ID;

      const frontImage = req.files["frontImage"];
      const leftImage = req.files["leftImage"];
      const rightImage = req.files["rightImage"];
      const video = req.files["video"];
    
      // console.log("frontImage", frontImage);
      // console.log("leftImage", leftImage);
      // console.log("rightImage", rightImage);
      // console.log("video", video);

      if (!frontImage && !leftImage && !rightImage && !video) {
        return res.status(400).json({
          success: false,
          error: "At least one image or video must be provided.",
        });
      }
    
      const uad_user_key = req.body.uad_user_key;

    
      const insertFiles = async (files, type) => {
        const fileDetails = [];
    
        const fileList = Array.isArray(files) ? files : [files];
    
        for (const file of fileList) {
          const fileDetailsResult = await Job.insertJobImages(
            file,
            JM_JOB_ID,
            type,
            "Job"
          );
    
          fileDetails.push(fileDetailsResult);
        }
    
        return fileDetails;
      };
    
      if (frontImage) {
        const frontImageDetails = await insertFiles(frontImage, "front");
        const protocol = "https";
        const fileUrl = `${protocol}://${req.get("host")}/upload/images/${frontImageDetails[0].UM_FILE_NAME}`;
        const imageUrl = `${fileUrl}`;
        frontImage.imageUrl = imageUrl;
        console.log(frontImage.imageUrl);
      }
    
      if (leftImage) {
        const leftImageDetails = await insertFiles(leftImage, "left");
        const protocol = "https";
        const fileUrl = `${protocol}://${req.get("host")}/upload/images/${leftImageDetails[0].UM_FILE_NAME}`;
        const imageUrl = `${fileUrl}`;
        leftImage.imageUrl = imageUrl;
        console.log(leftImage.imageUrl);
        
      }
    
      if (rightImage) {
        const rightImageDetails = await insertFiles(rightImage, "right");
        const protocol = "https";
        const fileUrl = `${protocol}://${req.get("host")}/upload/images/${rightImageDetails[0].UM_FILE_NAME}`;
        const imageUrl = `${fileUrl}`;
        rightImage.imageUrl = imageUrl;
        console.log(rightImage.imageUrl);

      }
    
      if (video) {
        const videoDetails = await insertFiles(video, "Null");
        const protocol = "https";
        const fileUrl = `${protocol}://${req.get("host")}/upload/images/${videoDetails[0].UM_FILE_NAME}`;
        const imageUrl = `${fileUrl}`;
        video.imageUrl = imageUrl;
        console.log(video.imageUrl);
      }
    
      res.status(200).json({
        success: true,
        message: "Images inserted successfully",
        error: false,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }

  },

  

  getJobDetails: async (req, res) => {
    try {
      const jobId = req.body.jm_job_id;
      console.log("jobId---", jobId);
  
      const jobDetails = await Job.getJobDetails(jobId);
      console.log("jobDetails", jobDetails);
  
      if (!jobDetails) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Job details not found",
        });
      }
  
      const imageNames = jobDetails.image_path;
  
      console.log(imageNames, "imageNames");

      const protocol = "https"
      const base_url = `${protocol}://${req.get("host")}/upload/images/`;

      const fullImagePathsArray = imageNames
        ? imageNames.split(",").map((imageName) => `${base_url}${imageName.trim()}`)
        : null;
  
      console.log("fullImagePathsArray", fullImagePathsArray);
      jobDetails.image_file_path = fullImagePathsArray;
      console.log("jobDetails.image_file_path", jobDetails.image_file_path);
      delete jobDetails.image_path;
  
      return res.status(200).json({
        success: true,
        error: false,
        data: jobDetails,
        message: "Job details retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving job details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error retrieving job details.",
      });
    }
  },
  

  getAllJobDetails: async (req, res) => {
    try {
      const accountID = req.params.p_jm_uad_user_id;
      console.log("accountID---", accountID);
      const jobDetails = await Job.getAllJobDetails(accountID);
      console.log("jobDetails", jobDetails);

      if (!jobDetails) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Job details not found",
        });
      }

      return res.status(200).json({
        success: true,
        error: false,
        data: jobDetails,
        message: "Job details retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving job details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error retrieving job details.",
      });
    }
  },

  updateJobById: async (req, res) => {
    const jobId = req.params.p_jm_job_id;

    console.log("jobId-->", jobId);
    const {
      type_of_job,
      job_service_you_looking,
      more_about_job,
      job_priority,
      property_type,
      job_location,
      location_longitude,
      location_latitude,
      job_rating,
      job_date,
      job_time,
      job_hourly,
      job_often_need_service,
      job_min_budget,
      job_max_budget,
      job_payment_by,
      job_booking_insurance
    } = req.body;

    try {
      const updatedJob = await Job.updateJobByjobId(
        jobId,
        type_of_job,
        job_service_you_looking,
        more_about_job,
        job_priority,
        property_type,
        job_location,
        location_longitude,
        location_latitude,
        job_rating,
        job_date,
        job_time,
        job_hourly,
        job_often_need_service,
        job_min_budget,
        job_max_budget,
        job_payment_by,
        job_booking_insurance
      );

      res.status(200).json({
        success: true,
        error: false,
        // data: updatedJob,
        message: "Job details Updated successfully",
      });
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const jobId = req.params.p_jm_job_id;
      console.log("jobId---", jobId);

      const jobDetails = await Job.deleteJob(jobId);
      console.log("jobDetails", jobDetails);

      if (!jobDetails) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Job details not found",
        });
      }

      return res.status(200).json({
        success: true,
        error: false,
        data: jobDetails[0],
        message: "Job deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting job details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error deleting job details.",
      });
    }
  },

  fetchLookupMaster: async (req, res) => {
    try {
      const { parentCode, type } = req.params;
      console.log("Controller params:", parentCode, type);

      const lookupResult = await Job.lookupDetails(parentCode, type);

      if (!lookupResult) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Lookup details not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: lookupResult,
        message: "Lookup details fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching lookup details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error fetching lookup details.",
      });
    }
  },

  addJobToArchieve: async (req, res) => {
    try {
      const p_job_id = req.body.p_job_id;
      console.log("JobId:", p_job_id);

      const ArchieveResult = await Job.addJobDetailsArchieve(p_job_id);
      console.log("ArchieveResult", ArchieveResult[0].result);

      const resultArchieve = ArchieveResult[0].result;
      console.log(resultArchieve);

      if (!ArchieveResult) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Error inserting Job To Archieve ",
        });
      }

      return res.status(200).json({
        success: true,
        // data: ArchieveResult[0],
        message: resultArchieve,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Error inserting Job To Archieve ",
      });
    }
  },

  updateJobImagesVideosById: async (req, res) => {
    try {
      const jobId = req.params.p_jm_job_id;

      console.log("jobId-->", jobId);

      // const deleteImagesResult = await Job.updateImages(jobId);
      // console.log("Pankaj1");
      // console.log("DeleteImagesResult", deleteImagesResult);

      console.log("Pankaj2");
      console.log(req.files, "reqfiles");
      console.log("Pankaj3");
      console.log("JM_JOB_ID", jobId);

      // const createdBy = req.body.createdBy;
      // const updatedBy = req.body.updatedBy;

      console.log("req.files", req.files);

      const insertFiles = async (files, type) => {
        const fileDetails = [];

        for (const file of files) {
          const fileDetailsResult = await Job.insertJobImages(
            file,
            jobId,
            type,
            "Job"
          );
          fileDetails.push(fileDetailsResult);
        }
        return fileDetails;
      };

      // Insert the file details into your database
      const frontImageDetails = await insertFiles(
        req.files.filter((file) => file.fieldname === "frontImage"),
        "front"
      );
      console.log("HIIII");
      const leftImageDetails = await insertFiles(
        req.files.filter((file) => file.fieldname === "leftImage"),
        "left"
      );
      const rightImageDetails = await insertFiles(
        req.files.filter((file) => file.fieldname === "rightImage"),
        "right"
      );
      const videoDetails = await insertFiles(
        req.files.filter((file) => file.fieldname === "video"),
        "Null"
      );
      console.log("HIIIIALLL");

      console.log(frontImageDetails);

      return res.status(200).json({
        success: true,
        message: "Job images/videos updated successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error updating job images/videos.",
      });
    }
  },

  // addBiddingdata: async (req, res) => {
  //   try {
  //     const BiddingData = req.body;
  //     console.log("Data:", BiddingData);

  //     const biddingres = await Job.addBiddingData(BiddingData);
  //     console.log("biddingres", biddingres);

  //     if (!biddingres) {
  //       return res.status(404).json({
  //         success: false,
  //         error: true,
  //         message: "Error inserting Bidding Details",
  //       });
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       // data: biddingres,
  //       message: "Bidding Details Inserted Sucessfully",
  //     });
  //   } catch (error) {
  //     // console.error("Error fetching lookup details:", error);
  //     res.status(500).json({
  //       success: false,
  //       error: true,
  //       message: "Error inserting Bidding Details.",
  //     });
  //   }
  // },

  addBiddingdata: async (req, res) => {
    try {
      const BiddingData = req.body;
      console.log("Data:", BiddingData);

      const biddingres = await Job.addBiddingData(BiddingData);
      console.log("biddingres", biddingres);

      if (!biddingres) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Error inserting Bidding Details",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Bidding Details Inserted Successfully",
      });
    } catch (error) {
      try {
        const errorMsg = JSON.stringify(error.message) || "Unknown error"; 
        const moduleName = 'Bidding Module';

        await dbConn.promise().query('CALL USP_KODIE_LOG_ERRORS_PROC(?, ?, NOW())', [moduleName, errorMsg]);

        console.error("Error inserting Bidding Details:", error);
        res.status(500).json({
          success: false,
          error: true,
          message: "Error inserting Bidding Details.",
        });
      } catch (logError) {
        console.error('Error logging error:', logError);
        res.status(500).json({
          success: false,
          error: true,
          message: "Error inserting Bidding Details and logging error.",
        });
      }
    }
  },


  getallBidRequestForJob: async (req, res) => {
    try {
   
      const Bidsforjobparams = req.body;
      
      // console.log("Data:", Bidsforjobparams);
      const contractorDetails = await Job.getallBidRequestforJob(Bidsforjobparams);
    //  console.log(contractorDetails[0][0], "contr");
     
      if (!contractorDetails) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Contractor details not found",
        });
      }
      const protocol = "https";
    const base_url = process.env.BASE_URL || `${protocol}://${req.get("host")}/upload/images/`;
    contractorDetails.forEach(contractor => {
      contractor.UAD_PROFILE_PHOTO_PATH = `${base_url}${contractor.UAD_PROFILE_PHOTO_PATH}`;
    });
  
      return res.status(200).json({
        success: true,
        error: false,
        data: contractorDetails[0],
        message: "Contractors retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving Contractor details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error retrieving Contractor details.",
      });
    }
  },

  getContactorDetailsByUserKey: async (req, res) => {
    const user_key =req.params.user_key;
    try {
      const contractorDetails = await Job.getContractorbyUserKey(user_key);
      console.log(contractorDetails[0], "contr");
  
      if (!contractorDetails) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Contractor details not found",
        });
      }
      const protocol = "https";
    const base_url = process.env.BASE_URL || `${protocol}://${req.get("host")}/upload/images/`;
    contractorDetails.forEach(contractor => {
      contractor.UAD_PROFILE_PHOTO_PATH = `${base_url}${contractor.UAD_PROFILE_PHOTO_PATH}`;
    });
  
      return res.status(200).json({
        success: true,
        error: false,
        data: contractorDetails[0],
        message: "Contractors retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving Contractor details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error retrieving Contractor details.",
      });
    }
  },

  getJobByFilterByAccountid : async (req, res) => {
    const Filterd_Job = req.body;
    console.log(Filterd_Job,"flter");
    p_Filter = Filterd_Job.job_filter;
    user_account_id = Filterd_Job.user_account_id;
    page_no =Filterd_Job.page_no;
    limit = Filterd_Job.limit;
    order_col = Filterd_Job.order_col;
    order_wise = Filterd_Job.order_wise;



    console.log("page_no:", page_no);
    console.log("limit:", limit);
    console.log("order_col:", order_col);
    console.log("order_wise:", order_wise);

    try {
      const job_details = await Job.getJobByFilter
      (
        req,
        p_Filter,
        user_account_id,
        page_no,
        limit,
        order_col,
        order_wise
        );
        // console.log(job_details[0][0],"JobDetails");
        // console.log(job_details.result,"jobde");
        console.log(job_details,"jobde2");
        if ( job_details[0] === undefined)
        {
          res.status(200).json({
            job_details:[],
            success: false,
            error: true,
            message: "NO DATA FOUND"
          });
        }
        else{
        res.status(200).json({
          job_details: job_details,
          success: true,
          error: false,
          message: "Job Details retrived By Filter"
        });
      }
      } catch (error) { 
        console.error("Error retriving Job details:", error);
        res.status(500).json({
          message: "Error retriving Job details",
          success: false, 
          error: true,

        });
      }
  },
  getJobByFilterByAccountid_Service : async (req, res) => {
    const Filterd_Job = req.body;
    console.log(Filterd_Job,"flter");
    p_Filter = Filterd_Job.job_filter;
    user_account_id = Filterd_Job.user_account_id;
    page_no =Filterd_Job.page_no;
    limit = Filterd_Job.limit;
    order_col = Filterd_Job.order_col;
    order_wise = Filterd_Job.order_wise;



    console.log("page_no:", page_no);
    console.log("limit:", limit);
    console.log("order_col:", order_col);
    console.log("order_wise:", order_wise);

    try {
      const job_details = await Job.getJobByFilter_Service
      (
        req,
        p_Filter,
        user_account_id,
        page_no,
        limit,
        order_col,
        order_wise
        );
        // console.log(job_details.result,"jobdeSERV1");
        // console.log(job_details[0],"jobde2SERV2");
        // console.log(job_details[1][0],"jobde2SERV3");
        // console.log( job_details[1][0].result ,"jobde2SERV4");

        if (job_details[0] === undefined)
        {
          res.status(200).json({
            job_details:[],
            success: false,
            error: true,
            message: "NO DATA FOUND"
          });
        }
        else{
        res.status(200).json({
          job_details: job_details,
          success: true,
          error: false,
          message: "Job Details retrived By Filter"
        });
      }
      } catch (error) { 
        console.error("Error retriving Job details:", error);
        res.status(500).json({
          message: "Error retriving Job details",
          success: false, 
          error: true,

        });
      }
  },
  searchJobs: async (req, res) => {
    try {
      const searchedJobDetails = req.body;
      console.log("Job Details", searchedJobDetails);
  
      const searchResult = await Job.searchJobs(searchedJobDetails);
      console.log("Search Result", searchResult);
  
      if (searchResult) {
        return res.status(201).json({
          data: searchResult[0],
          success: true,
          error: false,
          message: "Matched job details retrived successfully",
        });
      } else {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Job details not found or invalid request",
        });
      }
    } catch (error) {
      console.error("Error retrieving job details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error retrieving job details",
      });
    }
  },
  getJobSummuryForBid: async (req, res) => {
    try {
      const jobId = req.params.job_id;
      console.log("jobId---", jobId);
  
      const jobDetails = await Job.getJobSummury(jobId);
      console.log("jobDetails", jobDetails);
  
      if (!jobDetails) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Job details not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        error: false,
        data: jobDetails,
        message: "Job details retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving job details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error retrieving job details.",
      });
    }
  },

  insertBidRequestDetails: async (req, res) => {
    try {
      const bidRequestData = req.body;
      console.log("Bid Request Data:", bidRequestData);

      const bidRequestDataResult = await Job.insertBidRequestData(bidRequestData);
      console.log("Bid Request Data Result:", bidRequestDataResult);

      return res.status(200).json({
        success: true,
        error: false,
        data: bidRequestDataResult,
        message: "Bid request details inserted successfully",
      });
    } catch (error) {
      console.error("Error inserting bid request details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error inserting bid request details.",
      });
    }
  },
  acceptBidRequest: async (req, res) => {
    try {
      const job_id = req.body.job_id;
      const uad_key= req.body.uad_key;
      console.log(job_id,uad_key,"job,uad");

      const accpetedBidresult = await Job.acceptBidRequest(job_id,uad_key);
      console.log("accpetedBidresult", accpetedBidresult[0]);

      if (!ArchieveResult) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Error accepting job bid",
        });
      }

      return res.status(200).json({
        success: true,
        data: accpetedBidresult[0],
        message: "Req Accepted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Error accepting job bidSS",
      });
    }
  },

};

module.exports = JobController;
