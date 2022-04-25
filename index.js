import Bookshelf from './modules/bookshelf.js';
import Book from './modules/book.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const mainSection = document.querySelector('main');
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const booksList = document.querySelector('#books-list');
const addList = document.querySelector('#add-book');
const contactList = document.querySelector('#contact-info');
const navBtns = [booksList, addList, contactList];
const sections = [document.querySelector('.books-list'), document.querySelector('.add-book'), document.querySelector('.contact-info')];
const sectionName = document.querySelector('.h2');
const datetime = document.querySelector('#datetime');
const shelf = new Bookshelf();

const getBooks = () => {
  shelf.retrieveStorage();
  Object.values(shelf.books).forEach((book) => {
    const oldBook = new Book(book.author, book.title, book.time);
    mainSection.appendChild(oldBook.generateTemplate(mainSection, shelf));
  });
};

const displaySection = (sectionId) => {
  sections.forEach((section) => {
    if (section.classList.contains(sectionId)) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
    sectionName.innerHTML = sectionId.replace('-', ' ').toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
  });
};

navBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => displaySection(btn.getAttribute('id'), event), false);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Book(author.value, title.value);
  mainSection.appendChild(book.generateTemplate(mainSection, shelf));
  shelf.addBook(book);
  title.value = '';
  author.value = '';
});

const whenLoadingWindow = () => {
  datetime.innerHTML = DateTime.local().toLocaleString(DateTime.DATETIME_FULL);
  getBooks();
  displaySection('books-list');
};

window.addEventListener('load', whenLoadingWindow);