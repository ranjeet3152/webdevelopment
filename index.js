const express = require('express');
const app = express();
var mysql = require('mysql');
var con = require('./connection');

app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

app.get('/', function(req, res){
    res.render('index');
});
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('index');
});

app.post('/',function(req,res){
  TypeOfEvent = req.body.Events;
  Location = req.body.Location;
      sql_query = "SELECT caterer_id, CatererName, url, rating, CuisineSpecializations FROM caterer where TypeOfEvent = \"" + TypeOfEvent + "\" and Location = \"" + Location + "\""; 
    con.query(sql_query, function(err, result){
    if (err) throw err;
    var string=JSON.stringify(result);
    var data = JSON.parse(string);
    res.render('list', {data: data});
  });
   
});

app.get('/caterer/:id', function(req, res){
    id = req.params.id;
    sql_query = "select * from caterer c left join CatererDetails cd on c.caterer_id = cd.caterer_id where c.caterer_id=\"" + id + "\"";
    con.query(sql_query, function(err, result){
        if(err) throw err;
        var string = JSON.stringify(result);
        var data = JSON.parse(string);
        res.render('details', {data: data});
    });
});

app.listen(3000, function(){
    console.log('server connected');
});