const express = require("express");
const add_property_details = require("../model/add_property_details");

const add_property_detailsController = {
 
  createadd_property_details: async (req, res) => {
    const lookupData = req.body;
    const lookup_details_code = await add_property_details.add_property_details(
      lookupData
    );
    console.log(lookup_details_code.out_property_id, "lookup_details_code");

    if (
      lookup_details_code.out_property_id.length === 0 &&
      lookup_details_code.out_property_id !== null
    ) {
      res.status(500).json({ message: "Details Not Found", success: false,error: true });
    } else {
      res.status(200).json({
        Property_id: lookup_details_code.out_property_id,
        success: true,
        error: false,
        message: "Property Details"
      });
    }
  },

  createadd_images_and_video: async (req, res) => {
    const property_id = req.body.property_id;
    console.log("Property ID:", property_id);
  
    try {
      if (req.files.images && req.files.images.length > 0) {
        const imagePromises = req.files.images.map(async (image) => {
          console.log("Image:", image.path);
          console.log("Type:", image.mimetype);
          console.log("Name:", image.originalname);
  
          return await add_property_details.add_property_images_details(
            property_id,
            image.path,
            image.mimetype,
            image.originalname
          );
        });
  
        await Promise.all(imagePromises);
      }
  
      if (req.files.videos && req.files.videos.length > 0) {
        const videoPromises = req.files.videos.map(async (video) => {
          console.log("VideoImage:", video.path);
          console.log("VideoType:", video.mimetype);
          console.log("VideoName:", video.originalname);
  
          return await add_property_details.add_property_video_details(
            property_id,
            video.path,
            video.mimetype,
            video.originalname
          );
        });
  
        await Promise.all(videoPromises);
      }
  
      res.status(200).json({
        message: "Images and Videos saved successfully",
        success: true,
        error: false
      });
    } catch (error) {
      console.error("Error adding property details:", error);
      res.status(500).json({
        message: "Error adding property details",
        success: false,
        error: true
      });
    }
  }
  ,
  get_property_details_by_id : async (req, res) => {
    const property_id = req.body.property_id;
    console.log("Property ID:", property_id);
    try {
      const property_details = await add_property_details.get_property_details_by_id(req,property_id);
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
  updateadd_property_details: async (req, res) => {
    const lookupData = req.body;
    const lookup_details_code = await add_property_details.update_property_details(
      lookupData
    );
    console.log(lookup_details_code, "lookup_details_code");

    if (
      lookup_details_code === 0 &&
      lookup_details_code !== null
    ) {
      res.status(500).json({ message: "Data not Successfully Updated", success: false , error: true });
    } else {
      res.status(200).json({
        message: "Data Updated Successfully",
        success: true,
        error: false
      });
    }
  },
  updateadd_images_and_video: async (req, res) => {
    const property_id = req.body.property_id;
    console.log("Property ID:", property_id);
  
    if (req.files && req.files.images && req.files.images.length > 0) {
     // const lookup_details_code = await add_property_details.update_property_images_details(property_id);
      console.log("images deleted");
    } else if (req.files && req.files.videos && req.files.videos.length > 0) {
     // const lookup_details_code = await add_property_details.update_property_video_details(property_id);
      console.log("video deleted");
    } else {
     // const lookup_details_code = await add_property_details.update_property_images_details(property_id);
      console.log("image && video")
     // const lookup_details_code1 = await add_property_details.update_property_video_details(property_id);
      console.log("images video deleted");
    }
    try {
      if (req.files.images && req.files.images.length > 0) {
        const imagePromises = req.files.images.map(async (image) => {
          // console.log("Image:", image.path);
          // console.log("Type:", image.mimetype);
          // console.log("Name:", image.originalname);
  
          return await add_property_details.add_property_images_details(
            property_id,
            image.path,
            image.mimetype,
            image.originalname
          );
        });
  
        await Promise.all(imagePromises);
      }
  
      if (req.files.videos && req.files.videos.length > 0) {
        const videoPromises = req.files.videos.map(async (video) => {
          // console.log("VideoImage:", video.path);
          // console.log("VideoType:", video.mimetype);
          // console.log("VideoName:", video.originalname);
  
          return await add_property_details.add_property_video_details(
            property_id,
            video.path,
            video.mimetype,
            video.originalname
          );
        });
  
        await Promise.all(videoPromises);
      }
  
      res.status(200).json({
        message: "Images and Videos saved successfully",
        success: true,
        error: false
      });
    } catch (error) {
      console.error("Error adding property details:", error);
      res.status(500).json({
        message: "Error adding property details",
        success: false,
        error: true
      });
    }

  }
  ,
  delete_property_details_by_id : async (req, res) => {
    const property_id = req.body.property_id;
    console.log("Property ID:", property_id);
    try {
      const property_details = await add_property_details.delete_property_details(property_id);
        console.log("Property Details:", property_details);
        res.status(200).json({
          message:"Property Deleted Successfully",
          success: true,
          error: false
        });
      } catch (error) { 
        console.error("Error getting property details:", error);
        res.status(500).json({
          message: "Error getting property details",
          error: false,
          success: true 
        });
      }
  }
  ,
  filter_property_details_by_id : async (req, res) => {
    const property_id = req.body;
    console.log("Property ID1:", property_id.property_filter);
    p_property_filter = property_id.property_filter;
    console.log("Property Filter:", p_property_filter);
    user_account_id = property_id.user_account_id;
    console.log("user_account_id",user_account_id);
    page_no =property_id.page_no;
    limit = property_id.limit;
    order_col = property_id.order_col;
    order_wise = property_id.order_wise;
    console.log("page_no:", page_no);
    console.log("limit:", limit);
    console.log("order_col:", order_col);
    console.log("order_wise:", order_wise);

    try {
      const property_details = await add_property_details.filter_property_details
      (
        req,
        p_property_filter,
        user_account_id,
        page_no,
        limit,
        order_col,
        order_wise
        );
        console.log("Property Details:", property_details[0].result);

        if (property_details[0].result == "NO DATA FOUND")
        {
          res.status(200).json({
            property_details:[],
            success: false,
            error: true,
            message: "NO DATA FOUND"
          });
        }
        else{
        res.status(200).json({
          property_details,
          success: true,
          error: false,
          message: "Property Details"
        });
      }
      } catch (error) { 
        console.error("Error getting property details:", error);
        res.status(500).json({
          message: "Error getting property details",
          success: false, 
          error: true,

        });
      }
  }
  ,
  archieve_property_details_by_id : async (req, res) => {
    const property_id = req.body.property_id;
    console.log("Property ID:", property_id);
    try {
      const property_details = await add_property_details.archieve_property_details(property_id);
        console.log("Property Details:", property_details);
        res.status(200).json({
          message:property_details,
          success: true,
          error: false
        });
      } catch (error) { 
        console.error("Error getting property details:", error);
        res.status(500).json({
          message: "Error getting property details",
          success: false, 
          error: true
        });
      }
  }
  ,
  get_vacant_details : async (req, res) => {
    try {
      const property_details = await add_property_details.vacant_property_details(req,res);
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
  }

};
module.exports = add_property_detailsController;
