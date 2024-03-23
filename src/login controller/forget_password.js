const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../../config/db.config').promise();
const express = require("express");
const app = express();
app.use(express.json());
const CryptoJS = require("crypto-js");

exports.forget_password = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        console.log(req.body.email  ,"email");
        const query = "SELECT UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST(?);";
        const [rows] = await conn.execute(query, [req.body.email]);
        const password = rows[0]["UFUN_KODIE_VALIDATE_LOGIN_DETAILS_TEST(?)"];
        console.log(password, "pass");

        // const secretKey = "XkhZG4fW2t2W";
        // console.log(password, "pass12");
      
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
        //   const decryptedData = decryptData(password, secretKey);
        // console.log("Decrypted Data:", decryptedData);

       if(req.body.password === password)
       {
        return res.status(201).json({
            success: true,
            error:false,
            message: "Try again with a password you haven’t used before",
        });
       }

       else{
        const [resultRows] = await conn.execute('SELECT UFUN_KODIE_FORGET_UPDATE_NEW_PASSWORD_DETAILS(?, ?) AS result', [req.body.email, req.body.password]);

        const result = resultRows[0].result;

        if (result === 1) {
            return res.status(201).json({
                success: true,
                message: "Password reset successfully.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password not reset.",
            });
        }
    }
    } catch (err) {
        // Handle other errors
        next(err);
    }
    
}
