const express = require('express');
const app = express();
var mysql = require('mysql');
var con = require('./connection');


app.set('view engine', 'ejs');
app.use( express.static( "public" ) );


app.get('/', function(req, res){
    res.render('index');
});

//copy-paste work
//const port = 3000;

//var express = require('express'),
  //  app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('index');// if jade
  // You should use one of line depending on type of frontend you are with
  res.sendFile(__dirname + 'views/index.ejs'); //if html file is root directory
 //clres.sendFile("index.ejs"); //if html file is within public directory
});

app.post('/',function(req,res){
  // var username = req.body.username;
  TypeOfEvent = req.body.Events;
  Location = req.body.Location;
//    sql_query = "SELECT CatererName FROM caterer where TypeOfEvent = \"" + TypeOfEvent + "\" and Location = \"" + Location + "\" and url = \"" + url + "\"";
      sql_query = "SELECT caterer_id, CatererName, url, rating, CuisineSpecializations FROM caterer where TypeOfEvent = \"" + TypeOfEvent + "\" and Location = \"" + Location + "\"";
  // var query = con.query("SELECT CatererName FROM caterer where TypeOfEvent = 'Corporates Event' and Location = 'Indiranagar'", function (err, result, fields) {
      //var query_result = 
    con.query(sql_query, function(err, result){
    if (err) throw err;
    var string=JSON.stringify(result);
    var data = JSON.parse(string);
    console.log(result);
    res.render('list', {data: data});
    //res.sendFile(__dirname + '/views/list.ejs',{data: result});
  });
   
});

app.get('/caterer/:id', function(req, res){
    id = req.params.id;
    sql_query = "select * from caterer c inner join CatererDetails cd on c.caterer_id = cd.caterer_id where c.caterer_id=\"" + id + "\"";
    con.query(sql_query, function(err, result){
        if(err) throw err;
        var string = JSON.stringify(result);
        var data = JSON.parse(string);
        console.log(data);
        res.render('details', {data: data});
    });
});

//app.listen(port);

app.listen(3000, function(){
    console.log('server connected');
});