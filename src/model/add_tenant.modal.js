const dbConn = require('../../config/db.config');

const Contact = {
  create: (contactData, callback) => {
    const {user_key, first_name, last_name, email, phone_number, note } = contactData;
    const query = 'call kodie.USP_KODIE_SAVE_PERSON_TENANT_DETAILS(?,?,?,?,?,?);';
    dbConn.query(query, [user_key,first_name, last_name, email, phone_number, note], callback);
  },

  company: (contactData, callback) => {
    const {user_key, org_name, email, phone_number,mobile_number, note } = contactData;
    const query = 'call kodie.USP_KODIE_SAVE_COMPANY_TENANT_DETAILS(?, ?, ?, ?, ?,?)';
    dbConn.query(query, [user_key,org_name, email, phone_number,mobile_number, note], callback);
  },

};


module.exports = Contact;