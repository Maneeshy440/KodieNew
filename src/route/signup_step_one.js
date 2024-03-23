const dbConn = require('../../config/db.config').promise();
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const server_key =require('../../FireBaseConfig.json');
const PORT = 5000;
exports.signup_step_one = async (req, res, next) => {
    let documents = req.file ? req.file.path : null;
    let document_type =req.file ? req.file.mimetype :null;
    let document_name =req.file ? req.file.originalname :null;

    console.log("name",document_name)
    
    try {
        
     const account_details ={
        user: req.body.user,
        email: req.body.email,
        profile_photo: document_name ,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        physical_address: req.body.physical_address,
        p_longitude: req.body.p_longitude,
        p_latitude: req.body.p_latitude,
        State: req.body.State,
        Country: req.body.Country,
        City: req.body.City,
        organisation_name: req.body.organisation_name,
        referral_code: req.body.referral_code,
        describe_yourself: req.body.describe_yourself,
        property_manage: req.body.property_manage,
        kodie_help: req.body.kodie_help
     }

     const property_details ={
        location: req.body.location,
        location_longitude: req.body.location_longitude,
        location_latitude: req.body.location_latitude,
        islocation: req.body.islocation,
        property_description: req.body.property_description,
        property_type: req.body.property_type,
        key_features: req.body.key_features,
        additional_features: req.body.additional_features,
        auto_list: req.body.auto_list,
        land_area: req.body.land_area,
        floor_size: req.body.floor_size,
        p_state: req.body.p_state,
        p_country: req.body.p_country,
        p_city: req.body.p_city
     }
     
        console.log("account_details",account_details);
       
        const { user} = req.body;
        console.log("device_id:", req.body.device_id);
        console.log("device_type:", req.body.device_type);
        console.log("User:", user);
        console.log("User:", user);
        console.log("Account Details:", account_details);
        console.log("Property Details:", property_details);
        const theToken = jwt.sign({ user_id: req.body.user }, process.env.SECRET_KEY, { expiresIn: '1h' });

        const [rows] = await dbConn.execute('CALL USP_KODIE_SAVE_ACCOUNT_DETAILS(?, ?)', [
            JSON.stringify(account_details),
            JSON.stringify(property_details),
        ]);
        const [fcm] = await dbConn.execute("CALL USP_KODIE_GET_FCM_TOKEN(?);",[req.body.user]);
        const [login_details] = await dbConn.execute('CALL USP_KODIE_SAVE_LOGIN_DETAILS(?,?,?,?,?,?)', [
             req.body.user,
             req.body.email,
             theToken,
             req.body.device_id,
             req.body.device_type,
             fcm[0][0].USI_FCM_TOKEN
        ]);

        console.log("Result:", rows[0][0].result);
        console.log("Result login", login_details);
        
       const image= processSavedFile(req,document_name);
       console.log(document_name,"aasasasa");

       const [row2] = await dbConn.execute(
        "CALL USP_KODIE_GET_ALL_PROFILE_DETAILS(?);",
        [req.body.user]
      );
     
       const protocol="https";
       const fileUrl = `${protocol}://${req.get('host')}/upload/photo/${document_name}`;
      console.log("fileUrl ",fileUrl);
       
        if (rows[0][0].result != null) {
            return res.status(201).json({
                status: true,
                error: false,
                Login_details:{
                    user_id: req.body.user,
                    user_account_id: rows[0][0].result,
                    email: req.body.email,
                    token: theToken,
                    profile_photo_path: fileUrl,
                    device_id: req.body.device_id,
                    device_type: req.body.device_type,
                    fcm_token: fcm[0][0].USI_FCM_TOKEN,
                    server_key: server_key.SERVER_KEY
                },
                Account_details: [row2[0][0]],
                message: "Data Successfully Stored"
               
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Unable to insert data.",
            });
        }
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
};

const processSavedFile = (req,filename) => {
    console.log(filename)
    const savedFilePath = path.join(__dirname, '../../upload/photo', filename);

    console.log("saved_file_path");
     console.log(savedFilePath);

    // Read file content asynchronously
    fs.readFile(savedFilePath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        console.log("File content:");
        // console.log(fileContent);
        return savedFilePath;
    });
};

