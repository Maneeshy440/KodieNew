var dbConn = require("../../config/db.config");


async function create_insert_reminder_notices(lookupData, file_name, file_type) {
  try {
    console.log("notices_body11", lookupData);
    console.log("notices_body11", lookupData.account_id);
    console.log("notices_body11", lookupData.notice_type);
    console.log("notices_body11", lookupData.notice_repeat);
    console.log("notices_body11", lookupData.notice_to_date);
    console.log("file_name11", file_name);
    console.log("file_type11", file_type);

    const [results] = await dbConn.promise().query('CALL USP_KODIE_CREATE_NOTICES_REMAINDER(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        lookupData.account_id,
        lookupData.notice_type,
        lookupData.notice_title,
        lookupData.notice_repeat,
        lookupData.notice_notifications,
        lookupData.notice_from_date,
        lookupData.notice_from_time,
        lookupData.notice_to_date,
        lookupData.notice_to_time,
        lookupData.guests,
        lookupData.location,
        lookupData.longitude,
        lookupData.latitude,
        lookupData.notification,
        lookupData.notification_type,
        lookupData.custom,
        lookupData.notes,
        file_name,
        file_type,
      ]);

    console.log("lookup Details Results:", results[0][0]);

    return results[0][0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}
async function get_insert_reminder_notices_by_notices_id(lookupData,req) {
  
  try {
    console.log("notices_body11", lookupData);
    console.log(req,"req")
    const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_NOTICES_AND_REMINDER_BY_NOTICES_ID(?)',
      [
        lookupData.notices_reminder_id
      ]);
      
    console.log("lookup Details Results:", results[0]);
    console.log("lookup Details file_name:", results[0][0].file_name);
    
    const imageFileNames = results[0][0].file_name;

    console.log("Image File Names:", imageFileNames);
    const protocol ="https";
    const basePath = `${protocol}://${req.get("host")}/upload/photo/${imageFileNames}`;
    console.log("basePath",basePath);

   results[0][0].image_path=basePath;
    return results[0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}
async function update_insert_reminder_notices(lookupData, file_name, file_type) {
  try {
    console.log("notices_body11", lookupData);
    console.log("notices_body11", lookupData.notices_reminder_id);
    console.log("file_name11", file_name);
    console.log("file_type11", file_type);

    const [results] = await dbConn.promise().query('CALL USP_KODIE_UPDATE_NOTICES_REMINDER(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        lookupData.notices_reminder_id,
        lookupData.notice_type,
        lookupData.notice_title,
        lookupData.notice_repeat,
        lookupData.notice_notifications,
        lookupData.notice_from_date,
        lookupData.notice_from_time,
        lookupData.notice_to_date,
        lookupData.notice_to_time,
        lookupData.guests,
        lookupData.location,
        lookupData.longitude,
        lookupData.latitude,
        lookupData.notification,
        lookupData.notification_type,
        lookupData.custom,
        lookupData.notes,
        file_name,
        file_type,
      ]);

    console.log("lookup Details Results:", results[0][0]);

    return results[0][0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}
async function delete_insert_reminder_notices_by_notices_id(lookupData, file_name, file_type) {
  try {
    console.log("notices_body11", lookupData);
    const [results] = await dbConn.promise().query('CALL USP_KODIE_DELETE_NOTICES_REMINDER(?)',
      [
        lookupData.notices_reminder_id
      ]);
    console.log("lookup Details Results:", results[0]);
    return results[0][0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}

async function get_account_details_notices_reminder(lookupData) {
  try {
    console.log("notices_body11", lookupData);
    const [results] = await dbConn.promise().query('CALL USP_KODIE_GET_DETAILS_BY_ACC_FILTER_DATA(?,?,?,?,?,?)',
      [
        lookupData.notices_filter,
        lookupData.account_id,
        lookupData.limit,
        lookupData.order_wise,
        lookupData.months,
        lookupData.year
      ]);
    // console.log("lookup Details Results:", results[0]);
    return results[0];
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
}

module.exports={get_account_details_notices_reminder,create_insert_reminder_notices,get_insert_reminder_notices_by_notices_id,update_insert_reminder_notices,delete_insert_reminder_notices_by_notices_id}