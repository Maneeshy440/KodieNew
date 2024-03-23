const { validationResult } = require('express-validator');
const dbConn = require('../../config/db.config').promise();
const bcrypt = require('bcryptjs'); // Import bcrypt library
const nodemailer = require('nodemailer'); // Make sure to install and configure this library
const CryptoJS = require("crypto-js"); 
const message = require('../common/message');
const server_key =require('../../FireBaseConfig.json');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
 
    try {
        // Generate OTP
        const generatedOTP = generateOTP(6);
        // Hash the password
        //const hashPass = await bcrypt.hash(req.body.password, 12);
 
        // Save signup details and get the user ID
        const userId = await callSaveSignupDetails(
            req,
            res,
            req.body.email,
            req.body.password,
            req.body.is_term_condition,
            req.body.is_privacy_policy,
            req.body.fcm_token ? req.body.fcm_token : null,
            generatedOTP
        );
       
        // console.log("signupDetails",userId.loginDetails)
       
        if (userId.signupDetails !== null) {
            console.log("aaaaa",userId.signupDetails)
            // Send OTP via email
           
             if (userId.signupDetails === -1)
             {
             const emailSentforVerification = await sendOTPEmail(req.body.email, generatedOTP);
               console.log("1212",emailSentforVerification)
               const messageDescription = await message.get_message_description("MSG_SIGNUP_URNV");
                return res.status(201).json({
                   // message: "User Exists But Not Verified Please Verify",
                    message: messageDescription,
                    User_Key:userId.loginDetails,
                    otp: generatedOTP,
                    code: 1,
                    success: true,
                    errors: false,
                });
             }
            else if (userId.signupDetails === 0 || userId.signupDetails === undefined){
                const messageDescription = await message.get_message_description("MSG_SIGNUP_IC");
                return res.status(201).json({
                    //message: "Invalid Credentials",
                    message: messageDescription,
                    code :0,
                    success: true,
                    errors: false,
                });
            }
            else if (userId.signupDetails === -2){
                const messageDescription = await message.get_message_description("MSG_SIGNUP_URE");
                return res.status(201).json({
                  //  message: "User Already .Please Login ",
                    message:messageDescription,
                    User_Key:userId.loginDetails,
                    code :2,
                    success: true,
                    errors: false,
                });
            }
   
            const emailSent = await sendOTPEmail(req.body.email, generatedOTP);
         
            console.log("aaaaabbbb",generatedOTP)
            console.log("server key",server_key.SERVER_KEY)
            if (emailSent) {
                 console.log("as",userId.signupDetails);
                 const messageDescription = await message.get_message_description("MSG_SIGNUP_USR");
                return res.status(201).json({
                   // message: "The user has been successfully registered, and an OTP has been sent to the registered email.",
                   message:messageDescription,
                   User_Key:userId.signupDetails,
                    otp: generatedOTP,
                    code :3,
                    fcm_token: req.body.fcm_token,
                    server_key: server_key.SERVER_KEY ,
                    success: true,
                    errors: false,
                });
            } else {
                return res.status(400).json({
                    message: "Failed to send OTP via email. Please try again later.",
                    code :4,
                    success: false,
                    errors: true,
                });
            }
        } else {
            return res.status(500).json({
                message: "Failed to register the user. Please try again later.",
                code : 5,
                success: false,
                errors: true,
            });
        }
    } catch (err) {
        next(err);
    }
};
 
// Function to call the SQL function and save signup details
async function callSaveSignupDetails(req,res,email, hashPass, isTermCondition, isPrivacyPolicy, fcm_token,otp) {
     
    const query = "SELECT UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST(?);";
    const [rows] = await dbConn.execute(query, [email]);
    const password = rows[0]["UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST(?)"];
    console.log(password, "pass");
    console.log(fcm_token,"token difjdjd fcm")
    if (password == 0)
    {
        try {
            const query = 'SELECT UFUN_KODIE_SAVE_SIGNUP_DETAILS_test_fcm(?,?,?,?,?,?);';
            const [rows] = await dbConn.execute(query, [req.body.email, req.body.password, isTermCondition, isPrivacyPolicy,fcm_token,otp]);
            console.log("rows",rows);
            if (rows.length > 0) {
                const result = {
                    signupDetails: rows[0]['UFUN_KODIE_SAVE_SIGNUP_DETAILS_test_fcm(?,?,?,?,?,?)']  
                  };
                  return result;
            } else {
                return null; // Failed to save signup details
            }
           
        } catch (error) {
            console.error('Error calling SQL function:', error);
            return null;
        }
    } 
    else{

    // const secretKey = "XkhZG4fW2t2W";
    
    // const decryptData = (password,secretKey) => {

    //     console.log("aa",password);
    //     try {
    //       const key = secretKey;
    //       const keyutf = CryptoJS.enc.Utf8.parse(key);
    //       const iv = CryptoJS.enc.Utf8.parse("XkhZG4fW2t2W"); // Use the same IV used during encryption
    //       const decrypted = CryptoJS.AES.decrypt(password, keyutf, { iv: iv });
    //       const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
      
    //       console.log("Decrypted Password:", decryptedStr);
    //       return decryptedStr;
    //     } catch (error) {
    //       console.error("Error:", error);
    //       throw error;
    //     }
    //   };
      



    //  const decryptedData = decryptData(password, secretKey);
   
    // console.log("Decrypted Data:", decryptedData);
    if(req.body.password === password)
    {
      
        try {
            const query = 'SELECT UFUN_KODIE_SAVE_SIGNUP_DETAILS_test_fcm(?,?,?,?,?,?);';
            const [rows] = await dbConn.execute(query, [email, password, isTermCondition, isPrivacyPolicy,fcm_token, otp]);
            console.log("rows",rows);

            const query1 = 'SELECT UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST_USER_KEY(?)';
            const [rows1] = await dbConn.execute(query1, [email]);
            console.log("rows",rows1);
            if (rows.length > 0) {
                // Assuming the SQL function returns the user ID, use it for further processing
                const result = {
                    signupDetails: rows[0]['UFUN_KODIE_SAVE_SIGNUP_DETAILS_test_fcm(?,?,?,?,?,?)'],
                    loginDetails: rows1[0]['UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST_USER_KEY(?)']
                  };
                  
                  return result;
               
            } else {
                return null; // Failed to save signup details
            }
           
        } catch (error) {
            console.error('Error calling SQL function:', error);
            return null;
        }
    }
    else{
        rows[0]['UFUN_KODIE_SAVE_SIGNUP_DETAILS_test_fcm(?,?,?,?,?,?)']= 0;
        console.log(rows[0]['UFUN_KODIE_SAVE_SIGNUP_DETAILS_test_fcm(?,?,?,?,?,?)'],"rqw");
        return rows[0]['UFUN_KODIE_SAVE_SIGNUP_DETAILS_test_fcm(?,?,?,?,?,?)'];
    }
    
}

}    

// Function to generate OTP
function generateOTP(length) {
    const charset = '0123456789'; // Define the character set for the OTP (numeric)
 
    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        otp += charset[randomIndex];
    }
 
    return otp;
}
 
// Function to send OTP via email
async function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: "maneesh.yadav@cylsys.com",
            pass: "Maneesh@06",
        },
    });
 
    const mailOptions = {
        from: 'maneesh.yadav@cylsys.com',
        to: email,
        subject: 'OTP for Registration',
        text: `Your OTP is: ${otp}` // Ensure that the OTP value is included here
    };
 
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}