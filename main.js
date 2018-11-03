document.querySelector('#search-bar').addEventListener('keyup', getSearchInput);
document.querySelector('.form-input').addEventListener('click', getFormInput);
document.querySelector('.photo-area').addEventListener('click', photoThing);

window.onload = (pullPhotosFromStorage);

function pullPhotosFromStorage() {
  var keys = Object.keys(localStorage);
  var numOfKeys = keys.length;
  var index = numOfKeys > 10 ? numOfKeys - 10 : 0;
  
  for(index; index < keys.length; index++) { 
    var parsedStoredPhotos = JSON.parse(localStorage.getItem(keys[index]));
    buildPhotoObj(parsedStoredPhotos);
  }
}

function getFormInput(event) {
  event.preventDefault();
  var verifyIt = event.target.classList;
  
  verifyIt.contains('choose-btn') ? console.log('choose something') : 'Do nothing';
  verifyIt.contains('view-fav') ? console.log('view something') : 'Do nothing';
  verifyIt.contains('add-to') ? uploadPhoto() : 'Do nothing';
}

function uploadPhoto(event) {
  if (getTitle() && getCaption()) {
    var photo = new Photo(getTitle(), getCaption());
    buildPhotoObj(photo);
    photo.saveToStorage();
  }
}

function buildPhotoObj(obj) {
  var photo = new Photo(obj.title, obj.caption, obj.id, obj.file, obj.favorite);
  addToAlbum(photo);
}

function addToAlbum(photo) {
    var newCard = document.createElement('section');
    newCard.dataset.name = photo.id;
    photo.cardInfo(newCard);
    document.querySelector('.photo-area').prepend(newCard);
    photo.saveToStorage();
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

function removePhoto(event) {
    var photo = new Photo();
    photo.deleteFromStorage(event);
    event.target.parentElement.parentElement.remove();
}

function photoThing(event) {
  if (event.target.classList.contains('del-img')) {
    removePhoto(event);
  } else if (event.target.classList.contains('fav-img')) {
    console.log('fav');
  }
}

document.querySelector('.photo-area').addEventListener('keydown', editPhotoCard);

function editPhotoCard(event) {
  if (event.keyCode === 13 || event.keyCode === 9) {
    event.preventDefault();
    updatePhotoCard(event);
  }
}

function updatePhotoCard(event) {
  var getPhotoId = localStorage.getItem(event.target.closest('section').dataset.name);
  var obj = JSON.parse(getPhotoId);
  var photo = new Photo(obj.title, obj.caption, obj.id, obj.file, obj.favorite);

  if (event.target.classList.contains('card-title')) {
    photo.title = event.target.innerText;
    photo.saveToStorage();
  } else if (event.target.classList.contains('card-caption')) {
    photo.caption = event.target.innerText;
    photo.saveToStorage();
  }
}



// FOR SEARCH BAR
function getSearchInput() {
  console.log(document.querySelector('#search-bar').value);
}
