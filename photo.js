class Photo {
  constructor(title, caption, file, id, favorite) {
    this.title = title || 'Your Title Here';
    this.caption = caption || 'Your Caption Here';
    this.id = id || Date.now();
    this.file = file;
    this.favorite = favorite || false;
  }

  cardInfo(photoCard) {
    photoCard.className = 'card';
    photoCard.id = this.id;
    photoCard.innerHTML = 
    ` <article class="card-title" contenteditable="true">${this.title}</article>
      <img class="card-img" src="${this.file}">
      <article class="card-caption" contenteditable="true">${this.caption}</article>
      <article class="card-btm">
        <img class="del-img"  alt="">
        <img class="favorite fave-${this.favorite}" alt="">
      </article>
    `;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage(target) {
    localStorage.removeItem(target.closest('section').id);
  }

  updatePhoto(title, caption, favorite) {
    this.title = title;
    this.caption = caption;
    this.favorite = favorite;
  }
}