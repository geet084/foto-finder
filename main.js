document.querySelector('#search-bar').addEventListener('keyup', getSearchInput);
document.querySelector('.form-input').addEventListener('click', getFormInput);
document.querySelector('.photo-area').addEventListener('click', photoThing);

window.onload = (pullFotosFromStorage);

function pullFotosFromStorage() {
  var keys = Object.keys(localStorage);
  var numOfKeys = keys.length;
  var index = numOfKeys > 10 ? numOfKeys - 10 : 0;
  
  for(index; index < keys.length; index++) { 
    var parsedStoredFotos = JSON.parse(localStorage.getItem(keys[index]));
    buildFotoObj(parsedStoredFotos);
  }
}

function buildFotoObj(obj) {
  var aFoto = new Photo(obj.title, obj.caption, obj.id, obj.file, obj.favorite);
  addToAlbum(aFoto);
}

function getFormInput(event) {
  event.preventDefault();
  var verifyIt = event.target.classList;
  
  verifyIt.contains('choose-btn') ? cl('choose something') : 'Do nothing';
  verifyIt.contains('view-fav') ? cl('view something') : 'Do nothing';
  verifyIt.contains('add-to') ? uploadFoto() : 'Do nothing';
}

function uploadFoto(event) {
  if (getTitle() && getCaption()) {
    var photo = new Photo(getTitle(), getCaption());
    buildFotoObj(photo);
    photo.saveToStorage();
  }
}

function addToAlbum(aFoto) {
    var newCard = document.createElement('section');
    newCard.dataset.name = aFoto.id;
    aFoto.cardInfo(newCard);
    document.querySelector('.photo-area').prepend(newCard);
    aFoto.saveToStorage();
    clearInputs();
}

function getTitle() {
  return document.querySelector('#form-title').value;
}

function getCaption() {
  return document.querySelector('#form-caption').value;
}
function clearInputs() {
  document.querySelector('#form-title').value = null;
  document.querySelector('#form-caption').value = null;
}

function removeFoto(event) {
    var photo = new Photo();
    photo.deleteFromStorage(event);
    event.target.parentElement.parentElement.remove();
}

function photoThing(event) {
  if (event.target.classList.contains('del-img')) {
    removeFoto(event);
  } else if (event.target.classList.contains('fav-img')) {
    console.log('fav');
  }
}


// FOR SEARCH BAR
function getSearchInput() {
  console.log(document.querySelector('#search-bar').value);
}
