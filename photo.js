class Photo {
  constructor(title, caption, file, id) {
    this.title = title || 'Your Title Here';
    this.caption = caption || 'Your Caption Here';
    this.id = id || Date.now();
    this.file = file || 'unknown';
    this.favorite = false;
  }

  cardInfo(photoCard) {
    photoCard.className = 'card';
    photoCard.id = this.id;
    // photoCard.style.backgroundImage = "url(bgimg.png)";
    photoCard.innerHTML = 
    ` <article class="card-title" contenteditable="true">${this.title}</article>
      <img class="card-img" src="${this.file}">
      <article class="card-caption" contenteditable="true">${this.caption}</article>
      <article class="card-btm">
        <img class="del-img" src="images/delete.svg" alt="">
        <img class="fav-img ${this.favorite}" src="images/favorite.svg" alt="">
      </article>
    `;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage(target) {
    localStorage.removeItem(target.closest('section').id);
  }

  updatePhoto() {

  }
}