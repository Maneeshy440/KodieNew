var dbConn = require("../../config/db.config");


async function Subscription(lookup) {
    console.log(lookup,"asasa")
    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_INSERT_SUBSCRIPTION_DETAILS(?,?,?,?,?,?,?,?)', [
        lookup.user_id,
        lookup.account_id,
        lookup.customer_id,
        lookup.subscription_id,
        lookup.startDate,
        lookup.endDate,
        lookup.collection_method,
        lookup.subscribe_type
      ]);
      
   console.log(results[0][0].result,"res")
      return results[0][0].result;
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
}

async function getStatus(lookup) {
    console.log(lookup,"asasa")
    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_CUSTOMER_ID(?)', [
        lookup
      ]);
      console.log(results[0][0].TUS_TRANSACTION_ID,"id")
      return results[0][0].TUS_TRANSACTION_ID;
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
}
module.exports ={Subscription,getStatus}