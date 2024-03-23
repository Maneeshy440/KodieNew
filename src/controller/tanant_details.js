const tanant_details = require("../model/tanant_details");

exports.tanant_details = function (req, res) {
  const new_details = new tanant_details(req.body);

  tanant_details.create(new_details, function (err, details) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        error: true,
        message: "Something went wrong. Please try again.",

      });
    }

    console.log("deee ",details);
    if (details[0][0].response === "fail")
      return res.json({
        success: false,
        error: true,
        message: "This email already exist in this Form ",
      });
    else
      return res.json({
        data: new_details,
        success: true,
        error: false,
        message: "Details Added Successfully!",
      });
  });
}



exports.create_tenant_company = function (req, res) {
  const new_details = new tanant_details(req.body);

  tanant_details.create_tenant_company(new_details, function (err, details) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        error: true,
        message: "Something went wrong. Please try again.",

      });
    }

    console.log("deee ",details);
    if (details[0][0].response === "fail")
      return res.json({
        success: false,
        error: true,
        message: "This email already exist in this Form ",
      });
    else
      return res.json({
        data: new_details,
        success: true,
        error: false,
        message: "Details Added Successfully!",
      });
  });
}


exports.findAll = function (req, res) {
  tanant_details.findAll(function (err, details) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        error: true,
        message: "Something went wrong. Please try again.",

      });
    }
   
    else
      return res.json({
        data: details[0],
        success: true,
        error: false,
        message: "details fetched successfully!",
      });
  });
};

//=================================================================

exports.findtenant_manually_by_upd = function (req, res) {
  const upd_key_param = req.params.upd_key_param;

  if (!upd_key_param || isNaN(upd_key_param)) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Invalid upd_key_param. Please provide a valid numeric value.",
    });
  }

  tanant_details.findtenant_manually_by_upd(upd_key_param, function (err, details) {
    if (err) {
      console.error(err);

      if (err.code === 'DatabaseError') {
        return res.status(500).json({
          success: false,
          error: true,
          message: "Internal Server Error",
          details: err.error,
        });
      } else if (err.code === 'NoDataFound') {
        return res.status(404).json({
          success: false,
          error: true,
          message: "No tenant details found",
        });
      } else {
        // Handle other errors if needed
        return res.status(500).json({
          success: false,
          error: true,
          message: "Unexpected error",
        });
      }
    }

    return res.json({
      data: details,
      success: true,
      error: false,
      message: "Details fetched successfully!",
    });
  });
};

//================================================================

exports.findAllTenant_Manually = function (req, res) {
  tanant_details.findAllTenant_Manually(function (err, details) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        error: true,
        message: "Something went wrong. Please try again.",

      });
    }
   
    else
      return res.json({
        data: details[0],
        success: true,
        error: false,
        message: "details fetched successfully!",
      });
  });
};


exports.findAlldocument = function (req, res) {
  const fileReferenceKey = req.params.fileReferenceKey;

  

  tanant_details.findAlldocument(fileReferenceKey, function (err, details) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Internal Server Error",
      });
    }

    if (!details || details.length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No document details found",
      });
    }

     const aa=details[0].length;
   console.log(aa,"aa");

   for(let i=0;i<details[0].length;i++)
   {
    console.log("i",i);
    let imageFileNames =details[0][i].PDUM_FILE_NAME;
    console.log(imageFileNames,"asasasas")
    const protocol = "https"
   const basePath = `${protocol}://${req.get('host')}/upload/documents/${imageFileNames}`; 
   
   details[0][i].PDUM_FILE_PATH=basePath;

    console.log("Image Paths:",basePath);
   }

    return res.status(200).json({
      data: details[0],
      success: true,
      error: false,
      message: "Details fetched successfully!",
    });
  });
};



exports.finddocument = function (req, res) {
  const Module_Name = req.body.Module_Name;
  const fileReferenceKey = req.body.fileReferenceKey
  console.log("jhvsad",Module_Name);
  tanant_details.finddocument(Module_Name,fileReferenceKey, function (err, details) {

    if (err && err.code === 'InvalidModuleName') {
      return res.status(400).json({
        success: false,
        error: true,
        message: err.message,
      });
    }
    
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Internal Server Error",
      });
    }

    if (!details || details.length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No document details found",
      });
    }

     const aa=details[0].length;
   console.log(aa,"aa");

   for(let i=0;i<details[0].length;i++)
   {
    console.log("i",i);
    let imageFileNames =details[0][i].PDUM_FILE_NAME;
    console.log(imageFileNames,"asasasas")
    const protocol = "https"
   const basePath = `${protocol}://${req.get('host')}/upload/documents/${imageFileNames}`; 
   
   details[0][i].PDUM_FILE_PATH=basePath;

    console.log("Image Paths:",basePath);
   }

    return res.status(200).json({
      data: details[0],
      success: true,
      error: false,
      message: "Details fetched successfully!",
    });
  });
};
