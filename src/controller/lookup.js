const express = require("express");
const lookup = require("../model/lookup");
const nodemailer = require("nodemailer");

const LookupController = {
  createLookup: async (req, res) => {
    const lookupData = req.body;
    // console.log(lookupData, "data");
    // console.log(lookupData.P_TYPE.length, "type");
    // console.log(lookupData.P_PARENT_CODE.length, "parent_code");
    if (
      lookupData.P_PARENT_CODE.length === 0 &&
      lookupData.P_TYPE.length === 0
    ) {
      res.status(201).json({
        status: false,
        error: true,
        message: "Both Fields are Required !!",
      });
    } else {
      try {
        const lookup_details_code = await lookup.lookup_details(lookupData);
        console.log(lookup_details_code, "lookup_details_code");

        if (lookup_details_code.length > 0 && lookup_details_code != null) {
          res.status(200).json({
            lookup_details: lookup_details_code,
            status: true,
            error: false,
            message: "Lookup Details Retrieved Successfully",
          });
        } else {
          res.status(402).json({
            message: "Lookup Code Miss Match ",
            status: false,
            error: true,
          });
        }
      } catch (error) {
        res.status(500).json({
          cause: error.message,
          message: "Something went wrong.Plz try again later ",
          status: false,
          error: true,
        });
      }
    }
  },

  key_features: async (req, res) => {
    const lookup_details_code = await lookup.get_key_features();
    console.log(lookup_details_code, "lookup_details_code");

    if (lookup_details_code.length > 0 && lookup_details_code != null) {
      res.status(201).json({
        key_features_details: lookup_details_code,
        message: "Fetch key_features Successfully",
        success: true,
        error: false,
      });
    } else {
      res
        .status(404)
        .json({ message: "Details Not Found", success: false, error: true });
    }
  },
  feedback_details: async (req, res) => {
    const lookup_details_code = await lookup.add_feedback_details(req.body);
    console.log(lookup_details_code[0][0].result, "lookup_details_code");

    if (lookup_details_code.length > 0 && lookup_details_code != null) {
      res.status(201).json({
        data: lookup_details_code[0][0].result,
        message: "Feedback added Successfully",
        success: true,
        error: false,
      });
    } else {
      res
        .status(404)
        .json({
          message: "FeedBack Not Submitted",
          success: false,
          error: true,
        });
    }
  },
  Contact_Us: async (req, res) => {
    try {
      const emailSentforVerification = await sendOTPEmail(
        req.body.email,
        req.body.message,
        req.body.device_information
      );
      console.log("emailsent", emailSentforVerification);
      res.status(201).json({
        message: "Email Sent Successfully",
        success: true,
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        cause: error.message,
        message: "Something went wrong.Plz try again later ",
        success: false,
        error: true,
      });
    }
  },
  Search_For_Rental: async (req, res) => {
    try {
      const lookup_details_code = await lookup.Search_For_Rental(req.body);
      console.log(lookup_details_code[0], "lookup_details_code");

      if (lookup_details_code.length > 0 && lookup_details_code != null) {
        res.status(201).json({
          data: lookup_details_code[0],
          success: true,
          error: false,
        });
      } else {
        res.status(500).json({ error: "Details Not Found", status: false });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
        error: true,
      });
    }
  },
  Profile_Completion: async (req, res) => {
    try {
      if(req.body.user_id.length ===0)
      {
        res.status(200).json({
          message: "user_id  is Required !!",
          status: true,
          error: false,
        });
      }
      else
      {
        const lookup_details_code = await lookup.Profile_Completion(req.body);
        console.log(lookup_details_code[0], "lookup_details_code");
  
        if (lookup_details_code.length > 0 && lookup_details_code != null) {
          res.status(201).json({
            data: lookup_details_code[0],
            status: true,
            error: false,
            message:"Profile Percentage"
          });
        } else {
          res.status(400).json({ error: "Details Not Found", status: false });
        }
      }
    
    } 
    catch (error) {
      res.status(500).json({
        cause: error.message,
        message: "Something went wrong.Plz try again later ",
        success: false,
        error: true,
      });
    }
  },
  Profile_Day: async (req, res) => {
    try{
      if(req.body.user_id.length ===0)
      {
        res.status(200).json({
          message: "user_id is Required !!",
          status: true,
          error: false,
        });
      }
      else
      {
        const lookup_details_code = await lookup.Profile_Day(req.body);
        console.log(lookup_details_code[0], "lookup_details_code");
    
        if (lookup_details_code.length > 0 && lookup_details_code != null) {
          res.status(201).json({
            data: lookup_details_code[0],
            status: true,
            error: false,
          });
        } else {
          res.status(400).json({ message: "No details Found", status: false ,error:true });
        }
      }
      }
      catch(error)
      {
        res.status(500).json({
          cause: error.message,
          message: "Something went wrong.Plz try again later ",
          success: false,
          error: true,
        });
      }
      
    
  },
  Subscription: async (req, res) => {
    const lookup_details_code = await lookup.Subscription(req.body);
    console.log(lookup_details_code[0][0].result, "lookup_details_code");

    if (lookup_details_code.length > 0 && lookup_details_code != null) {
      res.status(201).json({
        data: lookup_details_code[0][0].result,
        status: true,
        error: false,
      });
    } else {
      res.status(500).json({ error: "Details Not Found", status: false });
    }
  },
  get_Account_details: async (req, res) => {
   try{
    const lookup_details_code = await lookup.getAccount_details(
      req,
      req.params
    );
    console.log(lookup_details_code, "lookup_details_code");
    // console.log(lookup_details_code.length,"lookup_details_coderesult");
    if (lookup_details_code != null) {
      res.status(201).json({
        data: lookup_details_code[0],
        message:"Profile details fetch successfully ",
        success: true,
        error: false,
      });
    } else {
      res.status(200).json({
        message: "Data Not Found",
        success: false,
        error: true,
      });
    }
   }
   catch(error)
   {
    res.status(500).json({
      cause: error.message,
      message: "Something went wrong.Plz try again later ",
      success: false,
      error: true,
    });
   }
  },
};

async function sendOTPEmail(email, message, information) {
  console.log(email, "email");
  console.log(message, "msg");
  console.log(information, "information");
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
    from: "maneesh.yadav@cylsys.com",
    to: email,
    subject: "Helping And FeedBack Mail",
    text: `${message}${information ? ` and ${information}` : ""}`, // Ensure that the OTP value is included here
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
module.exports = LookupController;
