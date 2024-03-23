"user strict";
var dbConn = require("../../config/db.config");

var tanant_details = function (details) {
  this.user_key = details.user_key;
  this.upd_key = details.upd_key;
  this.org_name = details.org_name;
  this.first_name = details.first_name;
  this.last_name = details.last_name;
  this.email = details.email;
  this.phone_number = details.phone_number;
  this.mobile_number = details.mobile_number;
  this.notes = details.notes;
  this.fileReferenceKey = details.fileReferenceKey;
  // this.module_name = details.module_name;
};

tanant_details.create = function (details, result) {
  let sql = `call USP_KODIE_SAVE_PERSON_TENANT_DETAILS(?,?,?,?,?,?,?);`;
  dbConn.query(
    sql,
    [
      details.user_key,
      details.upd_key,
      details.first_name,
      details.last_name,
      details.email,
      details.phone_number,
      details.notes
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


tanant_details.create_tenant_company = function (details, result) {
  let sql = `call USP_KODIE_SAVE_COMPANY_TENANT_DETAILS(?,?,?,?,?,?,?);`;
  dbConn.query(
    sql,
    [
      details.user_key,
      details.upd_key,
      details.org_name,
      details.email,
      details.phone_number,
      details.mobile_number,
      details.notes
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



tanant_details.findAll = function (result) {
  let sql = `call  USP_KODIE_GET_LIST_TANANT();`;
  dbConn.query(sql, function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};



tanant_details.findAllTenant_Manually = function (result) {
  let sql = `call  USP_KODIE_GETALL_TENANTS_MANUALLY();`;
  dbConn.query(sql, function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};


tanant_details.findAlldocument = function (fileReferenceKey, result) {
  let sql = `CALL USP_KODIE_GET_DOCUMENTS_DETAILS(?);`;

  dbConn.query(sql, [fileReferenceKey], function (err, res) {
    if (err) {
      console.error("Database Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

tanant_details.findtenant_manually_by_upd = function (upd_key_param, result) {
  let sql = 'CALL USP_KODIE_GET_TENANTS_MANUALLY_UPD_KEY(?)';

  dbConn.query(sql, [upd_key_param], function (err, res) {
    if (err) {
      console.error("Database Error: ", err);
      return result({
        code: 'DatabaseError',
        message: 'Internal database error',
        error: err,
      }, null);
    }

    if (!res || res.length === 0 || !res[0][0]) {
      return result({
        code: 'NoDataFound',
        message: 'No tenant details found',
      }, null);
    }

    return result(null, res[0]);
  });
};




tanant_details.finddocument = function (module_name, fileReferenceKey, result) {

  // if (!['Lease', 'Property', 'Tenant'].includes(module_name)) {
  //   return result({
  //     code: 'InvalidModuleName',
  //     message: 'Invalid module name. Please provide either "Lease", "Property", or "Tenant"',
  //   }, null);
  // }
  if (!['Lease', 'Property', 'Tenant', 'Identity_documents', 'Proof_of_address', 'Banking_documents', 'Employment_documents', 'Screening_documents', 'Other_documents', 'Company_documents', 'Licenses', 'Certifications', 'Insurance_and_indemnity', 'Company_references', 'Job_proposal', 'Job_Invoice', 'Job_Completed'].includes(module_name)) {
    return result({
      code: 'InvalidModuleName',
      message: 'Invalid module name',
    }, null);
  }

  let sql = `CALL USP_KODIE_GET_DOCUMENTBY_MODULENAME(?, ?);`;

  dbConn.query(sql, [module_name, fileReferenceKey], function (err, res) {
    if (err) {
      console.error("Database Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


module.exports = tanant_details;  