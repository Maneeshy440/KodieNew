"use strict";
var dbConn = require("../../config/db.config");

var property_expenses_details = function (details) {
  this.upd_key = details.upd_key;
  this.user_key = details.user_key;
  this.total_amount = details.total_amount;
  this.total_amount_excl_tax = details.total_amount_excl_tax;
  this.tax = details.tax;
  this.due_date = details.due_date;
  this.repeating_expense = details.repeating_expense;
  this.responsible_paying = details.responsible_paying;
  this.expense_category = details.expense_category;
  this.supplier = details.supplier;
  this.expenses_description = details.expenses_description;
  this.note = details.note;
  this.paid = details.paid;
  this.start_date = details.start_date;
  this.is_active = details.is_active;
//   this.lease_key = details.lease_key; // Adjust this line based on your actual structure if needed
};

property_expenses_details.create = function (details, result) {
  let sql = `CALL USP_KODIE_INSERT_EXPENSES_DETAILS(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  dbConn.query(
    sql,
    [
      details.upd_key,
      details.user_key,
      details.total_amount,
      details.total_amount_excl_tax,
      details.tax,
      details.due_date,
      details.repeating_expense,
      details.responsible_paying,
      details.expense_category,
      details.supplier,
      details.expenses_description,
      details.note,
      details.paid,
      details.start_date,
      details.is_active,
    //   details.lease_key,
      // Add more parameters if needed
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



property_expenses_details.findAll = function (upd_key, result) {
  let sql = `CALL USP_KODIE_GET_EXPENSESDETAILS_PROPERTYKEY(?);`;

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


property_expenses_details.findAllExpensesDetails = function (Expenses_key, result) {
  let sql = `CALL USP_KODIE_GET_EXPENSESDETAILS_EXPENSEKEY(?);`;

  // console.log("ytfyt",upd_key);
  dbConn.query(sql, [Expenses_key], function (err, res) {
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



module.exports = property_expenses_details; 