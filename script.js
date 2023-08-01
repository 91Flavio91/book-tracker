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