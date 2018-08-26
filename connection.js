var mysql = require('mysql');
var http = require('http');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cookbuk"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "create table if not exists caterer (caterer_id int auto_increment primary key, address text, Mobile int, rating varchar(20))";
  con.query(sql, function(err, result){
    if(err)throw err;
    console.log("Table created");
  });
});

module.exports = con;