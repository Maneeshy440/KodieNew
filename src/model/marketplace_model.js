var dbConn = require("../../config/db.config");

async function get_market_place_by_account_id(req, res) {
  console.log(req.body.account_id);
  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_MARKET_PLACE_BY_ACCOUNT_ID(?)", [
        req.body.account_id,
      ]);
      console.log(results[0].length,"asasasaresult")
      if (results[0].length === 0) {
        const results=1
        return results;
      }
      else
      {
        // console.log(results[0][0].image_path, "result");
        const imageFileNames = results[0][0].image_path;
        console.log("Image File Names:", imageFileNames);
        const protocol ="https";
        const basePath = `${protocol}://${req.get("host")}/upload/photo`;
        const imagePaths = imageFileNames
          ? imageFileNames
              .split(", ")
              .map((fileName) => `${basePath}/${fileName.trim()}`)
          : [];
        console.log("Image Paths:", imagePaths);
        results[0][0].image_path = imagePaths;
        return results ;
      }


  } 
  catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}
async function insert_enable_bidd_details_in_marketplace(req,res) {
  try {
    console.log(req.body,"asasaa");
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_INSERT_MARKET_PLACE_BIDDING_ENABLE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        req.body.account_id,
        req.body.property_id,
        req.body.commencement_date,
        req.body.duration,
        req.body.list_price,
        req.body.auto_threshold,
        req.body.notif_type,
        req.body.bid_open_reminder,
        req.body.bid_open_day,
        req.body.bid_open_before,
        req.body.bid_close_reminder,
        req.body.bid_close_day,
        req.body.bid_close_before,
        req.body.new_bid,
        req.body.new_bid_days,
        req.body.new_bid_before
      ]);
    console.log(results, "result");
    return results ;
  } 
  catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}
module.exports = {
  get_market_place_by_account_id,
  insert_enable_bidd_details_in_marketplace
};
