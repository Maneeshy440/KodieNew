const express=require('express');
const notices_reminder_model =require('../model/notices_reminder_model');


const notices_reminder_controller ={
    insert_create_new_notices_reminder: async(req,res)=>{
    const lookupData =req.body;
    const file_name = req.file ? req.file.originalname : null;
    const file_type = req.file ? req.file.mimetype : null;
    
   
    const lookup_details_code = await notices_reminder_model.create_insert_reminder_notices(lookupData,file_name,file_type);
    console.log(lookup_details_code.result,"lookup_details_code");
   
   if (lookup_details_code.result == "success")
   {
    res.status(201).json({
      message:lookup_details_code.result,
      status: true,
      error:false
   })
 
    }
   else{
  res.status(500).json({ error: 'error' ,status: false,error:true});
   }
    },
    get_new_notices_reminder: async(req,res)=>{
      const lookupData =req.body;
      const lookup_details_code = await notices_reminder_model.get_insert_reminder_notices_by_notices_id(lookupData,req);
      console.log(lookup_details_code,"lookup_details_code");
     
     if (lookup_details_code[0] !== null)
     {
      res.status(201).json({
        data:lookup_details_code[0],
        status: true,
        error:false
     })
   
      }
     else{
    res.status(500).json({ error: 'error' ,status: false,error:true});
     }
    },
    updated_create_new_notices_reminder: async(req,res)=>{
      const lookupData =req.body;
      const file_name = req.file ? req.file.originalname : null;
      const file_type = req.file ? req.file.mimetype : null;
      
     
      const lookup_details_code = await notices_reminder_model.update_insert_reminder_notices(lookupData,file_name,file_type);
      console.log(lookup_details_code.result,"lookup_details_code");
     
     if (lookup_details_code.result !== null)
     {
      res.status(201).json({
        message:lookup_details_code.result,
        status: true,
        error:false
     })
   
      }
     else{
    res.status(500).json({ error: 'error' ,status: false,error:true});
     }
    },
    deleted_new_notices_reminder: async(req,res)=>{
        const lookupData =req.body;
        const lookup_details_code = await notices_reminder_model.delete_insert_reminder_notices_by_notices_id(lookupData);
        console.log(lookup_details_code,"lookup_details_code");
       
       if (lookup_details_code[0] !== null)
       {
        res.status(201).json({
          data:lookup_details_code.result,
          status: true,
          error:false
       })
     
        }
       else{
      res.status(500).json({ error: 'error' ,status: false,error:true});
       }
    }
    ,
    getdetails_by_account__details_notices_reminder: async(req,res)=>{
        const lookupData =req.body;
        const lookup_details_code = await notices_reminder_model.get_account_details_notices_reminder(lookupData);
        // console.log(lookup_details_code,"lookup_details_code");
       
       if (lookup_details_code[0] !== null)
       {
        res.status(201).json({
          data:lookup_details_code,
          status: true,
          error:false
       })
     
        }
       else{
      res.status(500).json({ error: 'error' ,status: false,error:true});
       }
    }

}
module.exports=notices_reminder_controller;