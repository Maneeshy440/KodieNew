// const dbConn = require('../../config/db.config').promise();
// const nodemailer = require('nodemailer');
// const { validationResult } = require('express-validator');

// exports.forgetOTP = async (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     // Function to generate OTP
//     function generateOTP(length) {
//         const charset = '0123456789';

//         let otp = '';
//         for (let i = 0; i < length; i++) {
//             const randomIndex = Math.floor(Math.random() * charset.length);
//             otp += charset[randomIndex];
//         }

//         return otp;
//     }

//     const otp = generateOTP(6);

//     // Function to store OTP in the database
//     async function storeOTP(email, otp) {
//         try {
//             const query = 'call TOG_KODIE_SIGNUP_OTP(?,?)';
//             const [rows] = await dbConn.execute(query, [email, otp]);

//             if (rows.affectedRows === 1) {
//                 return true; // Success
//             } else {
//                 return false; // Failed to insert OTP
//             }
//         } catch (error) {
//             console.error('Error storing OTP:', error);
//             return false;
//         }
//     }

//     // Function to send OTP via email
//     async function sendOTPEmail(email, otp) {
//         const transporter = nodemailer.createTransport({
//             host: "smtp-mail.outlook.com",
//             secure: false, // Use "secure" instead of "secureConnection"
//             port: 587,
//             auth: {
//                 user: "maneesh.yadav@cylsys.com",
//                 pass: "Micromax@2",
//             },
//         });

//         const mailOptions = {
//             from: 'maneesh.yadav@cylsys.com',
//             to: email,
//             subject: 'OTP for Reset Password',
//             text: `Your OTP is: ${otp}`
//         };

//         try {
//             await transporter.sendMail(mailOptions);
//             return true;
//         } catch (error) {
//             console.error(error);
//             return false;
//         }
//     }

//     // Usage
//     const email = req.body.email; // Get the user's email from the request
//     const isStored = await storeOTP(email, otp);

//     if (isStored) {
//         const isEmailSent = await sendOTPEmail(email, otp);

//         if (isEmailSent) {
//             return res.status(200).json({ message: 'OTP sent successfully' });
//         } else {
//             return res.status(400).json({ error: 'Failed to send OTP' });
//         }
//     } else {
//         return res.status(500).json({ error: 'Failed to store OTP' });
//     }
// }


const dbConn = require('../../config/db.config').promise();
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

exports.forgetOTP = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Function to generate OTP
    function generateOTP(length) {
        const charset = '0123456789';

        let otp = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            otp += charset[randomIndex];
        }

        return otp;
    }

    // Function to call SQL function and store OTP
    async function storeOTP(email, otp) {
        try {
            const query = 'SELECT UFUN_KODIE_FORGET_UPDATE_OTP_DETAILS(?, ?) AS result';
            const [rows] = await dbConn.execute(query, [email, otp]);

            if (rows.length === 1 && rows[0].result === 1) {
                return otp; // Success
            } else {
                return null; // Failed to store OTP
            }
        } catch (error) {
            console.error('Error storing OTP:', error);
            return null;
        }
    }

    // Function to send OTP via email
    async function sendOTPEmail(email, otp) {
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secure: false, // Use "secure" instead of "secureConnection"
            port: 587,
            auth: {
                user: "maneesh.yadav@cylsys.com",
                pass: "Maneesh@06",
            },
        });

        const mailOptions = {
            from: 'maneesh.yadav@cylsys.com',
            to: email,
            subject: 'OTP for Reset Password',
            text: `Your OTP is: ${otp}`
        };


        try {
            await transporter.sendMail(mailOptions);
            return true; // Email sent successfully
        } catch (error) {
            console.error('Error sending email:', error);
            return false; // Failed to send email
        }
    }

    // Usage
    const email = req.body.email; // Get the user's email from the request
    const generatedOTP = generateOTP(6);

    if (generatedOTP) {
        const isStored = await storeOTP(email, generatedOTP);

        if (isStored) {
            const isEmailSent = await sendOTPEmail(email, generatedOTP);

            if (isEmailSent) {
                return res.status(200).json({
                    success: true,
                    errors: false,
                    message: 'OTP sent successfully'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    errors: true,
                    message: 'Failed to send OTP'
                });
            }
        } else {
            return res.status(500).json({
                success: false,
                errors: true,
                message: 'Failed to store OTP'
            });
        }
    } else {
        return res.status(500).json({
            success: false,
            errors: true,
            message: 'Failed to generate OTP'
        });
    }
}
