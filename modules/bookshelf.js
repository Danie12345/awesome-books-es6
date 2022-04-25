export default class Bookshelf {
  constructor() {
    this.books = {};
    this.retrieveStorage();
  }

  updateStorage() {
    localStorage.setItem('stored-books', JSON.stringify(this.books));
  }

  retrieveStorage() {
    if (localStorage.getItem('stored-books') === null) {
      this.updateStorage();
    } else {
      this.books = JSON.parse(localStorage.getItem('stored-books'));
    }
  }

  addBook(book) {
    this.books[book.time] = book;
    this.updateStorage();
  }

  delBook(book) {
    delete this.books[book.time];
    this.updateStorage();
  }
}