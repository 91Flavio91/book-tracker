let bookLibrary = [];
const Book = function (title, author, pages, read, initialBookIndex) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.initialBookIndex = initialBookIndex;
};

const bookActions = {
    showBook() {
        const main = document.querySelector('.main');
        const divBookCardOuter = document.createElement('div');
        const divBookCardInner = document.createElement('div');
        const h2Title = document.createElement('h2');
        const paraAuthor = document.createElement('p');
        const paraPages = document.createElement('p');
        const paraReadStatus = document.createElement('p');
        const buttonReadStatus = document.createElement('button');
        const buttonDeleteBook = document.createElement('button');

        divBookCardOuter.classList.add('book-card-outer');
        divBookCardInner.classList.add('book-card-inner');
        buttonReadStatus.classList.add('read-status-button');
        buttonDeleteBook.classList.add('delete-book-button');

        divBookCardOuter.setAttribute('data-book-index', `${this.initialBookIndex}`);

        h2Title.textContent = this.title;
        paraAuthor.textContent = `Author: ${this.author}`;
        paraPages.textContent = `Pages: ${this.pages}`;
        paraReadStatus.textContent = 'Read it?'
        if (this.read === true) buttonReadStatus.textContent = 'Read';
        else if (this.read === false) {
            buttonReadStatus.textContent = 'Not Read';
            buttonReadStatus.classList.add('not-read');
        }

        divBookCardInner.append(h2Title, paraAuthor, paraPages, paraReadStatus, buttonReadStatus, buttonDeleteBook);
        divBookCardOuter.appendChild(divBookCardInner);
        main.appendChild(divBookCardOuter);
    }
}
Object.setPrototypeOf(Book.prototype, bookActions);

const addFormSubmitEvent = function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        title = this[0].value;
        author = this[1].value;
        pages = this[2].value;
        read = this[3].checked;
        initialBookIndex = bookLibrary.length;

        this[0].value = '';
        this[1].value = '';
        this[2].value = '';
        this[3].checked = false;

        bookLibrary.push(new Book(title, author, pages, read, initialBookIndex));
        bookLibrary[bookLibrary.length - 1].showBook();
        hideModalBox();
    });
};

const showModalBox = function () {
    const showModalButton = document.querySelector('.show-modal-button');
    const mask = document.querySelector('.mask');
    const modalBox = document.querySelector('.modal-box');

    showModalButton.addEventListener('click', function () {
        mask.classList.add('mask-visible');
        modalBox.classList.add('modal-box-visible');
    });
};
const hideModalBox = function () {
    const mask = document.querySelector('.mask');
    const modalBox = document.querySelector('.modal-box');

    mask.classList.remove('mask-visible');
    modalBox.classList.remove('modal-box-visible');
};

showModalBox();
addFormSubmitEvent();