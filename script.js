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
});

const showModalBox = function () {
    const showModalButton = document.querySelector('.show-modal-button');
    const mask = document.querySelector('.mask');
    const modalBox = document.querySelector('.modal-box');

    showModalButton.addEventListener('click', function () {
        mask.classList.add('mask-visible');
        modalBox.classList.add('modal-box-visible');
    });
}

showModalBox();