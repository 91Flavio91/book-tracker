let bookLibrary = [];
class Book {
    constructor(title, author, pages, read, initialBookIndex) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.initialBookIndex = initialBookIndex;
    }

    removeBook(buttonDeleteBook, bookToRemoveFromLibrary) {
        const bookIndex = buttonDeleteBook.parentElement.parentElement.getAttribute('data-book-index');
        const bookSiblingsList = document.querySelectorAll(`[data-book-index="${bookIndex}"] ~ div`);

        for (let i = 0; i < bookSiblingsList.length; i++) {
            let bookSiblingIndex = bookSiblingsList[i].getAttribute('data-book-index');
            bookSiblingsList[i].setAttribute('data-book-index', bookSiblingIndex - 1);
        };

        bookLibrary.splice(bookLibrary.indexOf(bookToRemoveFromLibrary), 1);

        const main = document.querySelector('.main');
        const divBookCardOuter = buttonDeleteBook.parentElement.parentElement;
        main.removeChild(divBookCardOuter);
    }

    changeReadStatus(buttonReadStatus) {
        if (buttonReadStatus.textContent === 'Read') {
            buttonReadStatus.textContent = 'Not Read';
            buttonReadStatus.classList.toggle('not-read');
        }
        else if (buttonReadStatus.textContent === 'Not Read') {
            buttonReadStatus.textContent = 'Read';
            buttonReadStatus.classList.toggle('not-read');
        }
    }

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

        this.setBookButtonsAsProperties();
    }

    setBookButtonsAsProperties() {
        this.buttonDeleteBook = document.querySelector(`.book-card-outer[data-book-index="${this.initialBookIndex}"] .delete-book-button`);
        this.buttonReadStatus = document.querySelector(`.book-card-outer[data-book-index="${this.initialBookIndex}"] .read-status-button`);
        const thisBook = this;
        console.log(thisBook);

        this.buttonDeleteBook.addEventListener('click', function () {
            Book.prototype.removeBook(this, thisBook);
        });
        this.buttonReadStatus.addEventListener('mousedown', function () {
            Book.prototype.changeReadStatus(this);
        });
    }
}

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