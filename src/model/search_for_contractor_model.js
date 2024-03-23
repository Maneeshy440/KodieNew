var dbConn = require("../../config/db.config");



async function get_property_address_by_account_id(account_id) {
    console.log(account_id, "property_id");
    try {
      const [results] = await dbConn
        .promise()
        .query("CALL USP_KODIE_GET_ALL_PROPERTY_ADDRESS_ACCOUNT_ID(?)", [account_id]);
      console.log(results);
      return results[0];
    } catch (error) {
      console.error("Error getting property details:", error);
      throw error;
    }
}
async function search_for_contractor(account_id) {
    console.log(account_id, "property_id");
    try {
      const [results] = await dbConn
        .promise()
        .query("CALL USP_KODIE_SEARCH_CONTRACTOR_MODULE(?,?,?,?)",[
            account_id.job_need,
            account_id.job_service,
            account_id.longitude,
            account_id.latitude
        ]);
      console.log(results);
      return results[0];
    } catch (error) {
      console.error("Error getting property details:", error);
      throw error;
    }
}

module.exports={
    get_property_address_by_account_id,
    search_for_contractor
}