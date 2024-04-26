const multer = require("multer");
const express = require("express");
const app = express();
const ProfileModal = require("../model/profile_modal");

const ProfileController = {
  updateProfile: async (req, res) => {
    try {
      const uad_key = req.body.uad_key;
      console.log(req.file,"file");
      const profile_path = req.file ? req.file.path : null;
      const profile_type = req.file ? req.file.mimetype : null;
      const profile_photo_name = req.file ? req.file.originalname : null;
      console.log(profile_photo_name,"profile_photo_name")

      console.log("uad_key-->", uad_key);
      const profileData = req.body;

      const updatedProfile = await ProfileModal.updateuserprofile(
        uad_key,
        profileData.first_name,
        profileData.last_name,
        profileData.country_code,
        profileData.phone_number,
        profileData.bio,
        profileData.describe_yourself,
        profileData.physical_address,
        profileData.longitude,
        profileData.latitude,
        profile_photo_name
      );
      console.log(updatedProfile,"reslrlrlr")
      res.status(200).json({
        success: true,
        error: false,
        message: updatedProfile,
        data:profileData
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },

  addUserCompanyData: async (req, res) => {
    try {
      const uad_key = req.body.uad_key;
      const logo_path = req.file ? req.file.path : null;
      const logo_type = req.file ? req.file.mimetype : null;
      const logo_name = req.file ? req.file.originalname : null;

      console.log("uad_key-->", uad_key);

      const companyData = req.body;
      console.log(companyData, "companyData");
      console.log(companyData.UCDM_COMPANY_LOGO, "ph");

      const results = await ProfileModal.addUserCompanyData(
        uad_key,
        logo_name,
        companyData.UCDM_COMPANY_NAME,
        companyData.UCDM_COMPANY_EMAIL,
        companyData.UCDM_COMPANY_CONTACT_NUMBER,
        companyData.UCDM_COMPANY_DESCRIPTION,
        companyData.UCDM_SERVICE_YOU_OFFERING,
        companyData.UCDM_SERVICE_YOU_PERFORM,
        companyData.UCDM_COMPANY_ADDRESS,
        companyData.UCDM_COMPANY_LONGITUDE,
        companyData.UCDM_COMPANY_LATITUDE,
        companyData.UCDM_COMPANY_GST_VAT_NUMBER
      );

      console.log(results);

      res.status(200).json({
        success: true,
        error: false,
        message: "Company details inserted successfully",
      });
    } catch (error) {
      console.error("Error updating company details:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  updateUserCompanyData: async (req, res) => {
    try {
      const uad_key = req.body.uad_key;
      const logo_path = req.file ? req.file.path : null;
      const logo_type = req.file ? req.file.mimetype : null;
      const logo_name = req.file ? req.file.originalname : null;

      console.log("uad_key-->", uad_key);

      const companyData = req.body;
      console.log(companyData, "companyData");
      console.log(companyData.UCDM_COMPANY_LOGO, "ph");

      const results = await ProfileModal.updateUsercompanyData(companyData,logo_name);

      console.log(results);

      res.status(200).json({
        success: true,
        error: false,
        message: results[0][0].result,
      });
    } catch (error) {
      console.error("Error updating company details:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  updateContactDetails: async (req, res) => {
    try {
      const uad_key = req.body.uad_key;
      console.log("uad_key-->", uad_key);

      const contactData = req.body;
      console.log(contactData, "data");

      const updatedContactData = await ProfileModal.updateContactDetails(
        uad_key,
        contactData.country_code,
        contactData.old_phone_number,
        contactData.new_phone_number
      );
     console.log(updatedContactData,"reser");
      const statusMessage = updatedContactData[0].Status;
      const errorMessage = updatedContactData[0].ErrorMessage;

      if (statusMessage === "Success") {
        res.status(200).json({
          success: true,
          error: false,
          message: "Contact details updated successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          error: true,
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error updating Contact details:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  deleteUserAccount: async (req, res) => {
    try {
        console.log(req.body.uad_key.length, "req.body.uad_key.length");
        console.log(req.body.email.length, "req.body.email.length");
        console.log(req.body.phone_number.length, "req.body.phone_number.length");
        if (req.body.email.length === 0 ) {
            res.status(400).json({
                success: false,
                error: true,
                message: "All Fields are required",
            });
        }
        else if(req.body.phone_number.length === 0)
        {
          res.status(400).json({
            success: false,
            error: true,
            message: "All Fields are required",
        });
        }
        else {
            const uad_key = req.body.uad_key;
            console.log("uad_key-->", uad_key);

            const contactData = req.body;
            console.log(contactData, "data");

            const deletedContactData = await ProfileModal.deleteUserAccount(
                uad_key,
                contactData.email,
                contactData.phone_number
            );

            const statusMessage = deletedContactData[0].Status;
            const errorMessage = deletedContactData[0].ErrorMessage;

            if (statusMessage === "Success") {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: "User account deleted successfully",
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: true,
                    message: errorMessage,
                });
            }
        }
    } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
,

  getUserCompanyDetails: async (req, res) =>{
    try {
      const uad_key = req.body.uad_key ;
      console.log("uad_key-->", uad_key);

      const contactData = req.body;
      console.log(contactData, "data");

      const getUserCompanyData = await ProfileModal.getUserCompanyData(
        uad_key,
      );
      const logo =getUserCompanyData[0].company_logo;
      console.log(logo,"logoo");

      const protocol = "https"
      const fileUrl = getUserCompanyData[0].company_logo
      ? `${protocol}://${req.get('host')}/upload/photo/${getUserCompanyData[0].company_logo}`
      : null;
      console.log(fileUrl,"fileUrl");

      getUserCompanyData[0].company_logo = fileUrl
      res.status(200).json({
        success: true,
        error: false,
        data:getUserCompanyData,
        message: "Company details retrived successfully",
      });
    }
    catch(error){
      console.error("Error retriving Company Data:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });

    }
  }
  
};

module.exports = ProfileController;
