import {getResource} from '../services/services';
// функция, которая создаёт карточки на странице
// funktsioon, mis loob lehel kaardid
function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 1;
            this.changeToUSD();
        }

        //Пересчёт цены из евро в доллары
        //Hinna ümberarvestamine eurost dollaritesse
        changeToUSD() {
            this.price = this.price * this.transfer;
        }

        //Создает карточки на сайте с полученными из db.json данными
        //Loob veebisaidil kaardid, mis on saadud db.json andmed
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr>${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Hind:</div>
                <div class="menu__item-total"><span>${this.price}</span> EUR/päev</div>
            </div>
            `;
            this.parent.append(element);
        }
    }

    //Получаем данные из db.json, которые потом используются для создания карточек на сайте
    //Saame andmeid db.json, mida seejärel kasutatakse veebisaidil kaartide loomiseks
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
}

export default cards;