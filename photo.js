class Photo {
  constructor(title, caption, file) {
    this.id = Date().now;
    this.title = title || 'Your Title Here';
    this.caption = caption || 'Your Caption Here';
    this.file = file || 'unknown';
    this.favorite = false;

  }

  saveToStorage() {

  }

  deleteFromStorage() {

  }

  updatePhoto() {

  }
}