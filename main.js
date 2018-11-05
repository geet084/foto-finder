select('#search-bar').addEventListener('keyup', getSearchInput);
select('.form-input').addEventListener('click', getFormInput);
select('.photo-area').addEventListener('click', photoCardActions);
select('.photo-area').addEventListener('keydown', editPhotoCard);
select('.photo-area').addEventListener('focusout', updatePhotoCardContent);


function select(field) {
  return document.querySelector(field);
}

function ifClassIs(aClass) {
  return event.target.classList.contains(aClass);
}

window.onload = (pullPhotosFromStorage);

function pullPhotosFromStorage() {
  var keys = Object.keys(localStorage);
  var index = keys.length > 10 ? keys.length - 10 : 0;
  
  for(index; index < keys.length; index++) { 
    var photoCard = JSON.parse(localStorage.getItem(keys[index]));
    addToPage(buildPhotoObj(photoCard));
  }
}

function getFormInput(event) {
  if (ifClassIs('view-fav')) console.log('view ');
  if (ifClassIs('add-to')) retrieveFormInput(event);
}

function retrieveFormInput(event) {
  var reader = new FileReader();

  reader.readAsDataURL(select('.choose-file').files[0]);
  uploadtoAlbum(reader);
}

function uploadtoAlbum(reader) {
  reader.onload = function() {
    var output = select('.choose-file');
    output.src = reader.result;
    var photo = new Photo(getTitle(), getCaption(), output.src);
    if (getTitle() && getCaption() ) addToPage(photo);
    photo.saveToStorage();
  };
}

function buildPhotoObj(obj) {
  return new Photo(obj.title, obj.caption, obj.file, obj.id, obj.favorite);
}

function addToPage(photo) {
  var newCard = document.createElement('section');
  newCard.dataset.name = photo.id;
  photo.cardInfo(newCard);
  select('.photo-area').prepend(newCard);
  photo.saveToStorage();
  clearInputs();
}

function getTitle() {
  return select('#form-title').value;
}

function getCaption() {
  return select('#form-caption').value;
}

function clearInputs() {
  select('#form-title').value = null;
  select('#form-caption').value = null;
  // select('#file').value = null;
}

function photoCardActions(event) {
  if (ifClassIs('del-img')) removePhoto(event.target);
  if (ifClassIs('fav-img')) toggleFavorite();
}

function removePhoto(target) {
    new Photo().deleteFromStorage(target);
    target.closest('section').remove();
}

function toggleFavorite() {
  var findID = event.target.closest('section').dataset.name;
  var photo = buildPhotoObj(JSON.parse(localStorage.getItem(findID)));

  if (!photo.favorite) photo.favorite = true; 
  else if (photo.favorite) photo.favorite = false;
  photo.saveToStorage();
}

function editPhotoCard(event) {
  if (event.keyCode === 13 || event.keyCode === 9) {
    event.preventDefault();
    updatePhotoCardContent();
  }
}

function updatePhotoCardContent() {
  var targetID = event.target.closest('section').dataset.name;
  var photo = buildPhotoObj(JSON.parse(localStorage.getItem(targetID)));

  if (ifClassIs('card-title')) photo.title = event.target.innerText;
  if (ifClassIs('card-caption')) photo.caption = event.target.innerText;
  photo.saveToStorage();
}


// FOR SEARCH BAR
function getSearchInput() {
  console.log(select('#search-bar').value);
}
