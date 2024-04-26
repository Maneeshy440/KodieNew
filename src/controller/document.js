const documentModel = require("../model/document");

// exports.uploadDocument = function (req, res) {
//     let documents = req.file ? req.file.path : null;

//     const { p_file_Name, p_file_path, p_referral_key, p_module_name, p_sub_module_name } = req.body;

//     documentModel.uploadDocument(
//         p_file_Name,
//         p_file_path,
//         p_referral_key,
//         p_module_name,
//         p_sub_module_name,
//         function (err, result) {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({
//                     status: false,
//                     error: true,
//                     message: "Internal Server Error",
//                 });
//             } else if (result === "Document Successfully Stored") {
//                 return res.status(200).json({
//                     success: true,
//                     error: false,
//                     message: "Document Successfully Stored",
//                 });
//             } else {
//                 return res.status(500).json({
//                     success: false,
//                     error: true,
//                     message: "Unexpected response from the server",
//                 });
//             }
//         }
//     );
// };


exports.uploadDocument = function (req, res) {
    let documents = req.file ? req.file.path : null;
let fileoriginalname=req.file ? req.file.originalname : null;
console.log("fileoriginalname",fileoriginalname);
    const { p_account_id, p_referral_key, p_module_name, p_sub_module_name, p_document_type } = req.body;

    const baseUrl = 'http://e3.cylsys.com/upload/documents';     

    const documentUrl = `${baseUrl}/${fileoriginalname}`;
  // console.log("htftfh",documentUrl);
    documentModel.uploadDocument(
        p_account_id, // Add the missing parameter if it's needed
        fileoriginalname,
        documents, // Use the correct variable name for the file path
        p_referral_key,
        p_module_name,
        p_sub_module_name,
        p_document_type,
        function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    status: false,
                    error: true,
                    message: "Internal Server Error",
                });
            } else if (result === "Document Successfully Stored") {
                return res.status(200).json({
                  data: documentUrl,
                    success: true,
                    error: false,
                    message: "Document Successfully Stored",
                });
            } else {
                return res.status(500).json({
                    success: false,
                    error: true,
                    message: "Unexpected response from the server",
                });
            }
        }
    );
};



exports.uploadDocumentDelete = function (req, res) {
    const fileId = req.body.fileId;
  
    // Check if fileId is provided
    if (!fileId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "File ID is required.",
      });
    }
  
    // Call the stored procedure for deletion
    documentModel.uploadDocumentDelete(fileId, function (err, resultMessage) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          error: true,
          message: "Internal server error. Please try again.",
        });
      }
  
      // Check if the resultMessage is not null or undefined
      if (resultMessage && resultMessage.message) {
        if (resultMessage.message.includes("successfully")) {
          return res.json({
            success: true,
            error: false,
            message: resultMessage.message,
          });
        } else {
            console.log("hi",resultMessage);

          return res.status(404).json({
            success: false,
            error: true,
            message: "Data does not exist with this ID or could not be deleted.",
          });
        }
      } else {
        return res.status(500).json({
          success: false,
          error: true,
          message: "Error in the deletion process. Please try again.",
        });
      }
    });
  };

