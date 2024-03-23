"use strict";
var dbConn = require("../../config/db.config");

var property_lease_details = function (details) {
  this.user_key = details.user_key;
  this.upd_key = details.upd_key;
  this.commencement_date = details.commencement_date;
  this.rental_lease_term = details.rental_lease_term;
  this.rental_amount = details.rental_amount;
  this.rental_bond_amount = details.rental_bond_amount;
  this.rental_payment_frequency = details.rental_payment_frequency;
  this.payment_due_day = details.payment_due_day;
  this.first_rental_payment = details.first_rental_payment;
  this.set_notification_type = details.set_notification_type;
  this.is_active = details.is_active;
  this.lease_key = details.lease_key;
  this.total_amount = details.total_amount;
  this.payment_date = details.payment_date;
  this.rental_payment_period = details.rental_payment_period;
  this.payment_period_complete = details.payment_period_complete;
  this.payment_period_skipped = details.payment_period_skipped;
  this.create_rental_receipt = details.create_rental_receipt;
  this.note = details.note;
  this.lease_expire = details.lease_expire;
  this.rent_payment = details.rent_payment;
  this.late_rental = details.late_rental;
  this.lease_expiry_reminder = details.lease_expiry_reminder;
  this.rent_payment_reminder = details.rent_payment_reminder;
  this.late_rental_reminder = details.late_rental_reminder;
};

property_lease_details.create = function (details, result) {
  let sql = `CALL USP_KODIE_INSERT_LEASE_DETAILS(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  dbConn.query(
    sql,
    [
      details.user_key,
      details.upd_key,
      details.commencement_date,
      details.rental_lease_term,
      details.rental_amount,
      details.rental_bond_amount,
      details.rental_payment_frequency,
      details.payment_due_day,
      details.first_rental_payment,
      details.set_notification_type,
      details.is_active,
      details.lease_expire,
      details.rent_payment,
      details.late_rental,
      details.lease_expiry_reminder,
      details.rent_payment_reminder,
      details.late_rental_reminder
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


property_lease_details.create_rental_payment_log = function (details, result) {
  let sql = `CALL USP_KODIE_LOG_RENTAL_PAYMENT(?, ?, ?, ?, ?, ?, ?, ?);`;

  dbConn.query(
    sql,
    [
      details.lease_key,
      details.total_amount,
      details.payment_date,
      details.rental_payment_period,
      details.payment_period_complete,
      details.payment_period_skipped,
      details.create_rental_receipt,
      details.note
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

// ===========================================================lEASE DETAILS BY PROPERTY KEY=======================================

property_lease_details.findAll = function (upd_key, result) {
  let sql = `CALL USP_KODIE_Get_LeaseDetailsByUpdKey(?);`;

  console.log("ytfyt",upd_key);
  dbConn.query(sql, [upd_key], function (err, res) {
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

// ===============================================PAYMENT DETAILS===================================================

property_lease_details.find_PAYMENT_DETAILS = function (upd_key, result) {
  let sql = `CALL USP_KODIE_Get_LOG_RENTAL_PAYMENT(?);`;

 
  dbConn.query(sql, [upd_key], function (err, res) {
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

// =======================================LEASE DETAILS BY LEASE KEY==============================================================

property_lease_details.findAllleaseDetails = function (lease_key, result) {
  let sql = `CALL USP_KODIE_Get_LeaseDetails_LEASEKEY(?);`;

  // console.log("ytfyt",upd_key);
  dbConn.query(sql, [lease_key], function (err, res) {
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



module.exports = property_lease_details;  