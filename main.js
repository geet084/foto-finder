document.querySelector('#search-bar').addEventListener('keyup', getSearchInput);
document.querySelector('.form-input').addEventListener('click', getFormInput);
document.querySelector('.photo-area').addEventListener('click', photoThing);


function cl(elem) {
  return console.log(elem);
}
function select(param) {
  return document.querySelector(param);
}



function getFormInput(event) {
  event.preventDefault();
  var verifyIt = event.target.classList;
  
  event.target.id === 'form-title' ? getTitleInput() : 'Do nothing';
  event.target.id === 'form-caption' ? getCaptionInput() : 'Do nothing';
  verifyIt.contains('choose-btn') ? chooseFileBtn() : 'Do nothing';
  verifyIt.contains('view-fav') ? cl('view something') : 'Do nothing';
  verifyIt.contains('add-to') ? cl('add to something') : 'Do nothing';
}

function getTitleInput() {
  var newTitle =  select('#form-title').value;
  return newTitle;
}

function getCaptionInput() {
  var newCaption = select('#form-caption').value;
  return newCaption;
}

function chooseFileBtn() {
  var photo = new Photo(getTitleInput(), getCaptionInput());
  var aFoto = new Photo(photo.title, photo.caption, photo.id, photo.file, photo.favorite);
  var newCard = document.createElement('section');
  newCard.className = 'foto-card';
  aFoto.cardInfo(newCard);
  select('.photo-area').prepend(newCard);
}






function photoThing() {
  if (event.target.classList.contains('del-img')) {
    console.log('remove');
  } else if (event.target.classList.contains('fav-img')) {
    console.log('fav');
  }
}





// FOR SEARCH BAR
function getSearchInput() {
  console.log(document.querySelector('#search-bar').value);
}
