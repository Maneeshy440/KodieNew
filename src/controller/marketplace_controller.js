const marketplace_model = require("../model/marketplace_model");

const marketplace_controller = {
  getmarketplace: async (req, res) => {
    try {
        console.log(req.body.account_id,"req.body.account_id");
        console.log(req.body.account_id.length,"req.body.account_id.length()");
      if (req.body.account_id === null && req.body.account_id === "undefined" && req.body.account_id.length === 0) 
      {
        res.status(400).json({
            success: false,
            error: true,
            message: "Account id is required",
          });
      } 
      else {
        const market_property_details = await marketplace_model.get_market_place_by_account_id(req);
         console.log(market_property_details,"market_property_details_code");
         
        if(market_property_details == 1 || market_property_details[0][0].result ==="1")
        {
            res.status(400).json({
                success: false,
                error: true,
                message: "No such property listed on marketplace",
              });
        }
        else
        {
            res.status(200).json({
                property_details:market_property_details[0],
                success: true,
                error: false,
                message: "Property Market Details Retrieve Successfully",
              });
        }
      }
    } catch (error) {
        console.error("Error getting:", error);
        res.status(500).json({
          message: error.message,
          status: false,
          error: true,
        });
    }
  },
  insert_bidding_details : async(req,res) =>{
    try{
        // console.log(req.body.account_id.length,"1");
        // console.log(req.body.property_id.length,"12");
      if(req.body.account_id.length ===0 && req.body.property_id.length ===0)
      {
        res.status(400).json({
            success: false,
            error: true,
            message: "Account id And Property id is required",
          });
      }
      else
      {
        console.log(req.body,"vcvcvc")
        const insert_bidding_details_marketplace= await marketplace_model.insert_enable_bidd_details_in_marketplace(req,res)
        console.log(insert_bidding_details_marketplace[0][0].result,"insert_bidding_details_marketplace");
        if(insert_bidding_details_marketplace[0][0].result ==="1")
        {
          res.status(400).json({
            success: false,
            error: true,
            message: "No Such Property on behave of this account id",
          });
        }
        else
        {
          res.status(200).json({
            success: true,
            error: false,
            message:insert_bidding_details_marketplace[0][0].result ,
          });
        }
      }
    }
    catch(error)
    {
        console.error("Error getting :", error);
        res.status(500).json({
          message: error.message,
          status: false,
          error: true,
        });

    }
  },

};
module.exports = marketplace_controller;
