/*
function jumptoPage(target) {
    xhttp.send('/' + target);
}



/*****This is the listener function*****

var recommend_button = document.getElementById('nav_recommend');
if (recommend_button) {
    //This is used to just to the recommendation which is the index page
    recommend_button.addEventListener('click', jumptoPage('indexpage'));
}

*/





// this function will unhide the showCreateRecipeModal
function showCreateRecipeModal(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var CreateRecipeModal = document.getElementById('create-recipe-modal');

  modalBackdrop.classList.remove('hidden');
  CreateRecipeModal.classList.remove('hidden');
}

//This will be click the button of create-recipe function
var createButton = document.getElementById('create-recipe-button');
if(createButton){
   createButton.addEventListener('click', showCreateRecipeModal);
}

//this will be the function to clean all input data after user click cancel
// button, close button or accept button
function cleanInputData(){
    var recipeInputElements = document.getElementsByClassName('recipe-input-element');

    for(var i=0; i < recipeInputElements.length-1; i++){
      var input = recipeInputElements[i].querySelector('input,textarea');
      input.value ='';
    }
}

function hideModal(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var CreateRecipeModal = document.getElementById('create-recipe-modal');

  modalBackdrop.classList.add('hidden');
  CreateRecipeModal.classList.add('hidden');

  cleanInputData();

}
//This will be click hidden function

var CancelButton = document.querySelector('.modal-cancel-button');
var CloseButton = document.querySelector('.modal-close-button');
CancelButton  .addEventListener('click', hideModal);
CloseButton.addEventListener('click', hideModal);

var allrecipes = [];

function acceptContent(){
    var recipe_name = document.getElementById('recipe-name-input').value;
    var recipe_img_url = document.getElementById('recipe-url-input').value;
    var recipe_ingred = document.getElementById('recipe-ingredient-input').value;
    var recipe_direction = document.getElementById('recipe-direction-input').value;
    var recipe_category = document.getElementById('recipe-category-input').value;

    console.log("== Catch new target!");
    console.log(
        "Name:" + recipe_name,
        "Img:" + recipe_img_url,
        "Ingredient: " + recipe_ingred,
        "Direction: " + recipe_direction,
        "Category: " + recipe_category
    );


    if(!recipe_name || !recipe_img_url || !recipe_ingred || !recipe_direction){
        alert("You must fill out all content of a recipe");
    }
    else{
        var request = new XMLHttpRequest();
        //This is the URL that will post to the server
        var url = "/category/addRecipe";
        request.open("POST", url);
        var requestBody = JSON.stringify({
          name: recipe_name,
          photoURL: recipe_img_url,
          ingredient: recipe_ingred,
          direction: recipe_direction,
          category: recipe_category
        });

        request.addEventListener('load',function (event){
            if(event.target.status === 200 && document.queryCommandValue('.all_recipe_container')){
                var singleRecipeTemp = Handlebars.templates.SimpleRecipe;
                var newRecipeHTML = SimpleRecipe({
                  name: recipe_name,
                  photoURL: recipe_img_url
                });
                var RecipeContainer = document.querySelector('.all_recipe_container');
                RecipeContainer.insertAdjacentHTML('beforeend', newRecipeHTML);
            }
            else if(document.querySelector('.all_recipe_container') == false)
            {
                console.log("== Not in the All Recipe Page");
            }
            else
            {
                alert("Error adding recipe: " + event.target.response);
            }
        });
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(requestBody);
        cleanInputData();
        hideModal();
    }
}



//This will be accept button
var acceptButton = document.querySelector('.modal-accept-button');
acceptButton.addEventListener('click', acceptContent);

var searchInput = document.getElementById('navbar-search-input');

searchInput.addEventListener('change',function(event){
  var searchLink = document.getElementById('navbar-search-link');
  var textInput = event.target.value;
  var searchURL;
  if(!textInput){
    searchURL = "/recipes";
  }
  else{
    searchURL ="/recipes" +"/"+ textInput;
  }
  searchLink.href = searchURL;
});
