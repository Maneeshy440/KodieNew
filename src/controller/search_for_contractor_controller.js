const express = require("express");
const search_for_contractor_model = require("../model/search_for_contractor_model");


const search_for_contractor_controller ={
 
    getproperty_details_by_account_id : async(req,res) =>{
        const account_id = req.body.account_id;
        console.log("Property ID:", account_id);
        try {
          const property_details = await search_for_contractor_model.get_property_address_by_account_id(account_id);
            console.log("Property Details:", property_details);
            res.status(200).json({
              property_details,
              success: true,
              error:false,
              message: "Get Property Details"
            });
          } catch (error) { 
            console.error("Error getting property details:", error);
            res.status(500).json({
              message: "Error getting property details",
              status: false, 
              error: true
            });
          }

    },
    search_for_contractor : async(req,res) =>{
        const account_id = req.body;
        console.log("Property ID:", account_id);
        try {
          const property_details = await search_for_contractor_model.search_for_contractor(account_id);
            console.log("Property Details:", property_details);
            res.status(200).json({
              property_details,
              success: true,
              error:false,
              message: "Get Property Details"
            });
          } catch (error) { 
            console.error("Error getting property details:", error);
            res.status(500).json({
              message: "Error getting property details",
              status: false, 
              error: true
            });
          }

    },






}
module.exports=search_for_contractor_controller;