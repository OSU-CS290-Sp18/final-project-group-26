
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST ||"classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME || "cs290_huangj2";
var mongoPassword = process.env.MONGO_PASSWORD || "cs290_huangj2";
var mongoDBName = process.env.MONGO_DB_NAME || "cs290_huangj2";

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB = null;

var app = express();
var port = process.env.PORT || 3000;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function(req,res,next){ //for recemended page
	var recommendsCollection = mongoDB.collection('recommends');
 recommendsCollection.find().toArray(function (err , recommends){
	 if(err){
		 res.status(500).send("Error fetching recommends from DB");
	 } else {
		 res.status(200).render('AllRecipes',{
		 reco:true,
		 recipe:recommends
	 });
	 }
 });
});

app.get('/category', function(req,res,next){ // for category page
	    var categorysCollection = mongoDB.collection('categorys');
			categorysCollection.find().toArray(function (err , categorys){
				if(err){
					res.status(500).send("Error fetching categorys from DB");
				} else {
					res.status(200).render('Category',{
					cate:true,
					category:categorys
				});
				}
			});
});

app.get('/recipes', function(req,res,next){ // for all recipes page
	var recipesCollection = mongoDB.collection('recipes');
	recipesCollection.find().toArray(function (err, recipes){
		if(err){
			res.status(500).send("Error fetching recipes from DB");
		} else {
			res.status(200).render('AllRecipes',{
				reci:true,
				recipe:recipes
			});
		}
	});
});

app.get('/category/:category', function(req,res){ // for single category page
		res.status(200).render('Category',{
			cate:true
		});
});

app.get('/recipes/:name', function(req,res){ // for single recipe page
		res.status(200).render('SingleRecipe');
});

app.use(express.static('public'));

app.use('*', function (req, res){
  res.status(404).render('404');
});

MongoClient.connect(mongoURL, function (err, client){
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
