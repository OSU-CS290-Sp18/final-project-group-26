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

    for(var i=0; i < recipeInputElements.length; i++){
      var input = recipeInputElements[i].querySelector('input,textarea');
      input.value = '';
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
CancelButton.addEventListener('click', hideModal);
CloseButton.addEventListener('click', hideModal);
