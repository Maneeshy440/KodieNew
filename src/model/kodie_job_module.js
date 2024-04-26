const dbConn = require('../../config/db.config');

async function insertJobDetails(jobDetails) {
  try {
    console.log("Job Details:", jobDetails);
    // console.log("req.body" , req.body);

    const [results] = await dbConn.promise().query('CALL USP_KODIE_INSERT_JOB_DETAILS(?, @r_job_id)', [JSON.stringify(jobDetails)]);
    console.log("Insert Job Details Results:", results);

    const [output] = await dbConn.promise().query('SELECT @r_job_id AS job_id');
    const jobId = output[0].job_id;
    console.log("Inserted Job ID:", jobId);

    return { jobId, results };
  } catch (error) {
    console.error('Error inserting job details:', error);
    throw error;
  }
}
// ================================================


async function insertJobImages(file, JM_JOB_ID, type, module) {
  console.log(file)
  // console.log(uad_user_key);
  try {
    const [results] = await dbConn.promise().query(
      'CALL USP_KODIE_INSERT_JOB_IMAGE_VIDEO_PATH(?, ?, ?, ?, ?, ?)',
      [                
        file.originalname,       
        file.path,               
        file.mimetype,           
        module,                  
        type,                    
        JM_JOB_ID                
      ]
    );

    const insertedFileId = results[0][0].UM_FILE_ID; 

    return {
      UM_FILE_ID: insertedFileId,
      UM_FILE_NAME: file.originalname,
      UM_FILE_PATH: file.path,
      UM_FILE_TYPE: file.mimetype,
      UM_CREATED_ON: new Date()
    };
  } catch (error) {
    console.error('Error saving file details:', error);
    throw error;
  }
}



// ==========================================================
async function getJobDetails(jobId) {
  try {
    console.log("Requested Job ID:", jobId);

    const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_JOB_DETAILS_REQUEST(?)', [jobId]);
    console.log([results] ,"result")

    if (results[0].length === 0) {
      console.log("Job details not found");
      return null; // or throw an error, depending on your preference
    }
   
    console.log("Job Details Results:", results[0][0]);
    return results[0][0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}

async function getAllJobDetails(accountID) {
  try {
    console.log("HiiModel",accountID);
    console.log(accountID)
    const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_ALL_JOB(?)', [accountID]);
    console.log("Job Details Results:",  results[0]);

    return results[0];
  } catch (error) {
    console.error('Error getting job details:', error); 
    throw error;
  }
}

async function updateJobByjobId(jm_job_id, type_of_job, job_service_you_looking, more_about_job, job_priority, property_type, job_location, location_longitude, location_latitude, job_rating, job_date, job_time, job_hourly, job_often_need_service, job_min_budget,
  job_max_budget, job_payment_by, job_booking_insurance) {
  try {
    const [results] = await dbConn.promise().query('CALL USP_KODIE_UPDATE_JOB_DETAILS_BY_JOB_ID(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?)', [
      jm_job_id,
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
    ]);

    console.log("Job Details Results:", results);
    return results;
  } catch (error) {
    console.error('Error updating job details:', error);
    throw error;
  }
}

async function deleteJob(jobId) {
  try {
    console.log("HiiModel",jobId);
    // console.log(accountID)
    const [results] = await dbConn.promise().query('CALL USP_KODIE_DELETE_JOB(?)', [jobId]);
    console.log("Job deleted Results:",  results[0]);

    return results[0];
  } catch (error) {
    console.error('Error getting job details:', error); 
    throw error;
  }

}


async function lookupDetails(parentCode, type) {
  try {
    console.log("HiiModel", parentCode);
    console.log(type);

    const [results] = await dbConn.promise().query('CALL USP_KODIE_FETCH_LOOKUP_MASTER(?, ?)', [parentCode, type]);
    console.log("Lookup Results:", results[0]);

    return results[0];
  } catch (error) {
    console.error('Error getting lookup details:', error);
    throw error;
  }
}

async function addJobDetailsArchieve(job_id) {
  console.log("job_id",job_id)

  try {
    console.log("Job id:", job_id);
    console.log(job_id,"job_id");
    const results = await dbConn.promise().query('CALL USP_KODIE_ADD_JOB_ARCHIEVE(?)', [job_id]);
    console.log("Insert Job Details Results:", results[0][0]);

    console.log("Inserted Job ID:", job_id);

    return results[0][0] ;
  } catch (error) {
    console.error('Error inserting job to archieve:', error);
    throw error;
  }
}


async function addBiddingData(BiddingData) {
  try {
    console.log("BidModule", BiddingData);
    // console.log(type);

    const [results] = await dbConn.promise().query('CALL USP_KODIE_INSERT_BIDDING_DATA(?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      BiddingData.UAD_USER_KEY,
      'Job',
      BiddingData.BIDDING_REF_KEY,
      BiddingData.BIDDING_COMMENCEMENT_DATE,
      BiddingData.BIDDING_DURATION,
      BiddingData.BIDDING_LIST_PRICE,
      BiddingData.BIDDING_AUTO_ACCEPT,
      BiddingData.BIDDING_PAYMENT_TERMS,
      BiddingData.BIDDING_NOTIFICATION_TYPE,
      BiddingData.BM_IS_BIDDING_OPEN,
      BiddingData.BIDDING_OPEN_REMINDER,
      BiddingData.BIDDING_CLOSE_REMINDER,
      BiddingData.BM_IS_BIDDING_CLOSE,
      BiddingData.BIDDING_NEW_BID,
      BiddingData.BM_IS_NEW_BID,
      BiddingData.BIDDING_IS_WINNER,
      BiddingData.IS_ACTIVE
    ]
  );
    console.log("Bidding Results:", results);

    // const requestBody = JSON.stringify(BiddingData);
    // const responseStatus = 200; 
    // const responseBody = JSON.stringify({ success: true }); 

    // await dbConn.promise().query('CALL USP_KODIE_INSERT_REQUEST_RESPONSE_LOG(?, ?, ?, ?, ?)',
    //   [
    //     'POST', // Assuming you are using POST method
    //     'Bidding Module', // Adjust as needed
    //     requestBody,
    //     responseStatus,
    //     responseBody,
    //   ]
    // );

    return results;
  } catch (error) {
    console.error('Error getting lookup details:', error);
    throw error;
  }
}


async function getallBidRequestforJob(Bidsforjobparams) {
  try {
   
    console.log(Bidsforjobparams.job_id,"job_id");
    console.log(Bidsforjobparams.uad_key,"uad_key");

    const job_id=Bidsforjobparams.job_id;
    const uad_key=Bidsforjobparams.uad_key;
    const results = await dbConn.promise().query('CALL USP_KODIE_GET_ALL_BID_REQUESTS_FOR_JOB(?,?)',[job_id,uad_key]);
    console.log(results[0][0],"ressss");
    // results[0][0].length === 0
    if (results !=undefined && results.length >0) {
      
      return results[0][0]; 
    }
    else{
      console.log("Contractor details not found");
      return null ;
    }
     
    
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}

async function getContractorbyUserKey(user_key) {
  try {
    const results = await dbConn.promise().query('CALL USP_KODIE_GET_CONTRACTOR_BY_USER_KEY(?)',[user_key]);
    console.log(results[0][0],"ressss");
    
    return results[0][0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}


async function getJobByFilter( req,
  p_Filter,
  user_account_id,
  page_no,
  limit,
  order_col,
  order_wise) {
  try {
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_GET_ALL_JOB_BY_FILTER_REQUEST(?,?,?,?,?,?)", [
        p_Filter,
        user_account_id,
        page_no,
        limit,
        order_col,
        order_wise
      ]);

    //  console.log([results],"length");
    // console.log(results[0][1],"result modal");
     console.log(results[0][0],"resultModels1");
    //  console.log(results[0],"resultModels2");
    //  console.log(results[0][1],"resultModels3");
    return results[0][0];
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function getJobByFilter_Service( req,
  p_Filter,
  user_account_id,
  page_no,
  limit,
  order_col,
  order_wise) {
  try {
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_GET_ALL_JOB_BY_FILTER_SERVICE(?,?,?,?,?,?)", [
        p_Filter,
        user_account_id,
        page_no,
        limit,
        order_col,
        order_wise
      ]);

    // console.log(results[0].length,"length");
    //  console.log(results[0][0],"resultsssssss");

    return results[0][0];
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}


async function searchJobs(searchJobsDetails) {
  try {
    console.log("Job Details:", searchJobsDetails);

    const results = await dbConn.promise().query(
      'CALL USP_KODIE_SEARCH_JOB(?,?,?,?,?,?,?)',
      [
        searchJobsDetails.job_type,
        searchJobsDetails.job_perform,
        searchJobsDetails.available,
        searchJobsDetails.longitude,
        searchJobsDetails.latitude, 
        searchJobsDetails.min_budget,
        searchJobsDetails.max_budget
      ]
    );

    console.log("Search Job Results:", results[0]);
    return results[0];
  } catch (error) {
    console.error('Error searching for jobs:', error);
    throw error;
  }
}

async function getJobSummury(jobId) {
  try {
    console.log("Requested Job ID:", jobId);

    const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_JOB_SUMMURY_FOR_BID(?)', [jobId]);
    console.log([results] ,"result")

    if (results[0].length === 0) {
      console.log("Job details not found");
      return null; // or throw an error, depending on your preference
    }
   
    console.log("Job Details Results:", results[0][0]);
    return results[0][0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}

async function insertBidRequestData(bidRequestData) {
  try {
    const {
      job_id,
      uad_key,
      preferred_date,
      preferred_time,
      amount,
      service_time,
      cover_later,
    } = bidRequestData;

    const results = await dbConn.promise().query('CALL USP_KODIE_INSERT_BID_REQUESTS(?,?,?,?,?,?,?)', [
      job_id,
      uad_key,
      preferred_date,
      preferred_time,
      amount,
      service_time,
      cover_later,
    ]);
    console.log(results, "result");

    return results;
  } catch (error) {
    console.error('Error inserting bid request details:', error);
    throw error;
  }
}

async function acceptBidRequest(job_id,uad_key) {
  console.log("job_id",job_id);
  console.log("uad_key",uad_key);

  try {
    const results = await dbConn.promise().query('CALL USP_KODIE_ACCEPT_JOB_BID_REQUEST(?,?)', [job_id,uad_key]);
    console.log("Req Accepted:", results[0]);

    return results[0];
  } catch (error) {
    console.error('Error Accepting job bid:', error);
    throw error;
  }
}




module.exports = { getJobByFilter_Service,insertJobDetails, getJobDetails, insertJobImages ,getAllJobDetails ,updateJobByjobId ,deleteJob,lookupDetails ,addJobDetailsArchieve,addBiddingData,getallBidRequestforJob,getContractorbyUserKey,getJobByFilter,searchJobs,getJobSummury,insertBidRequestData,acceptBidRequest};
