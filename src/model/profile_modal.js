const dbConn = require("../../config/db.config");

async function updateuserprofile(uad_key,first_name,last_name,country_code,phone_number,bio,describe_yourself,physical_address,longitude,latitude,profile_photo) {
  try {
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_UPDATE_USER_PROFILE(?, ?, ?, ?,?,?, ?, ?, ?,?,?)", [
        uad_key,
        first_name,
        last_name,
        country_code,
        phone_number,
        bio,
        describe_yourself,
        physical_address,
        longitude,
        latitude,
        profile_photo,
      ]);

    console.log("Results:", results[0][0][0].result);
    return results[0][0][0].result;
  } catch (error) {
    console.error("Error updating details:", error);
    throw error;
  }
}

async function addUserCompanyData(uad_key, logo_name, UCDM_COMPANY_NAME, UCDM_COMPANY_EMAIL, UCDM_COMPANY_CONTACT_NUMBER, 
  UCDM_COMPANY_DESCRIPTION, UCDM_SERVICE_YOU_OFFERING, UCDM_SERVICE_YOU_PERFORM, UCDM_COMPANY_ADDRESS, UCDM_COMPANY_LONGITUDE, 
  UCDM_COMPANY_LATITUDE, UCDM_COMPANY_GST_VAT_NUMBER) {
  
  try {
    const [results] = await dbConn
      .promise()
      .query(
        "CALL USP_KODIE_INSERT_USER_COMPANY_DETAILS(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          uad_key,
          logo_name,
          UCDM_COMPANY_NAME,
          UCDM_COMPANY_EMAIL,
          UCDM_COMPANY_CONTACT_NUMBER,
          UCDM_COMPANY_DESCRIPTION,
          UCDM_SERVICE_YOU_OFFERING,
          UCDM_SERVICE_YOU_PERFORM,
          UCDM_COMPANY_ADDRESS,
          UCDM_COMPANY_LONGITUDE,
          UCDM_COMPANY_LATITUDE,
          UCDM_COMPANY_GST_VAT_NUMBER
        ]
      );

    return results;
  } catch (error) {
    console.error("Error adding user company data:", error);
    throw error;
  }
}

async function updateUsercompanyData(companydata,logo_name) {
  
  try {
    const [results] = await dbConn
      .promise()
      .query(
        "CALL USP_KODIE_UPDATE_USER_COMPANY_DETAILS(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          companydata.account_id,
          companydata.run_business,
          companydata.organisation_name,
          companydata.austrialian_business_no,
          companydata.company_gst,
          companydata.category_offer,
          companydata.service_perform,
          companydata.company_address,
          companydata.company_longitude,
          companydata.company_latitude,
          companydata.website,
          logo_name
        ]
      );
      console.log(results,"res")
    return results;
    
  } catch (error) {
    console.error("Error updating user company data:", error);
    throw error;
  }
}

async function updateContactDetails(uad_key,country_code,old_phone_number,new_phone_number, ) 
{
  try {
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_UPDATE_USER_CONTACT_DETAILS(?, ?, ?,?)", [
        uad_key,
        country_code,
        old_phone_number,
        new_phone_number
      ]);

    // console.log("Results:", results[0][0]);
    return results[0][0];
  } catch (error) {
    console.error("Error updating details:", error);
    throw error;
  }
}
async function deleteUserAccount(uad_key,email,phone_number, ) 
{
  try {
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_DELETE_USER_ACCOUNT(?, ?, ?)", [
        uad_key,
        email,
        phone_number
      ]);

    // console.log("Results:", results[0][0]);
    return results[0][0];
  } catch (error) {
    console.error("Error updating details:", error);
    throw error;
  }
}

async function getUserCompanyData(uad_key)
{
  try {
    const results = await dbConn
      .promise()
      .query("CALL USP_KODIE_GET_USER_COMPANY_DATA(?)", [
        uad_key
      ]);
    //   const resultlogo = results.company_logo
    //   console.log(resultlogo);
    //  console.log("Results:", results[0][0]);
    return results[0][0];
  } catch (error) {
    console.error("Error getting details:", error);
    throw error;
  }
}

module.exports = { updateuserprofile ,addUserCompanyData,updateUsercompanyData,updateContactDetails,deleteUserAccount,getUserCompanyData};
