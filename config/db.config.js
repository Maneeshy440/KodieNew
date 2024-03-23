'user strict';

const mysql = require('mysql2');

//local mysql db connection
const dbConn = mysql.createConnection({
  
  host: "103.228.83.115", 
  user: "Kodiemysql", // USER NAME
  database: "kodie_new", // DATABASE NAME
  password: "Cylsys@Kodie@2",
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;