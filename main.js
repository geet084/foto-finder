select('#search-bar').addEventListener('keyup', getSearchInput);
select('.form-input').addEventListener('click', getFormInput);
select('.photo-area').addEventListener('click', photoCardActions);
select('.photo-area').addEventListener('keydown', editPhotoCard);
select('.photo-area').addEventListener('focusout', updatePhotoCardContent);



// TO DO LIST
// Bonus: If the user clicks on the image, the user should be able to update the photo using the updatePhoto method.


function select(field) {
  return document.querySelector(field);
}

function ifClassIs(aClass) {
  return event.target.classList.contains(aClass);
}

function getPhotoFor(keys) {
  return JSON.parse(localStorage.getItem(keys));
}

window.onload = (pullPhotosFromStorage);

function pullPhotosFromStorage() {
  var keys = Object.keys(localStorage);
  var index = keys.length > 10 ? keys.length - 10 : 0;
  
  for(index; index < keys.length; index++) { 
    var photoCard = getPhotoFor(keys[index]);
    addToPage(buildPhotoObj(photoCard));
    updateFaveCount(photoCard);
  }
}

function getFormInput(event) {
  if (ifClassIs('view-fav')) retrieveFavorites();
  if (ifClassIs('add-to')) retrieveFormInput(event);
}

function retrieveFormInput(event) {
  event.preventDefault();
  var reader = new FileReader();
  if(select('.choose-file').files.length > 0) {
    reader.readAsDataURL(select('.choose-file').files[0]);
    uploadtoAlbum(reader);
  }
}

function uploadtoAlbum(reader) {
  reader.onload = function() {
    // var output = select('.choose-file');
    // output.src = reader.result;
    var photo = new Photo(getTitle(), getCaption(), reader.result);
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
  select('#file').value = null;
}

function photoCardActions(event) {
  if (ifClassIs('del-img')) removePhoto(event.target);
  if (ifClassIs('favorite')) toggleFavorite(event);
}

function removePhoto(target) {
    new Photo().deleteFromStorage(target);
    target.closest('section').remove();
    updateFaveCount();
}

function toggleFavorite(event) {
  var findID = event.target.closest('section').dataset.name;
  var photo = buildPhotoObj(getPhotoFor(findID));

  if (photo.favorite) toggleIcon(photo);
  else if (!photo.favorite) toggleIcon(photo);
  photo.saveToStorage();
  updateFaveCount();
}

function toggleIcon(photo) {
  photo.updatePhoto(photo.title, photo.caption, !photo.favorite);
  event.target.classList.replace(`fave-${!photo.favorite}`, `fave-${photo.favorite}`);
}

function updateFaveCount() {
  var keys = Object.keys(localStorage);
  var favCount = 0;
  for(var i = 0; i < keys.length; i++) {
    var photoCard = getPhotoFor(keys[i]);
    if (photoCard.favorite) favCount++;
  }
  select('.view-fav').innerText = `View ${favCount} Favorites`;
}

function retrieveFavorites() {
  var keys = Object.keys(localStorage);
  var favBtnText = select('.view-fav').innerText;

  if (favBtnText === 'View All Fotos') showJustFavorites(keys);
  else if (favBtnText !== 'View All Fotos') showAllPhotos(keys);
}

function showJustFavorites(keyArr) {
  keyArr.forEach(function(key) {
    var photo = buildPhotoObj(getPhotoFor(key));
    var specificPhoto = document.getElementById(photo.id).classList;

    specificPhoto.remove('hidden');
  })
  updateFaveCount();
}

function showAllPhotos(keyArr) {
  keyArr.forEach(function(key) {
    var photo = buildPhotoObj(getPhotoFor(key));
    var specificPhoto = document.getElementById(photo.id).classList;

    specificPhoto.add('hidden');
    if(photo.favorite) specificPhoto.remove('hidden');
  })
  select('.view-fav').innerText = `View All Fotos`;
}

function editPhotoCard(event) {
  if (event.keyCode === 13 || event.keyCode === 9) {
    event.preventDefault();
    updatePhotoCardContent();
  }
}

function updatePhotoCardContent() {
  var targetID = event.target.closest('section').dataset.name;
  var photo = buildPhotoObj(getPhotoFor(targetID));
  var title = photo.title;
  var caption = photo.caption;

  if (ifClassIs('card-title')) title = event.target.innerText;
  if (ifClassIs('card-caption')) caption = event.target.innerText;
  photo.updatePhoto(title, caption, photo.favorite);
  photo.saveToStorage();
}

function getSearchInput() {
  var searchInput = select('#search-bar').value.toLowerCase();
  var keys = Object.keys(localStorage);

  keys.forEach(function(key) {
    var photo = buildPhotoObj(getPhotoFor(key));
    compare(searchInput, photo);
  })
}

function compare(searchInput, photo) {
  var findTitle = photo.title.toLowerCase();
  var findCaption = photo.caption.toLowerCase();
  var specificPhoto = document.getElementById(photo.id).classList;

  specificPhoto.add('hidden');
  if(theseMatch(findTitle, searchInput) || theseMatch(findCaption, searchInput)) {
    specificPhoto.remove('hidden');
  }
}

function theseMatch(cardContent, searchContent) {
  if(cardContent.includes(searchContent)) return true;
}
