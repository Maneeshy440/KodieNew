const router = require("express").Router();
const documentController = require("../controller/document");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const DIR = path.join(__dirname, "../../upload/documents");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadDocument", upload.single("documents"), documentController.uploadDocument);

router.patch("/deletedocument", documentController.uploadDocumentDelete); // Corrected the route name to "deletedocument"

// router.get('/download', function (req, res, next) {
//     var filename = req.query.filename;
//     var fileLocation = path.join(BASE_DIR, filename);
  
//     console.log("filename:", filename);
//     console.log("fileLocation:", fileLocation);
  
//     res.download(fileLocation, filename, function (err) {
//       if (err) {
//         console.error("Download error:", err);
//         return res.status(500).json({
//           success: false,
//           error: true,
//           message: "Error while downloading the document",
//         });
//       }
//     });
//   });
  /////////////////////////////////////////////////////////////////
// router.post("/download", function (req, res, next) {

//   const file = req.body.filename;

//   const fileLocation = path.join(DIR, file);

//   const filename = path.basename(fileLocation);

//   console.log(filename);

//   console.log(fileLocation);
 
//   // Set the appropriate response headers for file download

//   res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

//   res.setHeader('Content-Type', 'application/octet-stream'); // Set the correct Content-Type (e.g., 'application/pdf' for PDF files)
 
//   // Use res.download() to serve the file as an attachment

//   res.download(fileLocation, filename, function (err) {

//     if (err) {

//       // Handle any errors that occur during the download

//       console.error("Error sending file:", err);

//       res.status(500).send("Error sending the file.");

//     }

//   });

// });


router.post('/downloadImage', function (req, res, next) {
    var file = req.body.filename;
// //     var fileLocation = path.join(__dirname, '../upload/documents/') + '' + file;
// //     console.log(fileLocation);
// //     res.sendFile(fileLocation);

// // });

var fileLocation = path.join(__dirname, '../../upload/documents', file);
    console.log(fileLocation);

// Check if the file exists
if (fs.existsSync(fileLocation)) {
  // File exists, send it
  res.sendFile(fileLocation);
} else {
  // File does not exist, handle the error
  console.error('File not found:', fileLocation);
  res.status(404).json({
    success: false,
    error: true,
    message: 'File not found',
  });
}
});
    
module.exports = router;
