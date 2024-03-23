const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dbConn = require("../../config/db.config").promise();
const CryptoJS = require("crypto-js");
const server_key =require('../../FireBaseConfig.json');
// const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    console.log("req.body.email:", req.body.email);
    console.log("req.body.password", req.body.password);
    console.log("email", req.body.email);

    const query2 = "CALL USP_KODIE_CHECK_ACCOUNT_ACTIVATION(?);";
    const [rows2] = await dbConn.execute(query2, [req.body.email]);
    console.log(rows2[0][0].result,"resdsdsdsd");


    if(rows2[0][0].result === 1)
    {
      return res.status(200).json({
        message: "Account Has Been Susupended",
        success: "true",
        errors: "false",
      });

    }  


    const query = "SELECT UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST(?);";
    const [rows] = await dbConn.execute(query, [req.body.email]);
    const password = rows[0]["UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST(?)"];
    console.log(password, "pass");
 
    const secretKey = "XkhZG4fW2t2W";
 
    const decryptData = (password,secretKey) => {
 
      console.log("aa",password);
      try {
        const key = secretKey;
        const keyutf = CryptoJS.enc.Utf8.parse(key);
        const iv = CryptoJS.enc.Utf8.parse("XkhZG4fW2t2W"); 
        const decrypted = CryptoJS.AES.decrypt(password, keyutf, { iv: iv });
        const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
   
        console.log("Decrypted Password:", decryptedStr);
        return decryptedStr;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    };
    const decryptedData = decryptData(password, secretKey);
    console.log("Decrypted Data:", decryptedData);
    console.log(decryptedData.length);
    if (req.body.password === decryptedData) {
      console.log("login");
      const query1 = "SELECT UFUN_KODIE_VALIDATE_LOGIN_DETAILS(?,?);";
      const [rows1] = await dbConn.execute(query1, [req.body.email, password]);
 
 
      const query2 = 'SELECT UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST_USER_KEY(?)';
      const [rows4] = await dbConn.execute(query2, [req.body.email]);
      console.log("rows4",rows4);
      const result4= rows4[0]["UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST_USER_KEY(?)"];
      console.log(result4,"asas");
     
     
      const result = rows1[0]["UFUN_KODIE_VALIDATE_LOGIN_DETAILS(?,?)"];
      console.log("res", result4);
      const theToken = jwt.sign({ user_id: result4 }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log("dszfsd", result4);
      console.log("dszfsd", req.body.email);
      console.log("req.body.device_id", req.body.device_id);
      console.log("req.body.device_os_type", req.body.device_os_type);
 
      const [fcm] = await dbConn.execute("CALL USP_KODIE_GET_FCM_TOKEN(?);",[result4]);
      console.log([fcm],"resuuliuliiu");
      console.log(fcm[0][0].USI_FCM_TOKEN == "undefined" ? null :fcm[0][0].USI_FCM_TOKEN,"fcm response");
 
      if (fcm[0][0].USI_FCM_TOKEN !== req.body.fcm_token) {
        console.log("Updating FCM token");
        const [update_fcm] = await dbConn.execute("CALL USP_KODIE_UPDATE_FCM_TOKEN(?, ?);", [result, req.body.fcm_token]);
        console.log(update_fcm,"updatefcmtoken");
        fcm[0][0].USI_FCM_TOKEN=update_fcm[0][0].result
      }
      const [row1] = await dbConn.execute(
        "CALL USP_KODIE_SAVE_LOGIN_DETAILS_fcm(?, ?, ?, ?,?,?);",
        [
          result,
          req.body.email,
          theToken,
          req.body.device_id,
          req.body.device_os_type,
          fcm[0][0].USI_FCM_TOKEN
        ]
      );
      console.log(row1[0][0],"asasasasajsnsfdprofile")
      const [row2] = await dbConn.execute(
        "CALL USP_KODIE_GET_ALL_PROFILE_DETAILS(?);",
        [result]
      );
     
      const protocol ="https";
      const fileUrl = row1[0] && row1[0][0] && row1[0][0].UAD_PROFILE_PHOTO_PATH
      ? `${protocol}://${req.get('host')}/upload/photo/${row1[0][0].UAD_PROFILE_PHOTO_PATH}`
      : null;
   
     
      console.log(protocol,"pspsps");
     
      const uadKey = row2[0] && row2[0][0] && row2[0][0].UAD_KEY !== undefined ? row2[0][0].UAD_KEY : null;
      console.log("fileUrl ",fileUrl);
     
      console.log(uadKey,"asasasasa");
      console.log("key",)
      if(uadKey ===null)
      {
        return res.status(200).json({
          message: "Please Complete Signup Process",
          User_Key: result4,
          code:6,
          success: "true",
          errors: "false",
        });
 
      }
     
      else{
      return res.status(200).json({
        message: "User Login Successfully",
        Login_details: {
          user_id: result,
          user_account_id: uadKey,
          email: req.body.email,
          token: theToken,
          profile_photo_path: fileUrl,
          device_id: req.body.device_id,
          device_os_type: req.body.device_os_type,
          fcm_token: fcm[0][0].USI_FCM_TOKEN,
          server_key: server_key.SERVER_KEY
        },
 
        Account_details: [row2[0][0]],
        success: "true",
        errors: "false",
      });
    }
 
    } else {
        return res.status(401).json({
            message: "User Unauthorized",
            success: "false",
            errors: "true",
          });
    }
 
 
  } catch (err) {
    next(err);
  }
};