var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "pandyaka_nim",
  password: "c]@rFFVTiWAq",
  database: "pandyaka_nimfinder"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;