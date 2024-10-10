import { closeModal, openModal } from './modal';
import { postData } from '../services/services';
// функция, которая позволяет хранить все отправленные пользователем данные
// funktsioon, mis võimaldab salvestada kõiki kasutaja saadetud andmeid
function forms(formsSelector, modalTimerId) {
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Aitäh! võtame teiega varsti ühendust',
        failure: 'Midagi läks valesti...'
    };

    //Получаем все вводимые пользователем данные в всплывающем окне
    //Saame kõik kasutaja sisestatud andmed hüpikaknas
    forms.forEach(item => {
        bindPostData(item);
    });

    /*Добавляет условие, при котором, когда нажата кнопка отправить, 
    мы получаем вводимые пользователем данные, отправляем их в базу данных (db.json) 
    и отправляем пользователю ответ в виде всплывающего окна с сообщением. 
    Сообщение зависит от того, является ли операция успешной или нет*/
    /*Lisab tingimuse, kus kui nuppu Esita vajutatakse, saame kasutaja sisendi, saadame selle andmebaasi (db.json) 
    ja saadame kasutajale vastuse hüpikakna kujul koos sõnumiga. 
    Sõnum sõltub sellest, kas operatsioon on edukas või mitte*/
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    //Даёт нам возможность отправлять пользователю в ответ всплывающее окно с сообщением, которое закроется спустя какое-то время
    //Annab meile võimaluse saata kasutajale vastuseks hüpikaken sõnumiga, mis mõne aja pärast sulgub
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}

export default forms;