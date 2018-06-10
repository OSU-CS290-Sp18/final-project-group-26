
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var indexData = require('./indexData');
var meatData = require('./meatData');
var seafData = require('./seafData');
var vegData = require('./vegData');
var dessData = require('./dessData');
var soupData = require('./soupData');
var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/*****This is the test object*****/
//The structure of the test object should be changed, this is currently used for
//alpha version of the web app


/*var recipe_obj = {
    name: 'Stir - Fried Shrimp and Scallions',
    photoURL: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F200911-xl-mama-changs-stir-fried-shrimp-and-scallions.jpg%3Fitok%3DdORctdLA&w=800&q=85',
    ingredient: "1/2 pounds shelled and deveined large shrimp; 3 garlic clovesSliced One; 1-inch piece of fresh ginger",
    direction: "Step 1: In a large bowl, toss the shrimp with the garlic, ginger, red pepper, egg white and 1 teaspoon of the cornstarch until well-coated; Step 2: In a medium bowl, whisk the ketchup with the broth, sugar, pepper, salt and the remaining 1 teaspoon of cornstarch; Step 3: In a very large skillet, heat the oil until shimmering. Add the shrimp and stir-fry over high heat until they begin to turn pink. Add the ketchup mixture and simmer until the shrimp are cooked, about 2 minutes. Stir in the scallions and cilantro and serve.",
    href: 'none'
};
*/
var category_list =[
    {
        name: 'Meat',
        photoURL: 'Photos/Meat/meat.jpg',
        href: '/category/meat'
    },{
        name: 'Seafood',
        photoURL: 'Photos/Seafood/seafood.jpg',
        href: '/category/seafood'
    },{
        name: 'Vegetable',
        photoURL: 'Photos/Vegetable/vegetable.png',
        href: '/category/vegetables'
    },{
        name: 'Soup',
        photoURL: 'Photos/Soup/soup.jpg',
        href: '/category/soup'
    },{
        name: 'Dessert',
        photoURL: 'Photos/Dessert/dessert.jpg',
        href: '/category/dessert'
    },{
        name: 'Others',
        photoURL: 'Photos/Others/other.jpg',
        href: '/category/others'
    }

]

/*
var meat_list = [
    recipe_obj,
    recipe_obj,
    recipe_obj

];
var sea_food_list = [
    recipe_obj,
    recipe_obj,
];
var veg_list = [
    recipe_obj

];
var soup_list = [
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,
    recipe_obj,

];
var dessert_list = [
    recipe_obj,
    recipe_obj
];
var others_list = [
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
];*/






app.get('/',function(req,res,next){
    if(indexData){
        var templateArgs = {
            recommands: indexData
        }
        res.status(200).render('Index',templateArgs);
    }
    else{
        next();
    }
});

app.get('/category', function (req, res,next) {
    res.status(200).render('Category', {
        category_recipe: category_list
    });
});

app.get('/category/meat', function(req, res, next){
    if(meatData){
        var templateArgs = {
            one_category: meatData
        }
        res.status(200).render('OneCategory',templateArgs);
    }
    else{
        next();
    }
});

app.get('/category/seadfood', function(req, res, next){
    if(seafData){
        var templateArgs = {
            one_category: seafData
        }
        res.status(200).render('OneCategory',templateArgs);
    }
    else{
        next();
    }
});

app.get('/category/vegetables', function(req, res, next){
    if(vegData){
        var templateArgs = {
            one_category: vegData
        }
        res.status(200).render('OneCategory',templateArgs);
    }
    else{
        next();
    }
});

app.get('/category/dessert', function(req, res, next){
    if(dessData){
        var templateArgs = {
            one_category: dessData
        }
        res.status(200).render('OneCategory',templateArgs);
    }
    else{
        next();
    }
});

app.get('/category/soup', function(req, res, next){
    if(soupData){
        var templateArgs = {
            one_category: soupData
        }
        res.status(200).render('OneCategory',templateArgs);
    }
    else{
        next();
    }
});
//Use to respond to the request of the index/recommend page


//Use to show the 404 page

app.use(express.static('public'));

app.get('*', function(req,res){
	res.status(404).render('404');
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
