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


function hideModal(){
  var modalBackdrop = document.getElementsByClassName('hidden');
  for(var i = 0 ; i < modalBackdrop.length; i++){
        modalBackdrop[i].style.display = 'none';
  }
}
//This will be click hidden function

var CancelBackdrop = document.querySelector('.modal-cancel-button');

CancelBackdrop.addEventListener('click', hideModal);
