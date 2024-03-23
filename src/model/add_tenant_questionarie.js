'use strict';
var dbConn = require("../../config/db.config");

var tanant_questionarie = function (details) {
  this.user_key = details.user_key;
  this.uad_key = details.uad_key; // Assuming ATD_KEY is part of tanant_details
  this.tpq_move_date = details.tpq_move_date;
  this.tpq_lease_term = details.tpq_lease_term;
  this.tpq_staying_person = details.tpq_staying_person;
  this.tpq_rental_budget = details.tpq_rental_budget;
  this.tpq_paying_rent = details.tpq_paying_rent;
  this.tpq_employment_status = details.tpq_employment_status;
  this.tpq_employment_year = details.tpq_employment_year;
  this.tpq_weekly_income = details.tpq_weekly_income;
  this.tpq_end_date = details.tpq_end_date;
  this.tpq_broken_rental_agreement = details.tpq_broken_rental_agreement;
  this.tpq_previous_rental = details.tpq_previous_rental;
  this.tpq_smoking = details.tpq_smoking;
  this.tpq_any_pets = details.tpq_any_pets;
  this.tpq_type_pets = details.tpq_type_pets;
  this.tpq_is_active = details.tpq_is_active;
  this.tpq_created_by = details.tpq_created_by;
  // this.tpq_modified_by = details.tpq_modified_by;
};

tanant_questionarie.create = function (details, result) {
  let sql = `CALL USP_KODIE_INSERT_TENANT_PRERENTAL_QUESTIONNAIRE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  dbConn.query(
    sql,
    [
      details.uad_key,
      details.tpq_move_date,
      details.tpq_lease_term,
      details.tpq_staying_person,
      details.tpq_rental_budget,
      details.tpq_paying_rent,
      details.tpq_employment_status,
      details.tpq_employment_year,
      details.tpq_weekly_income,
      details.tpq_end_date,
      details.tpq_broken_rental_agreement,
      details.tpq_previous_rental,
      details.tpq_smoking,
      details.tpq_any_pets,
      details.tpq_type_pets,
      details.tpq_is_active,
      details.tpq_created_by
      // details.tpq_modified_by
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};



tanant_questionarie.findAll = function (uad_key, result) {
  let sql = `CALL USP_KODIE_GET_TENANT_SCREENING_DETAILS_UADKEY(?);`;

  // console.log("ytfyt",upd_key);
  dbConn.query(sql, [uad_key], function (err, res) {
    if (err) {
      console.error("Database Error: ", err);
      return result(err, null);
    }

    if (!res || res.length === 0) {
      return result(null, []); // Return an empty array if no records are found
    }

    result(null, res);
  });
};


module.exports = tanant_questionarie;
