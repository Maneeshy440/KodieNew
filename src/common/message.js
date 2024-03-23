const dbConn = require('../../config/db.config');


async function get_message_description(msg_code) {
   console.log(msg_code,"msg_code")
    try {
      const [results] = await dbConn
        .promise()
        .query("CALL USP_KODIE_MESSAGE_DETAILS(?)", [msg_code]);
        console.log(results[0][0].msg_description,"description")
      return  results[0][0].msg_description ;
    } catch (error) {
      console.error("Error getting job details:", error);
      throw error;
    }
}

module.exports={get_message_description}
