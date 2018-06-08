
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', function(req,res){ //for recemended page
		res.status(200).render('AllRecipes',{
			reco:true // control navbar active tag
		});
});

app.get('/category', function(req,res){ // for category page
		res.status(200).render('Category',{
			cate:true
		});
});

app.get('/recipes', function(req,res){ // for all recipes page
		res.status(200).render('AllRecipes',{
			reci:true
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

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
