export default class Book {
  constructor(author, title, time = new Date().getTime()) {
    this.author = author;
    this.title = title;
    this.time = time;
  }

  getBook() {
    return this;
  }

  generateTemplate(section, shelf) {
    const div = document.createElement('div');
    div.setAttribute('name', this.time);
    const book = document.createElement('span');
    book.innerHTML = `${this.title} by ${this.author}`;
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener('click', () => {
      section.removeChild(div);
      shelf.delBook(this);
    });

    div.appendChild(book);
    div.appendChild(removeBtn);

    return div;
  }
}