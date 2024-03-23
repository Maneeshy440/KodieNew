const express =require('express');
const lookup = require('../model/lookup')
const nodemailer = require('nodemailer');

const LookupController ={

createLookup: async(req, res) => {
    const lookupData =req.body;
    console.log(lookupData,"data");
    console.log(lookupData.P_TYPE,"type");
    console.log(lookupData.P_PARENT_CODE,"parent_code");
    
    const lookup_details_code = await lookup.lookup_details(lookupData);
    console.log(lookup_details_code,"lookup_details_code");
   
   if (lookup_details_code.length> 0 && lookup_details_code != null)
   {
    res.status(201).json({
      lookup_details:lookup_details_code,
      status: true
   })
 
}
else{
  res.status(500).json({ error: 'Details Not Found' ,status: false});
}
  
}
,
 key_features: async(req, res) => {
 
  const lookup_details_code = await lookup.get_key_features();
  console.log(lookup_details_code,"lookup_details_code");
 
 if (lookup_details_code.length> 0 && lookup_details_code != null)
 {
  res.status(201).json({
    key_features_details:lookup_details_code,
    status: true
 })

}
else{
res.status(500).json({ error: 'Details Not Found' ,status: false});
}

},
feedback_details: async(req, res) => {
          
  const lookup_details_code = await lookup.add_feedback_details(req.body);
  console.log(lookup_details_code[0][0].result,"lookup_details_code");
 
 if (lookup_details_code.length> 0 && lookup_details_code != null)
 {
  res.status(201).json({
    message:lookup_details_code[0][0].result,
    status: true,
    error:false
 })

}
else{
res.status(500).json({ error: 'Details Not Found' ,status: false});
}

},
Contact_Us: async(req, res) => {
          
  const emailSentforVerification = await sendOTPEmail(req.body.email,req.body.message,req.body.device_information); 
  console.log("emailsent",emailSentforVerification);
  res.status(201).json({
    message:"Email Sended Successfully",
    status: true,
    error:false
 })

  },
  Search_For_Rental: async(req, res) => {
    const lookup_details_code = await lookup.Search_For_Rental(req.body);
    console.log(lookup_details_code[0],"lookup_details_code");
   
   if (lookup_details_code.length> 0 && lookup_details_code != null)
   {
    res.status(201).json({
      data:lookup_details_code[0],
      status: true,
      error:false
   })
  
  }
  else{
  res.status(500).json({ error: 'Details Not Found' ,status: false});
  }   
   
  },
  Profile_Completion: async(req, res) => {
    const lookup_details_code = await lookup.Profile_Completion(req.body);
    console.log(lookup_details_code[0],"lookup_details_code");
   
   if (lookup_details_code.length> 0 && lookup_details_code != null)
   {
    res.status(201).json({
      data:lookup_details_code[0],
      status: true,
      error:false
   })
  
  }
  else{
  res.status(500).json({ error: 'Details Not Found' ,status: false});
  }   
   
  },
  Profile_Day: async(req, res) => {
    const lookup_details_code = await lookup.Profile_Day(req.body);
    console.log(lookup_details_code[0],"lookup_details_code");
   
   if (lookup_details_code.length> 0 && lookup_details_code != null)
   {
    res.status(201).json({
      data:lookup_details_code[0],
      status: true,
      error:false
   })
  
  }
  else{
  res.status(500).json({ error: 'Details Not Found' ,status: false});
  }   
   
  },
  Subscription: async(req, res) => {
    const lookup_details_code = await lookup.Subscription(req.body);
    console.log(lookup_details_code[0][0].result,"lookup_details_code");
   
   if (lookup_details_code.length> 0 && lookup_details_code != null)
   {
    res.status(201).json({
      data:lookup_details_code[0][0].result,
      status: true,
      error:false
   })
  
  }
  else{
  res.status(500).json({ error: 'Details Not Found' ,status: false});
  }   
  },

  get_Account_details: async(req, res) => {
    const lookup_details_code = await lookup.getAccount_details(req,req.params);
    if(lookup_details_code != null)
    {
      res.status(201).json({
        data:lookup_details_code[0],
        message:"Data retrieved successfully",
        status: true,
        error:false
     })
    }
    else{
      res.status(500).json({
        message:"Data Not Found",
        status: false,
        error:true
     })
    }
  },
}

async function sendOTPEmail(email,message,information) {
  console.log(email,"email");
  console.log(message,"msg");
  console.log(information,"information");
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
      subject: 'Helping And FeedBack Mail',
      text: `${message}${information ? ` and ${information}` : ''}` // Ensure that the OTP value is included here
  };

  try {
      await transporter.sendMail(mailOptions);
      return true;
  } catch (error) {
      console.error(error);
      return false;
  }
}
module.exports =LookupController;     