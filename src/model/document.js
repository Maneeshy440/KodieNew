// Assuming dbConn is properly configured
const dbConn = require('../../config/db.config');

        // [p_account_id, p_file_Name, p_file_path,p_file_documents, p_referral_key, p_module_name, p_sub_module_name],
        exports.uploadDocument = function (p_account_id, p_file_Name, p_file_path, p_referral_key, p_module_name, p_sub_module_name, p_document_type,result) {
    dbConn.query(
        "CALL USP_KODIE_UPLOAD_DOCUMENT(?, ?, ?, ?, ?, ?, ?);",
        [p_account_id, p_file_Name, p_file_path, p_referral_key, p_module_name, p_sub_module_name, p_document_type],
        function (err, res) {
            if (err) {
                console.error(err);
                result(err, null);
            } else {
                result(null, res[0][0].result); 
            }
        }
    );
};


  exports.uploadDocumentDelete = function (fileId, result) {
    dbConn.query(
      "CALL USP_KODIE_DELETE_DOCUMENT(?)",
      fileId,
      function (err, res) {
        if (err) {
          result(null, err);
        } else {
          // Extract the message from the result
          console.log(res[0][0].message);
          const message = res[0][0].message;
          result(null, { message });
        }
      }
    );
  };




// module.exports = uploadDocument; 