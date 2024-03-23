var dbConn = require("../../config/db.config");

async function invite_contractor_details(lookupData) {
    
    const {
        User_USP_KEY,
        User_Account_UDP_KEY,
        UACP_IS_COMPANY,
        FIRST_NAME,
        LAST_NAME,
        ORGANISATION_NAME,
        CATEGORY_CONTRACTOR,
        CONTRACTOR_PROFESSION,
        EMAIL,
        PHONE_NUMBER,
        MOBILE_NUMBER,
        WEBSITE,
        NOTES
    } = lookupData;

    const invite_details = {
        User_USP_KEY,
        User_Account_UDP_KEY,
        UACP_IS_COMPANY,
        FIRST_NAME,
        LAST_NAME,
        ORGANISATION_NAME,
        CATEGORY_CONTRACTOR,
        CONTRACTOR_PROFESSION,
        EMAIL,
        PHONE_NUMBER,
        MOBILE_NUMBER,
        WEBSITE,
        NOTES
    };

    console.log(invite_details, "asasasasa");

    try {
        // Using placeholders (?) for parameterized query
        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_ADD_USER_CONTRACTOR_PROFILE(?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                User_USP_KEY,
                User_Account_UDP_KEY,
                UACP_IS_COMPANY,
                FIRST_NAME,
                LAST_NAME,
                ORGANISATION_NAME,
                CATEGORY_CONTRACTOR,
                CONTRACTOR_PROFESSION,
                EMAIL,
                PHONE_NUMBER,
                MOBILE_NUMBER,
                WEBSITE,
                NOTES
            ]);

       
        const out_property_id = results.insertId; 

       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}
async function invite_contractor_get_details(lookupData) {
    console.log(lookupData.User_USP_KEY);
    try {
       
        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_GET_CONTRACTOR_DETAILS(?)", [
                lookupData.User_USP_KEY,
            ]);

       console.log(results);
       return results;

       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}
// ==========================================
async function invite_contractor_get_details_id(lookupData) {
    console.log(lookupData.contractor_id);
    try {
       
        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_GET_CONTRACTOR_DETAILS_BY_CONTRACTOR_ID(?)", [
                lookupData.contractor_id,
            ]);

       console.log(results);
       return results;

       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}
// =========================================
async function invite_contractor_updatedetails(lookupData) {
   console.log(lookupData,"lookupdata");
    try {
        // Using placeholders (?) for parameterized query
        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_UPDATE_INVITE_CONTRACTOR_DETAILS(?,?,?,?,?,?,?,?,?,?,?)", [
               lookupData.CONTRACTOR_ID,
               lookupData.FIRST_NAME,
               lookupData.LAST_NAME,
               lookupData.ORGANISATION_NAME,
               lookupData.CATEGORY_CONTRACTOR,
               lookupData.CONTRACTOR_PROFESSION,
               lookupData.EMAIL,
               lookupData.PHONE_NUMBER,
               lookupData.MOBILE_NUMBER,
               lookupData.WEBSITE,
               lookupData.NOTES
            ]);
         
         return results;
       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}

async function invite_contractor_delete_details(lookupData) {
    
    console.log(lookupData.p_CONTRACTOR_ID,"id");
    try {

        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_INVITE_CONTRACTOR_DELETE(?)", [
                lookupData.p_CONTRACTOR_ID,
            ]);
           return results;
       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}

async function contractor_get_details_account_id(lookupData) {  
    console.log(lookupData.account_id);
    try {
       
        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_GET_CONTRACTOR_DETAILS_BY_ACCOUNT_ID(?)", [
                lookupData.account_id,
            ]);

       console.log(results);
       return results;

       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}

async function current_contractor_get_details_account_id() {  
    
    try {
       
        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_CURRENT_GET_ALL_CONTRACTOR_DEATILS()", []);

       console.log(results);
       return results;

       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}
async function previous_contractor_get_details_account_id() {  
    
    try {
       
        const [results] = await dbConn
            .promise()
            .query("CALL USP_KODIE_PREVIOUS_GET_ALL_CONTRACTOR_DEATILS()", []);

       console.log(results);
       return results;

       
    } catch (error) {
        console.error("Error adding contractor details:", error);
        throw error;
    }
}


module.exports={invite_contractor_get_details_id,previous_contractor_get_details_account_id,current_contractor_get_details_account_id,invite_contractor_details,contractor_get_details_account_id,invite_contractor_get_details,invite_contractor_updatedetails,invite_contractor_delete_details};