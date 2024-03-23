const fs = require("fs");
const path = require('path');
var FCM = require('fcm-node');
const { log } = require("console");
const pool = require('../../config/db.config')

// const v = require('../../FireBaseConfig.json')

const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.sendPushNotification = async (req, res) => {

  try {

    // Save FCM token and notification details to the MySQL table
  //   const savePushNotificationQuery = `
  //   INSERT INTO tbl_push_notification
  //     (TPN_USER_KEY, TPN_FCM_TOKEN, TPN_NOTIFICATION_BODY, TPN_NOTIFICATION_TITLE)
  //   VALUES (?, ?, ?, ?)
  // `;

  const savePushNotificationQuery = `call USP_KODIE_SAVE_PUSH_NOTIFICATION(?,?,?,?);`;

    const values = [req.body.userId, req.body.fcmToken, req.body.notificationBody, req.body.notificationTitle]
    console.log(values);
    // Function to execute MySQL queries

    await executeQuery(savePushNotificationQuery, values);

    // Retrieve FCM tokens from the MySQL table
    const pushTokensQuery = 'SELECT TPN_FCM_TOKEN,TPN_USER_KEY,TPN_NOTIFICATION_TITLE,TPN_NOTIFICATION_BODY FROM tbl_push_notification WHERE TPN_USER_KEY = ?';
    const pushTokens = await executeQuery(pushTokensQuery, [req.body.userId]);
    console.log("pushTokens", pushTokens, pushTokens[0].TPN_USER_KEY);


    fs.readFile(path.join(__dirname, '../../FireBaseConfig.json'), "utf8", async (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return err;
      }
      try {

        //firebase push notification send
        const data = JSON.parse(jsonString);
        var serverKey = data.SERVER_KEY;
        var fcm = new FCM(serverKey);

        var push_tokens = pushTokens;


        var reg_ids = [];
        push_tokens.forEach(token => {
          reg_ids.push(token.TPN_FCM_TOKEN)
        })

        if (reg_ids.length > 0) {

          var pushMessage = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: reg_ids,
            content_available: true,
            mutable_content: true,
            notification: {
              body: pushTokens[0].TPN_NOTIFICATION_BODY,
              title: pushTokens[0].TPN_NOTIFICATION_TITLE,
              icon: 'myicon',//Default Icon
              sound: 'mySound',//Default sound
              // badge: badgeCount, example:1 or 2 or 3 or etc....
            },
            // data: {
            //   notification_type: 5,
            //   conversation_id:inputs.user_id,
            // }
          };

          fcm.send(pushMessage, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!", err);
              return res.status(401).json({
                message: JSON.parse(err),
                success: "false",
                data: serverKey,
                token: reg_ids,
                errors: "true",
              });

            } else {
              console.log("Push notification sent.", response);
              return res.status(200).json({
                message: JSON.parse(response),
                success: "true",
                errors: "false",
              });

            }
          });

        }


      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });

  } catch (error) {
    console.log(error);
  }

}

