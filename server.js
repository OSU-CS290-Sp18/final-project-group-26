
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', function(req,res){
		res.status(200).render('AllRecipes');
});

app.get('/category', function(req,res){
		res.status(200).render('Category');
});

app.get('/recipes', function(req,res){
		res.status(200).render('AllRecipes');
});

app.get('/category/:category', function(req,res){
		res.status(200).render('Category');
});

app.get('/recipes/:name', function(req,res){
		res.status(200).render('SingleRecipe');
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
