const router = require("express").Router();
const { body } = require("express-validator");
const { register } = require("../login controller/register");
const { signup_step_one } = require("../login controller/signup_step_one");
const { login } = require("../login controller/loginController");
const add_property_details_Controller = require("../controller/add_property_details");
const { verify_otp } = require("../login controller/verify_otp");
const { forget_password } = require("../login controller/forget_password");
const { forgetOTP } = require("../login controller/forgetOTP");
const path = require("path");
const multer = require("multer");
// router.post('/register', [
//     body('email',"Invalid email address")], register);
// ===============================================================================================================

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with their email address.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               is_term_condition:
 *                 type: boolean
 *                 description: Indicates whether the user has accepted terms and conditions
 *               is_privacy_policy:
 *                 type: boolean
 *                 description: Indicates whether the user has accepted the privacy policy
 *               fcm_token:
 *                 type: string
 *                 description: User's device OS type
 *     responses:
 *       201:
 *         description: The user has been successfully registered, and an OTP has been sent to the registered email.
 *       409:
 *         description: User with the provided email already exists
 *       422:
 *         description: Failed to send OTP via email. Please try again later.
 *       500:
 *         description: Server error
 */
router.post("/register", register);

// ========================================================================================================

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User Login
 *     description: Login a user with their email address and password.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               device_id:
 *                 type: string
 *                 description: User's device ID
 *               device_os_type:
 *                 type: string
 *                 description: User's device OS type
 *               fcm_token:
 *                 type: string
 *                 description: User's device OS type
 *     responses:
 *       200:
 *         description: User Login Successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User Login Successfully"
 *               Login_details:
 *                 user_id: "123456"
 *                 email: "user@example.com"
 *                 token: "your_jwt_token"
 *                 device_id: "your_device_id"
 *                 device_os_type: "your_device_os_type"
 *               success: "true"
 *               errors: "false"
 *       401:
 *         description: User Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "User Unauthorized"
 *               success: "false"
 *               errors: "true"
 *       422:
 *         description: Invalid email address or password
 *         content:
 *           application/json:
 *             example:
 *               errors: [{ msg: "Invalid email address or password" }]
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Server error"
 *               success: "false"
 *               errors: "true"
 */
router.post("/login", login);

// =======================================================================================================================
/**
 * @swagger
 * /api/v1/SendOTP:
 *   post:
 *     summary: OTP Send in Email
 *     description: OTP send to reset password.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               errors: false
 *               message: 'OTP sent successfully'
 *       400:
 *         description: Failed to send OTP
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errors: true
 *               message: 'Failed to send OTP'
 *       500:
 *         description: Failed to store OTP / Failed to generate OTP
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errors: true
 *               message: 'Failed to store OTP / Failed to generate OTP'
 */

router.post("/SendOTP", forgetOTP);
//================================================================================================================
/**
 * @swagger
 * /api/v1/verifyotp:
 *   post:
 *     summary: Verification in OTP
 *     description: OTP exixts in OTP.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               otp:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: OTP verify successfully
 *       404:
 *         description: OTP verification failed
 *       422:
 *         description: OTP has expired
 *       500:
 *         description: An error occurred while verifying OTP
 */

router.post("/verifyotp", verify_otp);
//===============================================================================================================

/**
 * @swagger
 * /api/v1/forgetpassword:
 *   post:
 *     summary: Reset Password
 *     description: Reset Password in email address.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               new_password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: Password reset successfully
 *       404:
 *         description: Invalid email or password not reset
 *       500:
 *         description: Server error
 */
router.post("/forgetpassword", forget_password);

//===============================================================================================================
/**
 * @swagger
 * /api/v1/signup_step_one:
 *   post:
 *     summary: User Signup - Step One
 *     description: Perform step one of the user signup process.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               email:
 *                 type: string
 *                 description: User's email address
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *               country_code:
 *                 type: string
 *                 description: User's country_code
 *               phone_number:
 *                 type: string
 *                 description: User's phone number
 *               physical_address:
 *                 type: string
 *                 description: User's physical address
 *               p_longitude:
 *                 type: string
 *                 description: Physical address longitude
 *               p_latitude:
 *                 type: string
 *                 description: Physical address latitude
 *               State:
 *                 type: string
 *                 description: User's state
 *               Country:
 *                 type: string
 *                 description: User's country
 *               City:
 *                 type: string
 *                 description: User's city
 *               organisation_name:
 *                 type: string
 *                 description: User's organization name
 *               referral_code:
 *                 type: string
 *                 description: Referral code
 *               describe_yourself:
 *                 type: string
 *                 description: User's description of themselves
 *               property_manage:
 *                 type: string
 *                 description: User's property management preference
 *               kodie_help:
 *                 type: string
 *                 description: User's preference for Kodie help
 *               location:
 *                 type: string
 *                 description: Location
 *               location_longitude:
 *                 type: string
 *                 description: Location longitude
 *               location_latitude:
 *                 type: string
 *                 description: Location latitude
 *               islocation:
 *                 type: string
 *                 description: Is location
 *               property_description:
 *                 type: string
 *                 description: Property description
 *               property_type:
 *                 type: string
 *                 description: Property type
 *               key_features:
 *                 type: string
 *                 description: Key features
 *               additional_features:
 *                 type: string
 *                 description: Additional features
 *               key_additional_features:
 *                 type: string
 *                 description: key_additional_features
 *               auto_list:
 *                 type: string
 *                 description: Auto list
 *               land_area:
 *                 type: string
 *                 description: Land area
 *               floor_size:
 *                 type: string
 *                 description: Floor size
 *               p_state:
 *                 type: string
 *                 description: Property state
 *               p_country:
 *                 type: string
 *                 description: Property country
 *               p_city:
 *                 type: string
 *                 description: Property city
 *               device_id:
 *                 type: string
 *                 description: User's device ID
 *               device_type:
 *                 type: string
 *                 description: User's device type
 *               fcm_token:
 *                 type: string
 *                 description: User's fcm_token type
 *               run_your_business:
 *                 type: integer
 *                 description: User's run_your_business type
 *               austrilian_busi_no:
 *                 type: string
 *                 description: User's austrilian_busi_no type
 *               category_service_offer:
 *                 type: string
 *                 description: User's category_service_offer type
 *               category_service_perform:
 *                 type: string
 *                 description: User's category_service_perform type
 *               company_address:
 *                 type: string
 *                 description: User's company_address type
 *               company_longitude:
 *                 type: string
 *                 description: User's company_longitude type
 *               company_latitude:
 *                 type: string
 *                 description: User's company_latitude type
 *               website:
 *                 type: string
 *                 description: User's website type
 *               bio:
 *                 type: string
 *                 description: User's bio type
 *               profile_photo:
 *                 type: string
 *                 format: binary
 *                 description: User's profile photo
 *     responses:
 *       201:
 *         description: Data Successfully Stored
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               error: false
 *               message: "Data Successfully Stored"
 *       400:
 *         description: Unable to insert data
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Unable to insert data."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Server error"
 */
const DIR = path.join(__dirname, "../../upload/photo");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// You can adjust this based on your needs
const upload = multer({ storage: storage });

router.post(
  "/signup_step_one",
  upload.single("profile_photo"),
  signup_step_one
);
// ==============================================================================================
// Property Endpoints

/**
 * @swagger
 * /api/v1/add_property_details:
 *   post:
 *     summary: Create Property Details
 *     description: Create property details and get property ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               user_account_details_id:
 *                 type: string
 *                 description: User account details ID
 *               location:
 *                 type: string
 *                 description: Location
 *               location_longitude:
 *                 type: string
 *                 description: Location longitude
 *               location_latitude:
 *                 type: string
 *                 description: Location latitude
 *               islocation:
 *                 type: string
 *                 description: Is location
 *               property_description:
 *                 type: string
 *                 description: Property description
 *               property_type:
 *                 type: string
 *                 description: Property type
 *               key_features:
 *                 type: string
 *                 description: Key features
 *               UPD_FLOOR_SIZE:
 *                 type: string
 *                 description: Floor size
 *               UPD_LAND_AREA:
 *                 type: string
 *                 description: Land area
 *               additional_features:
 *                 type: string
 *                 description: Additional features
 *               additional_key_features:
 *                 type: string
 *                 description: Additional key features
 *               autolist:
 *                 type: string
 *                 description: Auto list
 *               p_state:
 *                 type: string
 *                 description: Property state
 *               p_country:
 *                 type: string
 *                 description: Property country
 *               p_city:
 *                 type: string
 *                 description: Property city
 *     responses:
 *       200:
 *         description: Property ID generated successfully
 *         content:
 *           application/json:
 *             example:
 *               Property_id: "123456"
 *               status: true
 *       500:
 *         description: Error generating property ID
 *         content:
 *           application/json:
 *             example:
 *               error: "Details Not Found"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/add_property_images_videos:
 *   post:
 *     summary: Add Images and Videos
 *     description: Add images and videos to an existing property.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               property_id:
 *                 type: string
 *                 description: ID of the property to which images and videos should be added
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of video files
 *     responses:
 *       200:
 *         description: Images and Videos saved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Images and Videos saved successfully"
 *               status: true
 *       500:
 *         description: Error adding property details
 *         content:
 *           application/json:
 *             example:
 *               error: "Error adding property details"
 *               status: false
 */

router.post(
  "/add_property_images_videos",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 },
  ]),
  add_property_details_Controller.createadd_images_and_video
);

/**
 * @swagger
 * /api/v1/get_property_details:
 *   post:
 *     summary: Get Property Details by ID
 *     description: Get property details based on the provided property ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property_id:
 *                 type: string
 *                 description: ID of the property to retrieve details
 *     responses:
 *       200:
 *         description: Property details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               property_details: // Your property details object here
 *               status: true
 *       500:
 *         description: Error getting property details
 *         content:
 *           application/json:
 *             example:
 *               error: "Error getting property details"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/update_property_details:
 *   put:
 *     summary: Update Property Details
 *     description: Update property details based on the provided data.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               user_account_details_id:
 *                 type: string
 *                 description: User account details ID
 *               location:
 *                 type: string
 *                 description: Location
 *               location_longitude:
 *                 type: string
 *                 description: Location longitude
 *               location_latitude:
 *                 type: string
 *                 description: Location latitude
 *               islocation:
 *                 type: string
 *                 description: Is location
 *               property_description:
 *                 type: string
 *                 description: Property description
 *               property_type:
 *                 type: string
 *                 description: Property type
 *               key_features:
 *                 type: string
 *                 description: Key features
 *               UPD_FLOOR_SIZE:
 *                 type: string
 *                 description: Floor size
 *               UPD_LAND_AREA:
 *                 type: string
 *                 description: Land area
 *               additional_features:
 *                 type: string
 *                 description: Additional features
 *               additional_key_features:
 *                 type: string
 *                 description: Additional key features
 *               autolist:
 *                 type: string
 *                 description: Auto list
 *               p_state:
 *                 type: string
 *                 description: Property state
 *               p_country:
 *                 type: string
 *                 description: Property country
 *               p_city:
 *                 type: string
 *                 description: Property city
 *               property_id:
 *                 type: string
 *                 description: ID of the property to be updated
 *     responses:
 *       200:
 *         description: Property details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Data Updated Successfully"
 *               status: true
 *       500:
 *         description: Data not successfully updated
 *         content:
 *           application/json:
 *             example:
 *               error: "Data not Successfully Updated"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/update_property_images_video_details:
 *   put:
 *     summary: Update Images and Videos
 *     description: Update images and videos for an existing property.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               property_id:
 *                 type: string
 *                 description: ID of the property to which images and videos should be updated
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of video files
 *     responses:
 *       200:
 *         description: Images and Videos updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Images and Videos updated successfully"
 *               status: true
 *       500:
 *         description: Error updating property details
 *         content:
 *           application/json:
 *             example:
 *               error: "Error updating property details"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/delete_property_by_id:
 *   delete:
 *     summary: Delete Property Details by ID
 *     description: Delete property details based on the provided property ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property_id:
 *                 type: string
 *                 description: ID of the property to delete
 *     responses:
 *       200:
 *         description: Property details deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Property Deleted Successfully"
 *               status: true
 *       500:
 *         description: Error deleting property details
 *         content:
 *           application/json:
 *             example:
 *               error: "Error deleting property details"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/get_property_details_by_filter:
 *   post:
 *     summary: Filter Property Details by ID
 *     description: Filter property details based on the provided criteria.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property_filter:
 *                 type: string
 *                 description: Property filter criteria
 *               user_account_id:
 *                 type: string
 *                 description: User account ID for filtering
 *               page_no:
 *                 type: integer
 *                 description: Page number for pagination
 *               limit:
 *                 type: integer
 *                 description: Limit for pagination
 *               order_col:
 *                 type: string
 *                 description: Column to order by
 *               order_wise:
 *                 type: string
 *                 description: Order direction (ASC or DESC)
 *     responses:
 *       200:
 *         description: Property details filtered successfully
 *         content:
 *           application/json:
 *             example:
 *               property_details: // Your filtered property details object here
 *               status: true
 *       500:
 *         description: Error filtering property details
 *         content:
 *           application/json:
 *             example:
 *               error: "Error filtering property details"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/archieve_property:
 *   post:
 *     summary: Archive Property Details by ID
 *     description: Archive property details based on the provided property ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property_id:
 *                 type: string
 *                 description: ID of the property to archive
 *     responses:
 *       200:
 *         description: Property details archived successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Property Archived Successfully"
 *               status: true
 *       500:
 *         description: Error archiving property details
 *         content:
 *           application/json:
 *             example:
 *               error: "Error archiving property details"
 *               status: false
 */

// ======================================================================================

/**
 * @swagger
 * /api/v1/lookup_details:
 *   post:
 *     summary: Create Lookup
 *     description: Create a new lookup entry.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               P_TYPE:
 *                 type: string
 *                 description: Type of lookup entry
 *               P_PARENT_CODE:
 *                 type: string
 *                 description: Parent code of the lookup entry
 *               # Add other properties as needed
 *     responses:
 *       201:
 *         description: Lookup entry created successfully
 *         content:
 *           application/json:
 *             example:
 *               lookup_details: [{}]
 *               status: true
 *       500:
 *         description: Details Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: "Details Not Found"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/get_key_features:
 *   get:
 *     summary: Get Key Features
 *     description: Get the key features from the lookup.
 *     responses:
 *       201:
 *         description: Key features retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               key_features_details: [{}]
 *               status: true
 *       500:
 *         description: Details Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: "Details Not Found"
 *               status: false
 */
//===========================================================================================
// Job Module (Create Job)

/**
 * @swagger
 * /api/v1/job/create:
 *   post:
 *     summary: Insert Job Details
 *     description: Insert job details into the system.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_account_details_id:
 *                 type: integer
 *                 description: ID of the user's account details
 *               type_of_job:
 *                 type: integer
 *                 description: ID of the type of job
 *               job_service_you_looking:
 *                 type: integer
 *                 description: ID of the service the user is looking for
 *               more_about_job:
 *                 type: string
 *                 description: Additional information about the job
 *               job_priority:
 *                 type: integer
 *                 description: ID of the job priority
 *               property_type:
 *                 type: integer
 *                 description: ID of the property type
 *               job_location:
 *                 type: string
 *                 description: Location of the job
 *               location_longitude:
 *                 type: string
 *                 description: Longitude of the job location
 *               location_latitude:
 *                 type: string
 *                 description: Latitude of the job location
 *               job_rating:
 *                 type: integer
 *                 description: ID of the job rating
 *               job_date:
 *                 type: string
 *                 format: date
 *                 description: Date of the job
 *               job_time:
 *                 type: string
 *                 format: time
 *                 description: Time of the job
 *               job_hourly:
 *                 type: integer
 *                 description: ID of the job hourly
 *               job_often_need_service:
 *                 type: integer
 *                 description: ID of how often the service is needed
 *               job_min_budget:
 *                 type: string
 *                 description: Budget for the job
 *               job_max_budget:
 *                 type: string
 *                 description: Budget for the job
 *               job_payment_by:
 *                 type: integer
 *                 description: ID of the payment method for the job
 *               job_booking_insurance:
 *                 type: integer
 *                 description: ID of the job booking insurance
 *     responses:
 *       201:
 *         description: Job details inserted successfully
 *         content:
 *           application/json:
 *             example:
 *               job_id: 123456
 *               success: true
 *               error: false
 *               message: "Job details inserted successfully"
 *       500:
 *         description: Error inserting job details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error inserting job details."
 */

/**
 * @swagger
 * /api/v1/job/uploadJobFiles:
 *   post:
 *     summary: Insert Job Images
 *     description: Upload and insert images and video for a job.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               JM_JOB_ID:
 *                 type: integer
 *                 description: ID of the job for which images and video are being uploaded
 *                 required: true
 *               frontImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of front image files
 *               leftImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of left image files
 *               rightImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of right image files
 *               video:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of video files
 *     responses:
 *       200:
 *         description: Images and video inserted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Images Inserted Successfully"
 *               error: false
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/job/get:
 *   post:
 *     summary: Get Job Details
 *     description: Retrieve details for a specific job.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               jm_job_id:
 *                 type: integer
 *                 description: ID of the job for which details are being retrieved
 *                 required: true
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data:
 *                 user_account_details_id: 264
 *                 type_of_job: 166
 *                 job_service_you_looking: 172
 *                 more_about_job: "I WANT CLEAN HOME AND STORE ROOM23"
 *                 job_priority: 235
 *                 property_type: 22
 *                 job_location: "Trimurti Square Goregaon"
 *                 location_longitude: "102.201.123"
 *                 location_latitude: "104.402.210"
 *                 job_rating: 241
 *                 job_date: "2023-11-20"
 *                 job_time: "14:30:00"
 *                 job_hourly: 249
 *                 job_often_need_service: 255
 *                 job_budget: "$200"
 *                 job_payment_by: 259
 *                 job_booking_insurance: 262
 *                 image_file_path:
 *                   - "http://yourhost/upload/images/image1.jpg"
 *                   - "http://yourhost/upload/images/image2.jpg"
 *               message: "Job details retrieved successfully"
 *       404:
 *         description: Job details not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Job details not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error retrieving job details."
 */

/**
 * @swagger
 * /api/v1/job/getAlljobs/{p_jm_uad_user_id}:
 *   get:
 *     summary: Get All Job Details for a User
 *     description: Retrieve details for all jobs associated with a specific user account.
 *     parameters:
 *       - in: path
 *         name: p_jm_uad_user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user account for which job details are being retrieved
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data:
 *                 - job_id: 1
 *                   user_account_details_id: 264
 *                   type_of_job: 166
 *                   job_service_you_looking: 172
 *                   more_about_job: "I WANT CLEAN HOME AND STORE ROOM23"
 *                   job_priority: 235
 *                   property_type: 22
 *                   job_location: "Trimurti Square Goregaon"
 *                   location_longitude: "102.201.123"
 *                   location_latitude: "104.402.210"
 *                   job_rating: 241
 *                   job_date: "2023-11-20"
 *                   job_time: "14:30:00"
 *                   job_hourly: 249
 *                   job_often_need_service: 255
 *                   job_budget: "$200"
 *                   job_payment_by: 259
 *                   job_booking_insurance: 262
 *                 - job_id: 2
 *                   user_account_details_id: 264
 *                   type_of_job: 166
 *                   job_service_you_looking: 172
 *                   more_about_job: "I WANT CLEAN HOME AND STORE ROOM23"
 *                   job_priority: 235
 *                   property_type: 22
 *                   job_location: "Trimurti Square Goregaon"
 *                   location_longitude: "102.201.123"
 *                   location_latitude: "104.402.210"
 *                   job_rating: 241
 *                   job_date: "2023-11-22"
 *                   job_time: "15:30:00"
 *                   job_hourly: 249
 *                   job_often_need_service: 255
 *                   job_budget: "$250"
 *                   job_payment_by: 259
 *                   job_booking_insurance: 262
 *               message: "Job details retrieved successfully"
 *       404:
 *         description: Job details not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Job details not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error retrieving job details."
 */

/**
 * @swagger
 * /api/v1/job/updateJob/{p_jm_job_id}:
 *   put:
 *     summary: Update Job Details by ID
 *     description: Update job details based on the provided data and job ID.
 *     parameters:
 *       - in: path
 *         name: p_jm_job_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the job to be updated
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type_of_job:
 *                 type: integer
 *                 description: Type of job
 *               job_service_you_looking:
 *                 type: integer
 *                 description: Job service type
 *               more_about_job:
 *                 type: string
 *                 description: Additional details about the job
 *               job_priority:
 *                 type: integer
 *                 description: Job priority
 *               property_type:
 *                 type: integer
 *                 description: Type of property
 *               job_location:
 *                 type: string
 *                 description: Job location
 *               location_longitude:
 *                 type: string
 *                 description: Longitude of the job location
 *               location_latitude:
 *                 type: string
 *                 description: Latitude of the job location
 *               job_rating:
 *                 type: integer
 *                 description: Job rating
 *               job_date:
 *                 type: string
 *                 format: date
 *                 description: Date of the job
 *               job_time:
 *                 type: string
 *                 format: time
 *                 description: Time of the job
 *               job_hourly:
 *                 type: integer
 *                 description: Hourly details of the job
 *               job_often_need_service:
 *                 type: integer
 *                 description: Frequency of job service needed
 *               job_min_budget:
 *                 type: string
 *                 description: Budget for the job
 *               job_max_budget:
 *                 type: string
 *                 description: Budget for the job
 *               job_payment_by:
 *                 type: integer
 *                 description: Payment method for the job
 *               job_booking_insurance:
 *                 type: integer
 *                 description: Booking insurance for the job
 *     responses:
 *       200:
 *         description: Job details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data:
 *                 job_id: 1
 *                 type_of_job: 166
 *                 job_service_you_looking: 172
 *                 more_about_job: "Updated job details"
 *                 job_priority: 235
 *                 property_type: 22
 *                 job_location: "Updated Location"
 *                 location_longitude: "Updated Longitude"
 *                 location_latitude: "Updated Latitude"
 *                 job_rating: 241
 *                 job_date: "2023-11-20"
 *                 job_time: "14:30:00"
 *                 job_hourly: 249
 *                 job_often_need_service: 255
 *                 job_budget: "$250"
 *                 job_payment_by: 259
 *                 job_booking_insurance: 262
 *               message: "Job details Updated successfully"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/job/deletejob/{p_jm_job_id}:
 *   delete:
 *     summary: Delete Job by ID
 *     description: Delete job details based on the provided job ID.
 *     parameters:
 *       - in: path
 *         name: p_jm_job_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the job to be deleted
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data: {}
 *               message: "Job deleted successfully"
 *       404:
 *         description: Job details not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Job details not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/job/addJobArchieve:
 *   post:
 *     summary: Add Job to Archieve
 *     description: Add job details to the archieve based on the provided job ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               p_job_id:
 *                 type: integer
 *                 description: ID of the job to be added to the archieve
 *     responses:
 *       200:
 *         description: Job added to archieve successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Job added to archieve successfully"
 *       404:
 *         description: Error inserting Job to Archieve
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error inserting Job to Archieve"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/job/updatejobimages/{p_jm_job_id}:
 *   put:
 *     summary: Update Job Images and Videos by ID
 *     description: Update job images and videos based on the provided job ID.
 *     parameters:
 *       - in: path
 *         name: p_jm_job_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to update images and videos
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               frontImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               leftImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               rightImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               video:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Job images and videos updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Job images/videos updated successfully."
 *       500:
 *         description: Error updating job images/videos
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error updating job images/videos."
 */

/**
 * @swagger
 * /api/v1/job/getJobbyFilter:
 *   post:
 *     summary: Get Jobs by Filter and Account ID
 *     description: Retrieve jobs based on the provided filter and account ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_filter:
 *                 type: string
 *                 description: Object containing filter criteria for jobs
 *               user_account_id:
 *                 type: integer
 *                 description: User account ID for filtering jobs
 *               page_no:
 *                 type: integer
 *                 description: Page number for pagination
 *               limit:
 *                 type: integer
 *                 description: Limit of records per page for pagination
 *               order_col:
 *                 type: string
 *                 description: Column name for sorting
 *               order_wise:
 *                 type: string
 *                 enum: [asc, desc]
 *                 description: Order direction (asc or desc) for sorting
 *             required:
 *               - job_filter
 *               - user_account_id
 *               - page_no
 *               - limit
 *               - order_col
 *               - order_wise
 *     responses:
 *       200:
 *         description: Job Details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               job_details:
 *                 - job_id: 123
 *                   job_title: "Example Job"
 *               success: true
 *               error: false
 *               message: "Job Details retrieved By Filter"
 *       500:
 *         description: Error retrieving Job details or NO DATA FOUND
 *         content:
 *           application/json:
 *             example:
 */
/**
 * @swagger
 * /api/v1/job/getJobbyFilter_Service:
 *   post:
 *     summary: Get Jobs by Filter and Account ID
 *     description: Retrieve jobs based on the provided filter and account ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_filter:
 *                 type: string
 *                 description: Object containing filter criteria for jobs
 *               user_account_id:
 *                 type: integer
 *                 description: User account ID for filtering jobs
 *               page_no:
 *                 type: integer
 *                 description: Page number for pagination
 *               limit:
 *                 type: integer
 *                 description: Limit of records per page for pagination
 *               order_col:
 *                 type: string
 *                 description: Column name for sorting
 *               order_wise:
 *                 type: string
 *                 enum: [asc, desc]
 *                 description: Order direction (asc or desc) for sorting
 *             required:
 *               - job_filter
 *               - user_account_id
 *               - page_no
 *               - limit
 *               - order_col
 *               - order_wise
 *     responses:
 *       200:
 *         description: Job Details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               job_details:
 *                 - job_id: 123
 *                   job_title: "Example Job"
 *               success: true
 *               error: false
 *               message: "Job Details retrieved By Filter"
 *       500:
 *         description: Error retrieving Job details or NO DATA FOUND
 *         content:
 *           application/json:
 *             example:
 */

/**
 * @swagger
 * /api/v1/job/addBidding:
 *   post:
 *     summary: Add Bidding Data
 *     description: Add bidding data to the system.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UAD_USER_KEY:
 *                 type: integer
 *                 description: User account key
 *               BIDDING_REF_KEY:
 *                 type: integer
 *                 description: Reference key for the bidding module
 *               BIDDING_COMMENCEMENT_DATE:
 *                 type: string
 *                 format: date
 *                 description: Commencement date of bidding
 *               BIDDING_DURATION:
 *                 type: integer
 *                 description: Duration of bidding in days
 *               BIDDING_LIST_PRICE:
 *                 type: number
 *                 description: List price for bidding
 *               BIDDING_AUTO_ACCEPT:
 *                 type: string
 *                 description: Auto-accept option for bidding
 *               BIDDING_PAYMENT_TERMS:
 *                 type: integer
 *                 description: Payment terms for bidding
 *               BIDDING_NOTIFICATION_TYPE:
 *                 type: integer
 *                 description: Notification type for bidding
 *               BM_IS_BIDDING_OPEN:
 *                 type: integer
 *                 description: Bidding open status
 *               BIDDING_OPEN_REMINDER:
 *                 type: integer
 *                 description: Open reminder for bidding
 *               BIDDING_CLOSE_REMINDER:
 *                 type: integer
 *                 description: Close reminder for bidding
 *               BM_IS_BIDDING_CLOSE:
 *                 type: integer
 *                 description: Bidding close status
 *               BIDDING_NEW_BID:
 *                 type: integer
 *                 description: New bid for bidding
 *               BM_IS_NEW_BID:
 *                 type: integer
 *                 description: New bid status
 *               BIDDING_IS_WINNER:
 *                 type: integer
 *                 description: Winner status for bidding
 *               IS_ACTIVE:
 *                 type: boolean
 *                 description: Active status of bidding
 *             required:
 *               - UAD_USER_KEY
 *               - BIDDING_REF_KEY
 *               - BIDDING_COMMENCEMENT_DATE
 *               - BIDDING_DURATION
 *               - BIDDING_LIST_PRICE
 *               - BIDDING_AUTO_ACCEPT
 *               - BIDDING_PAYMENT_TERMS
 *               - BIDDING_NOTIFICATION_TYPE
 *               - BM_IS_BIDDING_OPEN
 *               - BIDDING_OPEN_REMINDER
 *               - BIDDING_CLOSE_REMINDER
 *               - BM_IS_BIDDING_CLOSE
 *               - BIDDING_NEW_BID
 *               - BM_IS_NEW_BID
 *               - BIDDING_IS_WINNER
 *               - IS_ACTIVE
 *     responses:
 *       200:
 *         description: Bidding Details Inserted Successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Bidding Details Inserted Successfully"
 *       404:
 *         description: Error inserting Bidding Details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error inserting Bidding Details"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error inserting Bidding Details."
 */
/**
 * @swagger
 * /api/v1/job/getallBidRequestForJob:
 *   post:
 *     summary: Get All Bid Requests for Job
 *     description: Retrieve all bid requests for a specific job.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_id:
 *                 type: integer
 *                 description: ID of the job for which bid requests are to be retrieved
 *               uad_key:
 *                 type: integer
 *                 description: User account key associated with the job
 *             required:
 *               - job_id
 *               - uad_key
 *     responses:
 *       200:
 *         description: Bid requests retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data:
 *                 - UAD_KEY: 1
 *                   UAD_FIRST_NAME: "John"
 *                   UAD_LAST_NAME: "Doe"
 *                   UAD_CURR_PHYSICAL_ADD: "123 Main St"
 *                   UAD_PROFILE_PHOTO_PATH: "https://example.com/profile.jpg"
 *                   BRM_JOB_BID_AMMOUNT: 500
 *                   BRM_JOB_BID_DATE: "2024-01-01T12:00:00.000Z"
 *                   BRM_COVER_LATER: true
 *               message: "Bid requests retrieved successfully"
 *       404:
 *         description: Contractor details not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Contractor details not found"
 *       500:
 *         description: Error retrieving Contractor details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error retrieving Contractor details."
 */


/**
 * @swagger
 * /api/v1/job/getContractor/{user_key}:
 *   get:
 *     summary: Get Contractor Details by User Key
 *     description: Retrieve details of a contractor by user key.
 *     parameters:
 *       - in: path
 *         name: user_key
 *         schema:
 *           type: integer
 *         required: true
 *         description: User key to identify the contractor
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data:
 *                 - UAD_KEY: 1
 *                   UAD_FIRST_NAME: "John"
 *                   UAD_LAST_NAME: "Doe"
 *                   UAD_CURR_PHYSICAL_ADD: "123 Main St"
 *                   UAD_PROFILE_PHOTO_PATH: "https://example.com/profile.jpg"
 *               message: "Contractors retrieved successfully"
 *       404:
 *         description: Contractor details not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Contractor details not found"
 *       500:
 *         description: Error retrieving Contractor details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error retrieving Contractor details."
 */

/**
 * @swagger
 * /api/v1/invitecontractor_details:
 *   post:
 *     summary: Invite Contractor Details
 *     description: Invite a contractor and add details based on the provided data.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               User_USP_KEY:
 *                 type: integer
 *                 description: User USP key
 *               User_Account_UDP_KEY:
 *                 type: integer
 *                 description: User Account UDP key
 *               UACP_IS_COMPANY:
 *                 type: integer
 *                 description: Indicator for company (1 for true, 0 for false)
 *               FIRST_NAME:
 *                 type: string
 *                 description: First name of the contractor
 *               LAST_NAME:
 *                 type: string
 *                 description: Last name of the contractor
 *               ORGANISATION_NAME:
 *                 type: string
 *                 description: Name of the contractor's organization
 *               CATEGORY_CONTRACTOR:
 *                 type: string
 *                 description: Contractor category
 *               CONTRACTOR_PROFESSION:
 *                 type: string
 *                 description: Contractor profession
 *               EMAIL:
 *                 type: string
 *                 format: email
 *                 description: Email address of the contractor
 *               PHONE_NUMBER:
 *                 type: string
 *                 description: Phone number of the contractor
 *               MOBILE_NUMBER:
 *                 type: string
 *                 description: Mobile number of the contractor
 *               WEBSITE:
 *                 type: string
 *                 format: uri
 *                 description: Website URL of the contractor
 *               NOTES:
 *                 type: string
 *                 description: Additional notes
 *             required:
 *               - User_USP_KEY
 *               - User_Account_UDP_KEY
 *               - UACP_IS_COMPANY
 *               - FIRST_NAME
 *               - LAST_NAME
 *               - ORGANISATION_NAME
 *               - CATEGORY_CONTRACTOR
 *               - CONTRACTOR_PROFESSION
 *               - EMAIL
 *               - PHONE_NUMBER
 *               - MOBILE_NUMBER
 *               - WEBSITE
 *               - NOTES
 *     responses:
 *       200:
 *         description: Invite Contractor Successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               message: "Invite Contractor Successfully"
 *       500:
 *         description: Details Not Found or Error in Invitation
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Details Not Found"
 */

  /**
 * @swagger
 * /api/v1/invitecontractor_details_account_id:
 *   post:
 *     summary: Get Contractor Details by User USP Key
 *     description: Retrieve contractor details by user USP key.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               User_USP_KEY:
 *                 type: integer
 *                 description: User USP Key for which contractor details are being retrieved
 *             required:
 *               - User_USP_KEY
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               // Provide an example of the retrieved data
 *       500:
 *         description: Error retrieving contractor details
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *               success: false
 *               error: true
 */

/**
 * @swagger
 * /api/v1/Contractor_details_by_account_id:
 *   post:
 *     summary: Get Contractor Details by Account ID
 *     description: Retrieve contractor details by account ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_id:
 *                 type: integer
 *                 description: ID of the account for which details are being retrieved
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data: // Provide an example of the retrieved data
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */

/**
 * @swagger
 * /api/v1/invitecontractor_details_contractor_id:
 *   post:
 *     summary: Get Contractor Details by Contractor ID
 *     description: Retrieve contractor details by contractor ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contractor_id:
 *                 type: integer
 *                 description: ID of the contractor for which details are being retrieved
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data: // Provide an example of the retrieved data
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */
/**
 * @swagger
 * /api/v1/invitecontractor_details_update_by_id:
 *   put:
 *     summary: Update Contractor Details by ID
 *     description: Update contractor details by ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CONTRACTOR_ID:
 *                 type: integer
 *               FIRST_NAME:
 *                 type: string
 *               LAST_NAME:
 *                 type: string
 *               ORGANISATION_NAME:
 *                 type: string
 *               CATEGORY_CONTRACTOR:
 *                 type: string
 *               CONTRACTOR_PROFESSION:
 *                 type: string
 *               EMAIL:
 *                 type: string
 *                 format: email
 *               PHONE_NUMBER:
 *                 type: string
 *               MOBILE_NUMBER:
 *                 type: string
 *               WEBSITE:
 *                 type: string
 *                 format: uri
 *               NOTES:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contractor details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               message: "Updated Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */


/**
 * @swagger
 * /api/v1/invitecontractor_details_delete:
 *   post:
 *     summary: Delete Contractor Details
 *     description: Delete contractor details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               p_CONTRACTOR_ID:
 *                 type: string
 *                 description: ID of the contractor to be deleted
 *     responses:
 *       200:
 *         description: Contractor details deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               message: "Contractor Details Deleted Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */


/**
 * @swagger
 * /api/v1/Contractor_details_by_account_id:
 *   post:
 *     summary: Get Contractor Details by Account ID
 *     description: Retrieve contractor details by account ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_id:
 *                 type: integer
 *                 description: ID of the account for which details are being retrieved
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 first_name: "Pankaj"
 *                 last_name: "Tete"
 *                 address: "Gadawara"
 *                 longitude: null
 *                 latitude: null
 *                 profile_path: "https://localhost:5000/upload/photo/xyz.png"
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */

/**
 * @swagger
 * /api/v1/current_contractor_details:
 *   get:
 *     summary: Get Current Contractor Details
 *     description: Retrieve details of the current contractor.
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 UAD_KEY: 2
 *                 UAD_FIRST_NAME: "Pankaj"
 *                 UAD_LAST_NAME: "Tete"
 *                 UAD_CURR_PHYSICAL_ADD: "Gadawara"
 *                 UAD_PROFILE_PHOTO_PATH: "https://localhost:5000/upload/photo/About1.png"
 *                 UAD_CREATED_ON: "2023-11-04T06:05:20.000Z"
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */

/**
 * @swagger
 * /api/v1/previous_contractor_details:
 *   get:
 *     summary: Get Current Contractor Details
 *     description: Retrieve details of the current contractor.
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 UAD_KEY: 2
 *                 UAD_FIRST_NAME: "Pankaj"
 *                 UAD_LAST_NAME: "Tete"
 *                 UAD_CURR_PHYSICAL_ADD: "Gadawara"
 *                 UAD_PROFILE_PHOTO_PATH: "https://localhost:5000/upload/photo/About1.png"
 *                 UAD_CREATED_ON: "2023-11-04T06:05:20.000Z"
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */

/**
 * @swagger
 * /api/v1/add_feedback_details:
 *   post:
 *     summary: Add Feedback Details
 *     description: Add feedback details to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_id:
 *                 type: string
 *                 description: ID of the account for which feedback is being added
 *               modules_name:
 *                 type: string
 *                 description: Name of the module (e.g., "Job")
 *               rate_services:
 *                 type: integer
 *                 description: Rating for the services
 *               describe_level:
 *                 type: string
 *                 description: Description of the performance level
 *               quality_performed:
 *                 type: integer
 *                 description: Rating for the quality of the performed task
 *               leave_performed:
 *                 type: string
 *                 description: Description of the leave performed
 *               recommend:
 *                 type: integer
 *                 description: Recommendation status (1 for recommend, 0 for not recommend)
 *             required:
 *               - account_id
 *               - modules_name
 *               - rate_services
 *               - describe_level
 *               - quality_performed
 *               - leave_performed
 *               - recommend
 *     responses:
 *       201:
 *         description: Feedback details added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Feedback details added successfully"
 *               status: true
 *               error: false
 *       500:
 *         description: Error adding feedback details
 *         content:
 *           application/json:
 *             example:
 *               error: "Details Not Found"
 *               status: false
 */

/**
 * @swagger
 * /api/v1/profile/updateProfile:
 *   put:
 *     summary: Update User Profile
 *     description: Update user profile information.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               uad_key:
 *                 type: string
 *                 description: User ID
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *               country_code:
 *                 type: string
 *                 description: User's country_code
 *               phone_number:
 *                 type: string
 *                 description: User's phone number
 *               bio:
 *                  type: string
 *                  description: More bio user
 *               describe_yourself:
 *                  type: string
 *                  description: More describe_yourself user
 *               physical_address:
 *                 type: string
 *                 description: User's physical address
 *               longitude:
 *                 type: string
 *                 description: Physical address longitude
 *               latitude:
 *                 type: string
 *                 description: Physical address latitude
 *               profile_photo:
 *                 type: string
 *                 format: binary
 *                 description: User's profile photo (single file)
 *     responses:
 *       201:
 *         description: Data Successfully Stored
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               error: false
 *               message: "Data Successfully Stored"
 *       400:
 *         description: Unable to insert data
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Unable to insert data."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Server error"
 */

//  /**
//  * @swagger
//  * /api/v1/profile/addusercompanydata:
//  *   post:
//  *     summary: Add User Company Details
//  *     description: Add details of the user's company to the system.
//  *     requestBody:
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               uad_key:
//  *                 type: integer
//  *                 description: User account key
//  *               UCDM_COMPANY_LOGO:
//  *                 type: string
//  *                 format: binary
//  *                 description: Image file for the company logo
//  *               UCDM_COMPANY_NAME:
//  *                 type: string
//  *                 description: Name of the company
//  *               UCDM_COMPANY_EMAIL:
//  *                 type: string
//  *                 description: Email address of the company
//  *               UCDM_COMPANY_CONTACT_NUMBER:
//  *                 type: integer
//  *                 description: Contact number of the company
//  *               UCDM_COMPANY_DESCRIPTION:
//  *                 type: string
//  *                 description: Description of the company
//  *               UCDM_SERVICE_YOU_OFFERING:
//  *                 type: integer
//  *                 description: Services offered by the company
//  *               UCDM_SERVICE_YOU_PERFORM:
//  *                 type: integer
//  *                 description: Services performed by the company
//  *               UCDM_COMPANY_ADDRESS:
//  *                 type: string
//  *                 description: Address of the company
//  *               UCDM_COMPANY_LONGITUDE:
//  *                 type: string
//  *                 description: Longitude of the company location
//  *               UCDM_COMPANY_LATITUDE:
//  *                 type: string
//  *                 description: Latitude of the company location
//  *               UCDM_COMPANY_GST_VAT_NUMBER:
//  *                 type: string
//  *                 description: GST or VAT number of the company
//  *             required:
//  *               - uad_key
//  *     responses:
//  *       200:
//  *         description: Company details added successfully
//  *         content:
//  *           application/json:
//  *             example:
//  *               success: true
//  *               error: false
//  *               message: "Company Details Updated Successfully"
//  *       500:
//  *         description: Error adding company details
//  *         content:
//  *           application/json:
//  *             example:
//  *               success: false
//  *               error: "Internal Server Error"
//  */

 /**
 * @swagger
 * /api/v1/profile/updateusercompanydata:
 *   put:
 *     summary: Update User Company Data
 *     description: Update details of the user's company, including company logo.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               account_id:
 *                 type: integer
 *                 description: User account key
 *               run_business:
 *                 type: integer
 *                 description: run_business pass 0 or 1
 *               organisation_name:
 *                 type: string
 *                 description: organisation_name
 *               austrialian_business_no:
 *                 type: string
 *                 description: austrialian_business_no
 *               company_gst:
 *                 type: string
 *                 description: company_gst
 *               category_offer:
 *                 type: string
 *                 description: category_offer
 *               service_perform:
 *                 type: string
 *                 description: service_perform
 *               company_address:
 *                 type: string
 *                 description: company_address
 *               company_longitude:
 *                 type: string
 *                 description: company_longitude
 *               company_latitude:
 *                 type: string
 *                 description: company_latitude
 *               website:
 *                 type: string
 *                 description: website
 *               company_logo:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the company logo
 *             required:
 *               - account_id
 *     responses:
 *       200:
 *         description: Company details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               message: "Company details updated successfully"
 *       500:
 *         description: Error updating company details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal Server Error"
 */


 /**
 * @swagger
 * /api/v1/profile/getUserCompanyDetails:
 *   post:
 *     summary: Get User Company Details
 *     description: Retrieve user company details by user's UAD key.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uad_key:
 *                 type: integer
 *                 description: User UAD Key for which company details are being retrieved
 *             required:
 *               - uad_key
 *     responses:
 *       200:
 *         description: User company details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data: // Provide an example of the retrieved data
 *               message: "Profile details updated successfully"
 *       500:
 *         description: Error retrieving user company details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal Server Error"
 *               message: "Error retrieving user company details"
 */

 /**
 * @swagger
 * /api/v1/profile/updateContactdetails:
 *   put:
 *     summary: Update Contact Details
 *     description: Update user contact details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uad_key:
 *                 type: integer
 *                 description: User account key
 *               country_code:
 *                 type: string
 *                 description: country_code
 *               old_phone_number:
 *                 type: string
 *                 description: Old phone number associated with the user
 *               new_phone_number:
 *                 type: string
 *                 description: New phone number to be updated
 *             required:
 *               - uad_key
 *               - old_phone_number
 *               - new_phone_number
 *     responses:
 *       200:
 *         description: Contact details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               message: "Contact details updated successfully"
 *       500:
 *         description: Error updating contact details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal Server Error"
 */


 /**
 * @swagger
 * /api/v1/profile/deleteuseraccount:
 *   delete:
 *     summary: Delete User Account
 *     description: Delete user account based on the provided user key, email, and phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uad_key:
 *                 type: integer
 *                 description: User account key
 *               email:
 *                 type: string
 *                 description: Email associated with the user account
 *               phone_number:
 *                 type: string
 *                 description: Phone number associated with the user account
 *             required:
 *               - uad_key
 *               - email
 *               - phone_number
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               message: "User account deleted successfully"
 *       400:
 *         description: Unable to delete user account
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error deleting user account"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Internal Server Error"
 */


 /**
 * @swagger
 * /api/v1/get_property_details_my_acc_id:
 *   post:
 *     summary: Get Property Address From Account Id
 *     description: Retrieve contractor details by account ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_id:
 *                 type: integer
 *                 description: ID of the account for which details are being retrieved
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 first_name: "Pankaj"
 *                 last_name: "Tete"
 *                 address: "Gadawara"
 *                 longitude: null
 *                 latitude: null
 *                 profile_path: "https://localhost:5000/upload/photo/xyz.png"
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */

 

/**
 * @swagger
 * /api/v1/search_for_contractor:
 *   post:
 *     summary: Search for Contractor API
 *     description: Retrieve contractor details by account ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_need:
 *                 type: string
 *                 description: ID of the job needed
 *               job_service:
 *                 type: string
 *                 description: ID of the job service
 *               longitude:
 *                 type: string
 *                 description: Longitude information
 *               latitude:
 *                 type: string
 *                 description: Latitude information
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 first_name: "Pankaj"
 *                 last_name: "Tete"
 *                 address: "Gadawara"
 *                 longitude: null
 *                 latitude: null
 *                 profile_path: "https://localhost:5000/upload/photo/xyz.png"
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */

/**
 * @swagger
 * /api/v1/job/searchJobs:
 *   post:
 *     summary: Search Jobs
 *     description: Search for jobs based on specified criteria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_type:
 *                 type: string
 *                 description: Type of the job
 *               job_perform:
 *                 type: string
 *                 description: Type of performance required for the job
 *               available:
 *                 type: string
 *                 description: Availability status for the job
 *               longitude:
 *                 type: string
 *                 description: Longitude for location-based search
 *               latitude:
 *                 type: string
 *                 description: Latitude for location-based search
 *               min_budget:
 *                 type: string
 *                 description: Minimum budget for the job
 *               max_budget:
 *                 type: string
 *                 description: Maximum budget for the job
 *             required:
 *               - job_type
 *               - job_perform
 *               - available
 *               - longitude
 *               - latitude
 *               - min_budget
 *               - max_budget
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                   reference_no: "20240109051801"
 *                   job_type: "Outdoor cleaning"
 *                   location: "Bhopal, Madhya Pradesh, India"
 *                   job_min_budget: "$456"
 *                   job_max_budget: "$650"
 *               success: true
 *               error: false
 *               message: "Job details retrieved successfully"
 *       400:
 *         description: Job details already exist
 *         content:
 *           application/json:
 *             example:
 *               data:
 *               success: false
 *               error: true
 *               message: "Job details already exist"
 *       500:
 *         description: Error inserting job details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error inserting job details"
 */

/**
 * @swagger
 * /api/v1/job/getjobsummary/{job_id}:
 *   get:
 *     summary: Get Job Summary for Bid
 *     description: Retrieve job summary details for bidding based on job ID.
 *     parameters:
 *       - in: path
 *         name: job_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job for which summary is being retrieved
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data:
 *                 job_id: 1
 *                 service_looking: General cleaning
 *                 job_service_you_looking_key: 170
 *                 job_date: "2024-01-16T18:30:00.000Z"
 *                 job_description: "General cleaning…"
 *                 first_name: Deependra
 *                 last_name: jhariya
 *                 job_location: "Vallabh market gate, opposite to bahubali hotel, Gadarwara, Madhya Pradesh 487551, India"
 *                 location_longitude: "78.78009915418238"
 *                 location_latitude: "22.92182170604076"
 *                 property_type_key: 23
 *                 property_type: Cottage
 *                 proposed_time: "12:44:00 PM"
 *                 time_difference: "2 hours 0 minutes"
 *                 job_time: "10:44:00 AM"
 *                 number_of_hours: "2 Hours"
 *                 how_often: One time
 *                 job_how_often_key: "254"
 *                 job_min_budget: "$500"
 *                 job_max_budget: "$690"
 *               message: "Job details retrieved successfully"
 *       404:
 *         description: Job details not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Job details not found"
 *       500:
 *         description: Error retrieving job details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error retrieving job details."
 */

/**
 * @swagger
 * /api/v1/job/insertBidRequestData:
 *   post:
 *     summary: Insert Bid Request Data
 *     description: Insert bid request details into the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_id:
 *                 type: integer
 *                 description: ID of the job for which the bid request is made
 *               uad_key:
 *                 type: integer
 *                 description: User account key making the bid request
 *               preferred_date:
 *                 type: string
 *                 format: date
 *                 description: Preferred date for the bid request
 *               preferred_time:
 *                 type: string
 *                 format: time
 *                 description: Preferred time for the bid request
 *               amount:
 *                 type: string
 *                 description: Bid amount
 *               service_time:
 *                 type: string
 *                 description: Service time for the bid request
 *               cover_later:
 *                 type: string
 *                 description: Indicates whether the bid request covers a later date
 *             required:
 *               - job_id
 *               - uad_key
 *               - preferred_date
 *               - preferred_time
 *               - amount
 *               - service_time
 *               - cover_later
 *     responses:
 *       200:
 *         description: Bid request details inserted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               error: false
 *               data:
 *                 // Include relevant data from the inserted bid request
 *               message: "Bid request details inserted successfully"
 *       404:
 *         description: Bid request details not inserted
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Bid request details not inserted"
 *       500:
 *         description: Error inserting bid request details
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error inserting bid request details."
 */

/**
 * @swagger
 * /api/v1/job/acceptBidReqest:
 *   post:
 *     summary: Accept Bid Request
 *     description: Accept a bid request for a job.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_id:
 *                 type: integer
 *                 description: ID of the job for which the bid is accepted
 *               uad_key:
 *                 type: integer
 *                 description: User account key for the contractor whose bid is accepted
 *     responses:
 *       200:
 *         description: Bid request accepted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Bid request accepted successfully"
 *       404:
 *         description: Error accepting job bid
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error accepting job bid"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Internal Server Error"
 */


/**
 * @swagger
 * /api/v1/Contact_Us:
 *   post:
 *     summary: Helping And Feedback Form
 *     description: Helping And Feedback Form - This API will send an email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               message:
 *                 type: string
 *                 description: Message from the user
 *               device_information:
 *                 type: string
 *                 description: User's device information
 *     responses:
 *       '200':
 *         description: Accepted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Accepted successfully"
 *       '404':
 *         description: Error accepting job bid
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Error accepting job bid"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: true
 *               message: "Internal Server Error"
 */


/**
 * @swagger
 *   /api/v1/get_details_by_account_id_notices_reminder:
 *     post:
 *       summary: Get Account Details for Notices Reminder
 *       description: Retrieves account details for notices reminders based on filter criteria.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notices_filter:
 *                   type: string
 *                   description: Filter criteria for notices
 *                 account_id:
 *                   type: integer
 *                   description: User's account ID
 *                 limit:
 *                   type: string
 *                   description: Limit for the number of results
 *                 order_wise:
 *                   type: string
 *                   description: Order of results (ascending or descending)
 *                 months:
 *                   type: string
 *                   description: Number of months
 *                 year:
 *                   type: integer
 *                   description: Year for filtering
 *       responses:
 *         '201':
 *           description: Successfully retrieved account details for notices reminder
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 data:  Your response data here 
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */

/**
 * @swagger
 *   /api/v1/create_notices_reminder:
 *     post:
 *       summary: Create Notices Reminder
 *       description: API to create a notice reminder.
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                   description: User's account ID
 *                 notice_type:
 *                   type: integer
 *                   description: Type of notice
 *                 notice_title:
 *                   type: string
 *                   description: Title of the notice
 *                 notice_repeat:
 *                   type: integer
 *                   description: Repeat interval for the notice
 *                 notice_notifications:
 *                   type: integer
 *                   description: Number of notifications
 *                 notice_from_date:
 *                   type: string
 *                   description: Start date of the notice
 *                 notice_from_time:
 *                   type: string
 *                   description: Start time of the notice
 *                 notice_to_date:
 *                   type: string
 *                   description: End date of the notice
 *                 notice_to_time:
 *                   type: string
 *                   description: End time of the notice
 *                 guests:
 *                   type: integer
 *                   description: Number of guests
 *                 location:
 *                   type: string
 *                   description: Location of the notice
 *                 longitude:
 *                   type: number
 *                   description: Longitude of the location
 *                 latitude:
 *                   type: number
 *                   description: Latitude of the location
 *                 notification:
 *                   type: integer
 *                   description: Notification flag
 *                 notification_type:
 *                   type: integer
 *                   description: Type of notification
 *                 custom:
 *                   type: string
 *                   description: Custom field for the notice
 *                 notes:
 *                   type: string
 *                   description: Additional notes for the notice
 *                 file_name:
 *                   type: string
 *                   format: binary
 *                   description: File to be attached
 *       responses:
 *         '200':
 *           description: Successfully created notice reminder
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Notice reminder created successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */


/**
 * @swagger
 *   /api/v1/get_notices_reminder_details:
 *     post:
 *       summary: Get Notices Reminder Details
 *       description: API to retrieve details of a notice reminder.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notices_reminder_id:
 *                   type: integer
 *                   description: ID of the notice reminder
 *       responses:
 *         '200':
 *           description: Successfully retrieved notice reminder details
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 data:  Your response data here 
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Notice reminder not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Notice reminder not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */


/**
 * @swagger
 *   /api/v1/update_notices_reminder:
 *     put:
 *       summary: Update Notices Reminder
 *       description: API to update a notice reminder.
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 notices_reminder_id:
 *                   type: integer
 *                   description: ID of the notice reminder
 *                 notice_type:
 *                   type: integer
 *                   description: Type of notice
 *                 notice_title:
 *                   type: string
 *                   description: Title of the notice
 *                 notice_repeat:
 *                   type: integer
 *                   description: Repeat interval for the notice
 *                 notice_notifications:
 *                   type: integer
 *                   description: Number of notifications
 *                 notice_from_date:
 *                   type: string
 *                   description: Start date of the notice
 *                 notice_from_time:
 *                   type: string
 *                   description: Start time of the notice
 *                 notice_to_date:
 *                   type: string
 *                   description: End date of the notice
 *                 notice_to_time:
 *                   type: string
 *                   description: End time of the notice
 *                 guests:
 *                   type: integer
 *                   description: Number of guests
 *                 location:
 *                   type: string
 *                   description: Location of the notice
 *                 longitude:
 *                   type: number
 *                   description: Longitude of the location
 *                 latitude:
 *                   type: number
 *                   description: Latitude of the location
 *                 notification:
 *                   type: integer
 *                   description: Notification flag
 *                 notification_type:
 *                   type: integer
 *                   description: Type of notification
 *                 custom:
 *                   type: string
 *                   description: Custom field for the notice
 *                 notes:
 *                   type: string
 *                   description: Additional notes for the notice
 *                 file_name:
 *                   type: string
 *                   format: binary
 *                   description: File to be attached
 *       responses:
 *         '200':
 *           description: Successfully updated notice reminder
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Notice reminder updated successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Notice reminder not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Notice reminder not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */


/**
 * @swagger
 *   /api/v1/delete_notices_reminder_details:
 *     post:
 *       summary: Delete Notices Reminder
 *       description: API to delete a notice reminder.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notices_reminder_id:
 *                   type: integer
 *                   description: ID of the notice reminder to be deleted
 *       responses:
 *         '200':
 *           description: Successfully deleted notice reminder
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Notice reminder deleted successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Notice reminder not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Notice reminder not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */

 /**
 * @swagger
 * /api/v1/get_vacant_property_list:
 *   get:
 *     summary: Get Vacant Property Details
 *     description: Retrieve details of the Vacant Property.
 *     responses:
 *       200:
 *         description: Contractor details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 UAD_KEY: 2
 *                 UAD_FIRST_NAME: "Pankaj"
 *                 UAD_LAST_NAME: "Tete"
 *                 UAD_CURR_PHYSICAL_ADD: "Gadawara"
 *                 UAD_PROFILE_PHOTO_PATH: "https://localhost:5000/upload/photo/About1.png"
 *                 UAD_CREATED_ON: "2023-11-04T06:05:20.000Z"
 *               success: true
 *               error: false
 *               message: "Get Contractor Details Successfully"
 *       500:
 *         description: Details not found or server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Details Not Found"
 *               success: false
 *               error: true
 */

/**
 * @swagger
 *   /api/v1/sendpush:
 *     post:
 *       summary: Push Notifications
 *       description: API to Push Notifications.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: userId
 *                 fcmToken:
 *                   type: string
 *                   description: fcmToken
 *                 notificationTitle:
 *                   type: string
 *                   description: notificationTitle
 *                 notificationBody:
 *                   type: string
 *                   description: notificationBody
 *       responses:
 *         '200':
 *           description: Successfully deleted notice reminder
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Notice reminder deleted successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Notice reminder not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Notice reminder not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 

/**
 * @swagger
 *   /api/v1/Search_For_Rental:
 *     post:
 *       summary: Search_For_Rental
 *       description: API to Search_For_Rental.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property_type:
 *                   type: integer
 *                   description: property_type
 *                 min_price:
 *                   type: string
 *                   description: min_price
 *                 max_price:
 *                   type: string
 *                   description: max_price
 *                 bedrooms:
 *                   type: string
 *                   description: bedrooms
 *                 bathrooms:
 *                   type: string
 *                   description: bathrooms
 *                 carspaces:
 *                   type: string
 *                   description: carspaces
 *                 on_street_parking:
 *                   type: string
 *                   description: on_street_parking
 *                 furn_unfurn:
 *                   type: string
 *                   description: furn_unfurn
 *                 pet_friendly:
 *                   type: string
 *                   description: pet_friendly
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Notice reminder  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Notice reminder not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Notice reminder not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 

/**
 * @swagger
 *   /api/v1/Profile_Completion:
 *     post:
 *       summary: Profile_Completion
 *       description: API to Profile_Completion.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: string
 *                   description: account_id
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Profile_Completion  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Profile_Completion not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Profile_Completion not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 


/**
 * @swagger
 *   /api/v1/Profile_Day:
 *     post:
 *       summary: Profile_Day
 *       description: API to Profile_Day_Trail.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: string
 *                   description: account_id
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Profile_Day_Trail  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Profile_Day_Trail not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Profile_Day_Trail not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 


/**
 * @swagger
 *   /api/v1/create_customer:
 *     post:
 *       summary: create_customer
 *       description: API to create_customer.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: name
 *                 email:
 *                   type: string
 *                   description: email
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Created  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Subscription not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Subscription not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 

/**
 * @swagger
 *   /api/v1/create_subscription:
 *     post:
 *       summary: create_subscription
 *       description: API to create_subscription.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_id:
 *                   type: string
 *                   description: customer_id
 *                 price:
 *                   type: string
 *                   description: price
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Created  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Subscription not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Subscription not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 


/**
 * @swagger
 *   /api/v1/insert_subscription:
 *     post:
 *       summary: insert_subscription
 *       description: API to insert_subscription.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: user_id
 *                 account_id:
 *                   type: integer
 *                   description: account_id
 *                 customer_id:
 *                   type: string
 *                   description: customer_id
 *                 subscription_id:
 *                   type: string
 *                   description: subscription_id
 *                 startDate:
 *                   type: string
 *                   description: startDate
 *                 endDate:
 *                   type: string
 *                   description: endDate
 *                 collection_method:
 *                   type: string
 *                   description: collection_method
 *                 subscribe_type:
 *                   type: string
 *                   description: subscribe_type
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Profile_Day_Trail  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Subscription not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Subscription not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 
 
/**
 * @swagger
 *   /api/v1/payment_intent:
 *     post:
 *       summary: payment_intent
 *       description: API to payment_intent.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: string
 *                   description: amount
 *                 currency:
 *                   type: string
 *                   description: currency
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Profile_Day_Trail  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Subscription not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Subscription not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Internal Server Error"
 */ 


/**
 * @swagger
 *   /api/v1/check_subscription:
 *     post:
 *       summary: check_subscription
 *       description: API to check_subscription.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                   description: account_id
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Profile_Day_Trail  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Subscription not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Subscription not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false    
 *                 error: true
 *                 message: "Internal Server Error"
 */ 


 /**
 * @swagger
 *   /api/v1/demo:
 *     post:
 *       summary: Create subscription
 *       description: API to subscription.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_id:
 *                   type: string
 *                   description: customer_id
 *                 price_id:
 *                   type: string
 *                   description: price_id
 *       responses:
 *         '200':
 *           description: Successfully 
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: "Create  successfully"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Bad request"
 *         '404':
 *           description: Subscription not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: true
 *                 message: "Subscription not found"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false    
 *                 error: true
 *                 message: "Internal Server Error"
 */ 






module.exports = router;
