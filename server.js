
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/*****This is the test object*****/

var test_obj_elem = {
    name: 'Stir - Fried Shrimp and Scallions',
    photoURL: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F200911-xl-mama-changs-stir-fried-shrimp-and-scallions.jpg%3Fitok%3DdORctdLA&w=800&q=85',
    ingredient_list: [
        {ingredient_list_element: '1/2 pounds shelled and deveined large shrimp'},
        {ingredient_list_element: '3 garlic cloves'},
        {ingredient_list_element: 'Sliced One 1-inch piece of fresh ginger'},
    ],
    direction_list: [
        {direction_list_element: 'In a large bowl, toss the shrimp with the garlic, ginger, red pepper, egg white and 1 teaspoon of the cornstarch until well-coated.'},
        {direction_list_element: 'In a medium bowl, whisk the ketchup with the broth, sugar, pepper, salt and the remaining 1 teaspoon of cornstarch.'},
        {direction_list_element: 'In a very large skillet, heat the oil until shimmering. Add the shrimp and stir-fry over high heat until they begin to turn pink. Add the ketchup mixture and simmer until the shrimp are cooked, about 2 minutes. Stir in the scallions and cilantro and serve.'},
    ]
};
    
var test_obj = [test_obj_elem,test_obj_elem,test_obj_elem,test_obj_elem,test_obj_elem,test_obj_elem,test_obj_elem,test_obj_elem,test_obj_elem,test_obj_elem];

var cat_list = [
    {
    name: 'Meat',
    element: [
        {name: 'Pork'},
        {name: 'Beef'},
        {name: 'Chicken'},
        {name: 'Lamb'},
        {name: 'Turkey'},
        {name: 'Harry Potter'}
    ]},
    {
    name: 'Seafood',
    element: [
        {name: 'Fish'},
        {name: 'ShellFish'},
        {name: 'Shrimp'},
        {name: 'Crab'},
        {name: 'Krabby patty'},
        {name: 'HAHAHAHA'}
    ]},
    {
    name: 'Vegetable',
    element: [
        {name: 'Lettuces'},
        {name: 'Cabbage'},
        {name: 'Corn'},
        {name: 'Tomato'},
        {name: 'Potato'},
        {name: 'Jameson'}
    ]},
];


//Use to respond to the request of the index/recommend page 

app.get('/', function(req,res){	
		res.status(200).render('indexpage',{
			recommands: test_obj
		});		
});

app.use(express.static('public'));



//Use to respond to the request of the category page

app.get('/category', function (req, res) {
    res.status(200).render('categorypage', {
        cat_class: cat_list
    });
});



//Use to respond to the request of the single recipe page

app.get('/recipes', function (req, res) {
    res.status(200).render('recipepage', {
        object: [test_obj_elem]
    });
});



//Use to show the 404 page

app.get('*', function(req,res){
	res.status(404).render('404');	
});





app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
