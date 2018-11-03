document.querySelector('#search-bar').addEventListener('keyup', getSearchInput);
document.querySelector('.form-input').addEventListener('click', getFormInput);
document.querySelector('.photo-area').addEventListener('click', photoThing);


function photoThing() {
  if (event.target.classList.contains('del-img')) {
    console.log('remove');
  } else if (event.target.classList.contains('fav-img')) {
    console.log('fav');
  }
}


function getFormInput(event) {
  if (event.target.id === 'form-title') {
    getTitleInput();
  } else if (event.target.id === 'form-caption') {
    getCaptionInput();
  } else if (event.target.classList.contains('choose-btn')) {
    event.preventDefault();
    console.log('choose file');
  } else if (event.target.classList.contains('view-fav')) {
    event.preventDefault();
    console.log('view things');
  } else if (event.target.classList.contains('add-to')) {
    event.preventDefault();
    console.log('add stuff');
  }

}

// FOR CAPTION INPUT
function getCaptionInput() {
  console.log(document.querySelector('#form-caption').value); 
}

// FOR TITLE INPUT
function getTitleInput() {
  console.log(document.querySelector('#form-title').value); 
}

// FOR SEARCH BAR
function getSearchInput() {
  console.log(document.querySelector('#search-bar').value);
}
