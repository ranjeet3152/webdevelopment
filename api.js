var express = require('express');
var app = express;
var con = require('./connection');
var bodyparser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json);

module.exports = function(app){
    app.get('/public', function(req, res){
        Location = req.params.Location;
        TypeOfEvent = req.params.TypeOfEvent;
        sql_query = "SELECT BusinessName FROM caterer where Location = \"" + Location + "\" and TypeOfEvent = " + TypeOfEvent ;
        con.query(sql_query ,function (error, results, fields) {
            if(results.length <= 0){
              res.send("Safe to access");
            }
            else{
              res.send("Unsafe!! Don't proceed");
            }
            if(error){
         }     
      });
    });
    }