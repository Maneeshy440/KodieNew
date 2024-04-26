const express = require("express");
const bodyParser = require("body-parser");
(swaggerJsdoc = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));

// const doenv = require("dotenv");
require("dotenv").config();
const nodemailer = require("nodemailer");
// const file1 = require('./src/middleware/i-card3.html');
// const routes = require('./Route/register_routes');
// create express app
const dbConn = require("./config/db.config");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:4200", "https://kodieapis.cylsys.com"],
  })
);
// Setup server port
const port = process.env.PORT || 8000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hello world");
});
const Router = require("./src/route/Router");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
      // {
      //   url: "https://kodieapis.cylsys.com",
      // },
      {
        url: "https://kodietestapi.cylsys.com",
      },
    ],
  },
  // apis: ["./routes/*.js"],
  apis: ["./src/route/*.js"], // Path to your route file
};

const specs = swaggerJsdoc(options);
app.use(
  "/rest-apis",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

/** Swagger Initialization - END */
const tanant_details = require("./src/route/tanant_details");
const document = require("./src/route/document");
const add_tenantrouter = require("./src/route/add_tenant.route");
const add_tenant_questionarie = require("./src/route/add_tenant_questionarie");
const property_lease_details = require("./src/route/property_lease_details");
const property_expenses_details = require("./src/route/property_expenses_details");
const job_details = require("./src/route/job_route");
const lookup = require("./src/route/lookup");
const add_property_details = require("./src/route/add_property_details");
const contractor = require("./src/route/contractor");
const profile_update = require("./src/route/profile_route");
const search_contractor_routes = require("./src/route/search_contractor_routes");
const notices_reminder = require("./src/route/notices_reminder");
const push_notification = require("./src/route/push_notification");
const subscription = require("./src/route/subscription_route");
const request_save = require("./src/common/request");
const market_place =require("./src/route/marketplace_routes");

/** Swagger Initialization - END */
/**  defining an endpoint */


// error_log code start
app.use(async (req, res, next) => {
  try {
    const request_id = await request_save.get_request(req);
    console.log(request_id, "1212");
    
    const originalSend = res.send;
    res.send = function (data) {
      console.log(`Sent ${res.statusCode} response for ${data}`);
      if (res.statusCode === 200) {
        console.log(request_id, "1promise");
        // console.log(data, "inner data");
        const request_update =  request_save.get_update_log(request_id, data);
        console.log("request_update", request_update);
      } else {
        // console.log(data, "response_show");
        const request_insert =  request_save.get_error_log(
          req,
          res,
          data
        );
        console.log(request_insert, "request_insert");
        console.log("else");
      }
      originalSend.call(this, data);
    };

    next();
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
    next(error); // Pass error to Express error handling middleware
  }
});

// error_log code end
app.use("/api/v1", notices_reminder);
app.use("/api/v1", market_place);
app.use("/api/v1", push_notification);
app.use("/api/v1", search_contractor_routes);
app.use("/api/v1", Router);
app.use("/api/v1", contractor);
app.use("/api/v1", lookup);
app.use("/api/v1", add_property_details);
app.use("/api/v1/job", job_details);
app.use("/upload/images", express.static("upload/images"));
app.use("/api/v1", document);
app.use("/upload/documents", express.static("upload/documents"));
app.use("/upload/photo", express.static("upload/photo"));
app.use("/api", add_tenantrouter);
app.use("/api/v1/property_expenses_details", property_expenses_details);
app.use("/api/v1/property_lease_details", property_lease_details);
app.use("/api/v1/tanant_details", tanant_details);
app.use("/api/v1/add_tenant_questionarie", add_tenant_questionarie);
app.use("/api/v1/profile", profile_update);
app.use("/api/v1", subscription);
// listen for requests

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});

/**  starting the server */
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
