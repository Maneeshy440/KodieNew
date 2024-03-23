const express = require("express");
const contractor = require('../model/contractor');

const contractor_controller = {
    inviteadd_contractor_details: async (req, res) => {
        const lookupData = req.body;
        const lookup_details_code = await contractor.invite_contractor_details(
          lookupData
        );
        
    
        if (
          lookup_details_code === 0 &&
          lookup_details_code !== null
        ) {
          res.status(500).json({ message: "Details Not Found", success: false,error: true });
        } else {
          res.status(200).json({
            success: true,
            error: false,
            message: "Invite Contractor Successfully"
          });
        }
      },
      invite_get_contractor_details: async (req, res) => {
        const lookupData = req.body;
        const lookup_details_code = await contractor.invite_contractor_get_details(
          lookupData
        );
        console.log(lookup_details_code[0][0],"data");
        if(lookup_details_code !== null )
        {
          res.status(200).json({
            data:lookup_details_code[0],
            success: true,
            error: false,
            message: "Get Contractor Details Successfully"
          });
        }
        else{
          res.status(500).json({ message: "Details Not Found", success: false,error: true });
        }
    
      
      },
      inviteupdate_contractor_details: async (req, res) => {
        const lookupData = req.body;
        const lookup_details_code = await contractor.invite_contractor_updatedetails(
          lookupData
        );
        console.log(lookup_details_code[0],"data");
    
        if (
          lookup_details_code[0].length === 0 &&
          lookup_details_code[0] !== null
        ) {
          res.status(500).json({ message: "Details Not Found", success: false,error: true });
        } else {
          res.status(200).json({
            success: true,
            error: false,
            message: "Updated Contractor Details Successfully"
          });
        }
      },
      invite_delete_contractor_details: async (req, res) => {
        const lookupData = req.body;
        const lookup_details_code = await contractor.invite_contractor_delete_details(
          lookupData
        );
         console.log(lookup_details_code[0][0].result);
    
        if (
          lookup_details_code[0][0].result === 0 &&
          lookup_details_code[0][0].result !== null
        ) {
          res.status(500).json({ message: "Details Not Found", success: false,error: true });
        } else {
          res.status(200).json({
            success: true,
            error: false,
            message: lookup_details_code[0][0].result
          });
        }
      },
      invite_get_contractor_details_id: async (req, res) => {
        const lookupData = req.body;
        const lookup_details_code = await contractor.invite_contractor_get_details_id(
          lookupData
        );
        console.log(lookup_details_code[0][0],"data");
        if(lookup_details_code !== null)
        {
          res.status(200).json({
            data:lookup_details_code[0][0],
            success: true,
            error: false,
            message: "Get Contractor Details Successfully"
          });
        }
        else{
          res.status(500).json({ message: "Details Not Found", success: false,error: true });
        }
    
      
      },
      get_contractor_details_id: async (req, res) => {
        const lookupData = req.body;
        const lookup_details_code = await contractor.contractor_get_details_account_id(
          lookupData
        );
        console.log(lookup_details_code[0][0],"data");
        console.log(lookup_details_code[0][0].profile_path,"profile_data");
       
       const imageFileNames = lookup_details_code[0][0].profile_path;
       const protocol ="https";
       const basePath = `${protocol}://${req.get("host")}/upload/photo/${imageFileNames}`;
       lookup_details_code[0][0].profile_path = basePath
        if(lookup_details_code !== null)
        {
          res.status(200).json({
            data:lookup_details_code[0][0],
            success: true,
            error: false,
            message: "Get Contractor Details Successfully"
          });
        }
        else{
          res.status(500).json({ message: "Details Not Found", success: false,error: true });
        }
    
      
      },
      
      get_current_contractor_details: async (req, res) => {
        try {
            const lookup_details_code = await contractor.current_contractor_get_details_account_id();
    
            console.log(lookup_details_code[0][0], "data");
            console.log(lookup_details_code[0].length, "profile_data");
    
            if (lookup_details_code !== null && lookup_details_code[0].length > 0) {
                const detailsArray = [];
    
                for (let i = 0; i < lookup_details_code[0].length; i++) {
                    const imageFileNames = lookup_details_code[0][i].UAD_PROFILE_PHOTO_PATH;
                    const protocol = "https";
                    const basePath = `${protocol}://${req.get("host")}/upload/photo/${imageFileNames}`;
                    lookup_details_code[0][i].UAD_PROFILE_PHOTO_PATH = basePath;
    
                    detailsArray.push(lookup_details_code[0][i]);
                }
    
                res.status(200).json({
                    data: detailsArray,
                    success: true,
                    error: false,
                    message: "Get Contractor Details Successfully"
                });
            } else {
                res.status(500).json({ message: "Details Not Found", success: false, error: true });
            }
        } catch (error) {
            console.error("Error fetching contractor details:", error);
            res.status(500).json({ message: "Internal Server Error", success: false, error: true });
        }
    }
    ,
    get_previous_contractor_details: async (req, res) => {
      try {
          const lookup_details_code = await contractor.previous_contractor_get_details_account_id();
  
          console.log(lookup_details_code[0][0], "data");
          console.log(lookup_details_code[0].length, "profile_data");
  
          if (lookup_details_code !== null && lookup_details_code[0].length > 0) {
              const detailsArray = [];
  
              for (let i = 0; i < lookup_details_code[0].length; i++) {
                  const imageFileNames = lookup_details_code[0][i].UAD_PROFILE_PHOTO_PATH;
                  const protocol = "https";
                  const basePath = `${protocol}://${req.get("host")}/upload/photo/${imageFileNames}`;
                  lookup_details_code[0][i].UAD_PROFILE_PHOTO_PATH = basePath;
  
                  detailsArray.push(lookup_details_code[0][i]);
              }
  
              res.status(200).json({
                  data: detailsArray,
                  success: true,
                  error: false,
                  message: "Get Contractor Details Successfully"
              });
          } else {
              res.status(500).json({ message: "Details Not Found", success: false, error: true });
          }
      } catch (error) {
          console.error("Error fetching contractor details:", error);
          res.status(500).json({ message: "Internal Server Error", success: false, error: true });
      }
  }

}
module.exports = contractor_controller; 