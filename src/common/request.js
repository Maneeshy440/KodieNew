const dbConn = require("../../config/db.config");

async function get_request(req) {
  try {
    // console.log(req.url, "url");
    // console.log(req.method, "method");
    const requestBody = JSON.stringify(req.body);
    console.log(requestBody,"requestr body notices")
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_INSERT_REQUEST_RESPONSE_LOG(?,?,?)", [
        req.method,
        req.url,
        requestBody,
      ]);
    //  console.log(results[0][0][0].id, "id1");
    return results[0][0][0].id;
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}


async function get_update_log(id,data) {
  try {
    
    //  console.log(id, "id2");
    //  console.log(data, "data1");
     const requestBody = JSON.stringify(data);
     console.log(requestBody,"response body notices")
    //  console.log(requestBody,"request_body");
     const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_UPDATE_REQUEST_RESPONSE(?,?)", [
        id,
        requestBody
      ]);
    console.log(results[0][0], "result");
    return results[0][0];
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function get_error_log(req,res,data) {
  try {
    // console.log(req.url, "url21res");
    // console.log(req.method, "method21res");
    // console.log(res.statusCode, "statusCode");
    const requestBody = JSON.stringify(req.body);
    const responseBody = JSON.stringify(data);
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_INSERT_ERROR_LOG(?,?,?,?,?)", [
        req.method,
        req.url,
        res.statusCode,
        requestBody,
        responseBody
      ]);
    // console.log(results[0][0], "result");
    return results[0][0];
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

module.exports = { get_request,get_update_log,get_error_log };
