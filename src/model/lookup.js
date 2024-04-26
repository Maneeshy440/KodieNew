var dbConn = require("../../config/db.config");

async function lookup_details(lookupData) {
    try {
      // console.log("HiiModel",lookupData);
      // console.log(lookupData)
      const [results] = await dbConn.promise().query('CALL USP_KODIE_FETCH_LOOKUP_MASTER(?,?)', [lookupData.P_PARENT_CODE,lookupData.P_TYPE]);
      console.log("lookup Details Results:",  results[0]);
   
      return results[0];
    } catch (error) {
      console.error('Error getting job details:', error);
      throw error;
    }
  } 

  async function get_key_features() {
    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_ALL_ADDITIONAL_FEATURES_DETAILS()', []);
      console.log("Key All Key Features:",  results[0]);
   
      return results[0];
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
  } 

  async function add_feedback_details(lookup) {
    console.log(lookup,"asasa")
    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_ADD_FEEDBACK_RATING(?,?,?,?,?,?,?)', [
        lookup.account_id,
        lookup.modules_name,
        lookup.rate_services,
        lookup.describe_level,
        lookup.quality_performed,
        lookup.leave_performed,
        lookup.recommend
      ]);
      
   
      return results;
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
  } 

  async function Search_For_Rental(lookup) {
    console.log(lookup,"asasa")
    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_SEARCH_FOR_RENTAL_DETAILS(?,?,?,?,?,?,?,?,?,?,?,?)', [
        lookup.location,
        lookup.location_longitude,
        lookup.location_latitude,
        lookup.property_type,
        lookup.min_price,
        lookup.max_price,
        lookup.bedrooms,
        lookup.bathrooms,
        lookup.carspaces,
        lookup.on_street_parking,
        lookup.furn_unfurn,
        lookup.pet_friendly
      ]);
      
   console.log(results,"res")
      return results;
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
  } 
  async function Profile_Completion(lookup) {
    console.log(lookup,"asasa")
    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_COMPLETE_PROFILE(?)', [
        lookup.user_id
      ]);
      
   console.log(results,"res")
      return results;
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
  } 
  async function Profile_Day(lookup) {
    // console.log(lookup,"asasa")

    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_TRIAL_DAY(?)', [
        lookup.user_id
      ]);
      
   console.log(results,"res")
      return results;
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
  }
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
      
   console.log(results,"res")
      return results;
    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
  }
  async function getAccount_details(req,lookup) {
    console.log(lookup,"asasa")
    try {
      const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_ACCOUNT_DETAILS_AS_Business(?)', [
        lookup.user_id
      ]);
      console.log(results[0].length,"resultsAAAAA");
      if(results[0].length >0)
      {
       
   const additional_key_features = results[0][0].profile_path;
   console.log(additional_key_features, "aassas");
   const company_logo = results[0][0].business_data.company_logo;
   console.log(company_logo, "company_logo");
   results[0][0].UAD_PROFILE_PHOTO_PATH = additional_key_features;
   const imageFileNames = results[0][0].UAD_PROFILE_PHOTO_PATH;

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
  
      return results;
      }
      else
      {
        return null;
      }
  //  console.log(results[0][0].UAD_PROFILE_PHOTO_PATH,"res")

    } catch (error) {
      console.error('Error getting key Features:', error);
      throw error;
    }
  }

module.exports = {getAccount_details,Profile_Day,Subscription,Profile_Completion,lookup_details,get_key_features,add_feedback_details,Search_For_Rental};