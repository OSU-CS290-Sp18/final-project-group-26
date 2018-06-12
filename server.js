//$: git clone https://github.com/OSU-CS290-Sp18/final-project-group-26.git master
//$: mongo "mongodb+srv://cluster0-bmwdm.gcp.mongodb.net/test" --username group26


var path = require('path');
var fs = require('fs');
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

app.use(bodyParser.json());


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

app.get('/category/:Category', function(req,res,next){
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

app.get('/recipes/:name',function(req,res,next){
    var recipe_list = mongoDB.collection('recipe_list');
    var name_ = req.params.name;
    recipe_list.find({ name: name_}).toArray(function(err, Category){
        if(err)
        {
            res.status(500).send("== Error when fetching recipe_list from DB.");
        }
        else if(Category.length==0){
          res.status(404).send("We can't found this recipe :<");
        }
        else
        {
            var target_recipe = Category[0];
            var ingred_list = target_recipe.ingredient;
            var direc_list = target_recipe.direction;

            //Start convert the ingredient list
            ingred_list = ingred_list.split(";");
            for(var i = 0; i<ingred_list.length; i++)
            {
                ingred_list[i] = {ingredients: ingred_list[i] + '.'};
            }

            //Start convert the direction list
            direc_list = direc_list.split(";");
            for(var i = 0; i<direc_list.length; i++)
            {
                direc_list[i] = {directions: direc_list[i] + '.'};
            }

            //Make new object
            target_recipe.ingredient = ingred_list;
            target_recipe.direction = direc_list;

            res.status(200).render('SingleRecipe', target_recipe);
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

app.post('/category/addRecipe',function(req,res,next){
    var cate = req.params.Category;
    var name_ = req.params.name;
    console.log("== Req.body: ", req.body);
    if(req.body && req.body.name && req.body.photoURL && req.body.ingredient && req.body.direction && req.body.category){
    /*var recipe = {
    name: req.body.recipe_name,
    photoURL: req.body.recipe_url,
    ingredient: req.body.recipe_ingred,
    direction: req.body.recipe_direction,
    category: req.body.recipe_category
    };*/
        var categoryCollection = mongoDB.collection('recipe_list');
        categoryCollection.insertOne(
            {
                name: req.body.name,
                photoURL: req.body.photoURL,
                ingredient: req.body.ingredient,
                direction: req.body.direction,
                category: req.body.category
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
        });
    }
    else {
        res.status(400).send("Request needs a JSON body with request");
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
