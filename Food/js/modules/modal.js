//функция для закрытия всплывающего окна
//funktsioon hüpikakna sulgemiseks
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

//функция для открытия всплывающего окна
//funktsioon hüpikakna avamiseks
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

//назначает условия при которых открывается или закрывается всплывающее окно
//määrab tingimused, mille korral hüpikaken avaneb või sulgub
function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

        //условие, что открывается всплывающее окно при нажатии на любую кнопку
        //tingimus, et avaneb hüpikaken, kui klõpsate mis tahes nuppu
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    //условие, при котором всплывающее окно закрывается, если мы кликнем левой кнопкой мыши за его пределами
    //tingimus, mille korral hüpikaken sulgub, kui klõpsame hiire vasaku nupuga väljaspool seda
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    //условие, при котором всплывающее окно закрывается, если мы нажимаем клавишу Esc
    //tingimus, mille korral hüpikaken sulgub, kui vajutame klahvi Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    //функция, которая открывает всплывающее окно, когда мы достигаем дна страницы
    //funktsioon, mis avab hüpikakna, kui jõuame lehe Põhja
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};