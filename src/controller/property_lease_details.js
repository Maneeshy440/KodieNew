const property_lease_details = require("../model/property_lease_details");

exports.property_lease_details = function (req, res) {
  const new_details = new property_lease_details(req.body);

  property_lease_details.create(new_details, function (err, details) {
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
      return res.status(409).json({
        success: false,
        error: true,
        message: "This email already exists in this form.",
      });
    } else {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Lease Details added successfully!",
      });
    }
  });
};


exports.create_rental_payment_log = function (req, res) {
  const new_details = new property_lease_details(req.body);

  property_lease_details.create_rental_payment_log(new_details, function (err, details) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        error: true,
        message: "Something went wrong. Please try again.",

      });
    }

    // console.log("deee ",details);
    // if (details[0][0].response === "fail")
    //   return res.json({
    //     success: false,
    //     error: true,
    //     message: "This email already exist in this Form ",
    //   });
    else
      return res.json({
        success: true,
        error: false,
        message: " Rantal Payment Details Added Successfully!",
      });
  });
}

// ==============================================lEASE DETAILS BY PROPERTY KEY=================================

exports.findAll = function (req, res) {
  const updKey = req.params.upd_key;

  // Call the model function to get lease details
  property_lease_details.findAll(updKey, function (err, details) {
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
        message: details[0][0].message || "No lease details found",
      });
    }

    if (!details || !details[0] || details[0].length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No lease details found",
      });
    }

    // Assuming the stored procedure returns the details in the first element of the result
    const leaseDetails = details[0];

    return res.status(200).json({
      data: leaseDetails,
      success: true,
      error: false,
      message: "Details fetched successfully!",
    });
  });
};

// ===============================================================================================

exports.find_PAYMENT_DETAILS = function (req, res) {
  const updKey = req.params.upd_key;

  // Call the model function to get lease details
  property_lease_details.find_PAYMENT_DETAILS(updKey, function (err, details) {
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
        message: details[0][0].message || "No lease details found",
      });
    }

    if (!details || !details[0] || details[0].length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No lease details found",
      });
    }

    // Assuming the stored procedure returns the details in the first element of the result
    const leaseDetails = details[0];

    return res.status(200).json({
      data: leaseDetails,
      success: true,
      error: false,
      message: "Details fetched successfully!",
    });
  });
};

// ======================================================lEASE DETAILS BY LEASE KEY=====================================

exports.findAllleaseDetails = function (req, res) {
  const leaseKey = req.params.lease_key;

  // Call the model function to get lease details
  property_lease_details.findAllleaseDetails(leaseKey, function (err, details) {
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
        message: details[0][0].message || "No lease details found",
      });
    }

    if (!details || !details[0] || details[0].length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No lease details found",
      });
    }

    // Assuming the stored procedure returns the details in the first element of the result
    const leaseDetails = details[0][0];

    return res.status(200).json({
      data: leaseDetails,
      success: true,
      error: false,
      message: "Details fetched successfully!",
    });
  });
};