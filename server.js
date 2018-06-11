
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

//Host: cluster0-bmwdm.gcp.mongodb.net
//User: group26
//PWD: group26
//DBname: chinese_recipe
var mongoURL = "mongodb+srv://group26:group26@cluster0-bmwdm.gcp.mongodb.net/chinese_recipe";

//THis is the data base object
var mongoDB = null;





var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


var category_list =[
    {
        name: 'Meat',
        photoURL: 'Photos/Meat/meat.jpg',
        href: '/category/Meat'
    },{
        name: 'Seafood',
        photoURL: 'Photos/Seafood/seafood.jpg',
        href: '/category/Seafood'
    },{
        name: 'Vegetable',
        photoURL: 'Photos/Vegetable/vegetable.png',
        href: '/category/Vegetable'
    },{
        name: 'Soup',
        photoURL: 'Photos/Soup/soup.jpg',
        href: '/category/Soup'
    },{
        name: 'Dessert',
        photoURL: 'Photos/Dessert/dessert.jpg',
        href: '/category/Dessert'
    },{
        name: 'Others',
        photoURL: 'Photos/Others/other.jpg',
        href: '/category/Others'
    }

]

//using body bodyParser
//app.use(bodyParser.jason());


//using app.post





//Use to respond to the request of the index/recommend page

app.get('/', function(req,res){
    //Since the reommend recipe will have a tag:
    //{recommend: "Yes"}
    //So this command is used to find all the recipe with the tag recommend: "Yes"
    //Under the 'recipe_list' collection
    var recommendList = mongoDB.collection('recipe_list').find({recommend: "Yes"});

    //This is used to convert the raw list we get into the array formation
    //The 'recommend_list' argument here is just a name of the array object we passed into the function, it could be any other name if you like.
    recommendList.toArray(function(err, recommend_list){
        if (err){
            res.status(500).send("== Error when fetching recipe_list from DB.")
        } else {
            res.status(200).render('Index',{
                recommands: recommend_list
            });
        }
    });
});


app.use(express.static('public'));



//Use to respond to the request of the category page

app.get('/category', function (req, res,nect) {
    res.status(200).render('Category', {
        category_recipe: category_list
    });
});



//Use to respond to which category is requested

app.get('/category/:Category', function(req,res){
    var cate = req.params.Category;

    //This is used to find specific kind of recipe that have category tag with the value of cate.
    var category_list_specific = mongoDB.collection("recipe_list").find({category: cate});

    category_list_specific.toArray(function(err, cat_list){
        if (err){
            res.status(500).send("== Error when fetching recipe_list from DB.")
        } else {
            res.status(200).render('OneCategory',{
                one_category: cat_list
            });
        }
    });
});

app.get('/category/:Category/:name',function(req,res,next){
    var cate = mongoDB.collection('Category')
    var name_ = req.params.name;
    cate.find({ name: name_}).toArray(function(err, Category){
      if(err){
        res.status(500).send("== Error when fetching recipe_list from DB.");
      }
      else{
        res.status(200).render('FullRecipe', Category[0]);
      }
    });

});

app.get('/recipes', function (req, res) {
    var recipeCollection = mongoDB.collection('recipe_list');
    recipeCollection.find().toArray(function(err, recipe_list){
        if (err){
            res.status(500).send("== Error when fetching recipe_list from DB.")
        } else {
            res.status(200).render('AllRecipes',{
                recipes: recipe_list
            });
        }
    });
});

app.post('/category/:Category/:name',function(req,res,next){
      var cate = req.params.Category;
      var name_ = req.params.name;
      if(req.body && req.body.recipe_name && req.body.recipe_url && req.body.recipe_ingred && req.body.recipe_direction && req.body.recipe_category){
        /*var recipe = {
          name: req.body.recipe_name,
          photoURL: req.body.recipe_url,
          ingredient: req.body.recipe_ingred,
          direction: req.body.recipe_direction,
          category: req.body.recipe_category
        };*/
        var categoryCollection = mongoDB.collection('Category');
        categoryCollection.updateOne(
          {
            name: req.body.recipe_name,
            photoURL: req.body.recipe_url,
            ingredient: req.body.recipe_ingred,
            direction: req.body.recipe_direction,
            category: req.body.recipe_category
          },
          function (err, result){
            if(err){
                res.status(500).send("Error inserting recipe into DN.")
              }
              else {
                console.log("== inset result : ", result);
                if(result.matchedCount>0){
                  res.status(200).end();
                }
                else{
                next();
                }
              }
            }
          );
        }
        else {
            res.status(400).send("Request needs a JSON body with request")
        }

});

//Use to respond to the request of the single recipe page



//Use to show the 404 page

app.get('*', function(req,res){
	res.status(404).render('404');
});



MongoClient.connect(mongoURL, function(err, client){
    if(err) {
        throw err;
    }
    mongoDB = client.db('chinese_recipe');
    app.listen(port, function() {
        console.log("== Link to the data base: chinese_recipe");
        console.log("== Listening on port", port);
    });
})
