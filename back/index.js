var express = require('express')
var mysql = require('mysql')

var app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "nimfinder"
  });

con.connect(function(err) {
    if (err) throw err;
  });

app.post("/nim", (req, res) => {
    if (req.body.query.length !== 0) {
      if (req.body.count === undefined ) {
        if (req.body.page === undefined || req.body.page === "0") {
          con.query("SELECT * FROM nimdb WHERE name like "+"\'%"+req.body.query+"%\' or nim_tpb like "+"\'%"+req.body.query+"%\' or nim_jur like "+"\'%"+req.body.query+"%\' order by nim_jur limit 10", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
          });
        } else {
          con.query("SELECT * FROM nimdb WHERE name like "+"\'%"+req.body.query+"%\' or nim_tpb like "+"\'%"+req.body.query+"%\' or nim_jur like "+"\'%"+req.body.query+"%\' order by nim_jur limit 10 OFFSET "+(parseInt(req.body.page)*10), function (err, result, fields) {
            if (err) throw err;
            res.json(result);
          });
        }
      } else {
        if (req.body.page === undefined || req.body.page === "0") {
          con.query("SELECT * FROM nimdb WHERE name like "+"\'%"+req.body.query+"%\' or nim_tpb like "+"\'%"+req.body.query+"%\' or nim_jur like "+"\'%"+req.body.query+"%\' order by nim_jur limit "+req.body.count, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
          });
        } else {
          con.query("SELECT * FROM nimdb WHERE name like "+"\'%"+req.body.query+"%\' or nim_tpb like "+"\'%"+req.body.query+"%\' or nim_jur like "+"\'%"+req.body.query+"%\' order by nim_jur limit "+req.body.count+" OFFSET "+(parseInt(req.body.page)*parseInt(req.body.count)), function (err, result, fields) {
            if (err) throw err;
            res.json(result);
          });
        }
      }
    } else {
        res.json([]);
    }
   });

app.listen(port, () => {
    console.log("Server running on port" + port);
   });