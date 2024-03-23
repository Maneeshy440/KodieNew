const add_tenant_questionarie = require("../model/add_tenant_questionarie");

exports.add_tenant_questionarie = function (req, res) {
  const new_details = new add_tenant_questionarie(req.body);

  add_tenant_questionarie.create(new_details, function (err, details) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        error: true,
        message: "Something went wrong. Please try again.",
      });
    }

    console.log("deee ", details);

    if (details && details[0] && details[0][0] && details[0][0].response === "fail") {
      return res.json({
        success: false,
        error: true,
        message: "This email already exists in this form.",
      });
    } else {
      return res.json({
        data: new_details,
        success: true,
        error: false,
        message: "Details added successfully!",
      });
    }
  });
};

// =========================================================================================================


exports.findAll = function (req, res) {
  const uadkey = req.params.uad_key;

  // Call the model function to get lease details
  add_tenant_questionarie.findAll(uadkey, function (err, details) {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Internal Server Error",
      });
    }

    if (details && details[0] && details[0][0] && details[0][0].status === 'fail') {
      // Handle the case where the stored procedure returns a 'fail' status
      return res.status(404).json({
        success: false,
        error: true,
        message: details[0][0].message || "No  details found",
      });
    }

    if (!details || !details[0] || details[0].length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No details found",
      });
    }

    // Assuming the stored procedure returns the details in the first element of the result
    const TenantDetails = details[0];

    return res.status(200).json({
      data: TenantDetails,
      success: true,
      error: false,
      message: "Details fetched successfully!",
    });
  });
};
