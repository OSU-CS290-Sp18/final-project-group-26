
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/*****This is the test object*****/
//The structure of the test object should be changed, this is currently used for
//alpha version of the web app
var recipe_obj = {
    name: 'Stir - Fried Shrimp and Scallions',
    photoURL: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F200911-xl-mama-changs-stir-fried-shrimp-and-scallions.jpg%3Fitok%3DdORctdLA&w=800&q=85',
    ingredient: "1/2 pounds shelled and deveined large shrimp; 3 garlic clovesSliced One; 1-inch piece of fresh ginger",
    direction: "Step 1: In a large bowl, toss the shrimp with the garlic, ginger, red pepper, egg white and 1 teaspoon of the cornstarch until well-coated; Step 2: In a medium bowl, whisk the ketchup with the broth, sugar, pepper, salt and the remaining 1 teaspoon of cornstarch; Step 3: In a very large skillet, heat the oil until shimmering. Add the shrimp and stir-fry over high heat until they begin to turn pink. Add the ketchup mixture and simmer until the shrimp are cooked, about 2 minutes. Stir in the scallions and cilantro and serve."
};

var category_list =[
    {
        name: 'Meat',
        photoURL: 'Photos/Meat/meat.jpg'
    },{
        name: 'Seafood',
        photoURL: 'Photos/Seafood/seafood.jpg'
    },{
        name: 'Vegetable',
        photoURL: 'Photos/Vegetable/vegetable.png'
    },{
        name: 'Soup',
        photoURL: 'Photos/Soup/soup.jpg'
    },{
        name: 'Desset',
        photoURL: 'Photos/Dessert/dessert.jpg'
    },{
        name: 'Others',
        photoURL: 'Photos/Others/other.jpg'
    }

]


var meat_list = [
    recipe_obj,
    recipe_obj,
    recipe_obj

];

var recipe_list = [
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj
];


//Use to respond to the request of the index/recommend page

app.get('/', function(req,res){
		res.status(200).render('Index',{
			recommands: recipe_list
		});
});


app.use(express.static('public'));


//Use to respond to the request of the category page

app.get('/category', function (req, res) {
    res.status(200).render('Category', {
        category_recipe: category_list
    });
});

//Use to respond to which category is requested

app.get('/category/meat', function(req, res){
    res.status(200).render('OneCategory', {
        one_category: meat_list
    });
});





//Use to respond to the request of the single recipe page

app.get('/recipes', function (req, res) {
    res.status(200).render('AllRecipes', {
        recipes: recipe_list
    });
});




//Use to show the 404 page

app.get('*', function(req,res){
	res.status(404).render('404');
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
