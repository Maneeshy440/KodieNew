const property_expenses_details = require("../model/property_expenses_details");

exports.property_expenses_details = function (req, res) {
  const new_details = new property_expenses_details(req.body);

  property_expenses_details.create(new_details, function (err, details) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        error: true,
        message: "Failed to insert expense details. Please try again.",
      });
    }
 else {
      return res.json({
        // data: details[0],
        success: true,
        error: false,
        message: "Expense Details added successfully!",
      });
    }
  });
};


// const property_expenses_details = require("../model/property_expenses_details");

// exports.property_expenses_details = function (req, res) {
//   // Create a new instance of the property_expenses_details model
//   const new_details = new property_expenses_details(req.body);

//   // Use the create method to insert the new details
//   property_expenses_details.create(new_details, function (err, details) {
//     if (err) {
//       // Log the error for debugging purposes
//       console.error(err);

//       // Check if the error is a custom error message from the stored procedure
//       if (details && details[0] && details[0][0] && details[0][0].message) {
//         return res.status(400).json({
//           success: false,
//           error: true,
//           message: details[0][0].message,
//         });
//       } else {
//         // Handle other types of errors
//         return res.status(400).json({
//           success: false,
//           error: true,
//           message: "Failed to insert expense details. Please try again.",
//         });
//       }
//     }

//     // Check if details are present and respond accordingly
//     if (details && details[0]) {
//       return res.json({
//         data: details[0],
//         success: true,
//         error: false,
//         message: "Expense Details added successfully!",
//       });
//     } else {
//       // Handle unexpected scenarios
//       return res.status(500).json({
//         success: false,
//         error: true,
//         message: "Unexpected response from the database. Please try again.",
//       });
//     }
//   });
// };



exports.findAll = function (req, res) {
  const updKey = req.params.upd_key;

  // Call the model function to get lease details
  property_expenses_details.findAll(updKey, function (err, details) {
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
        message: details[0][0].message || "No expense details found",
      });
    }

    if (!details || !details[0] || details[0].length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No expense details found",
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



exports.findAllExpensesDetails = function (req, res) {
  const Expenseskey = req.params.Expenses_key;

  // Call the model function to get lease details
  property_expenses_details.findAllExpensesDetails(Expenseskey, function (err, details) {
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
        message: details[0][0].message || "No expense details found",
      });
    }

    if (!details || !details[0] || details[0].length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No expense details found",
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