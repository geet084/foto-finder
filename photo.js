class Photo {
  constructor(title, caption, id, file) {
    this.title = title || 'Your Title Here';
    this.caption = caption || 'Your Caption Here';
    this.id = id || Date.now();
    this.file = file || 'unknown';
    this.favorite = false;

  }

  cardInfo(fotoCard) {
    fotoCard.innerHTML = 
    `<section class="card" id=${this.id} data-name=${this.id}>
      <article class="card-title">${this.title}</article>
      <article class="card-img ${this.file}"></article>
      <article class="card-body">${this.caption}</article>
      <article class="card-btm">
        <img class="del-img" src="images/delete.svg" alt="">
        <img class="fav-img ${this.favorite}" src="images/favorite.svg" alt="">
      </article>
    </section>
    `;

  }

  saveToStorage() {

  }

  deleteFromStorage() {

  }

  updatePhoto() {

  }
}