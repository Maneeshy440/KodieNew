const { validationResult } = require('express-validator');
const conn = require('../../config/db.config').promise();

exports.verify_otp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    // Call the SQL function UFUN_KODIE_VERIFIED_SIGNUP_DETAILS
    const [checkOTPRows] = await conn.query('SELECT UFUN_KODIE_VERIFIED_SIGNUP_DETAILS(?, ?) AS result', [req.body.email, req.body.otp]);

    const result = checkOTPRows[0].result;

    if (result === 1) {
      return res.status(200).json({
        success: true,
        message: "Email Sucessfully Verified.",
      });
    } else if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "OTP verification failed.",
      });
    } else if (result === -1) {
      return res.status(422).json({
        success: false,
        message: "OTP has expired.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An error occurred while verifying OTP.",
      });
    }
  } catch (err) {
    // Handle other errors
    next(err);
  }
}
