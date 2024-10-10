//Позволяет менять картинки в зависимости от выбранного пользователем стилем питания
//Võimaldab pilte muuta sõltuvalt kasutaja valitud toitumisstiilist
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    //Прячет все картинки, которые не относятся к выбранному пользователем стилем питания
    //Peidab kõik pildid, mis pole seotud kasutaja valitud söömisstiiliga
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    //Делает те картинки видимыми, которые относятся к выбранному пользователем стилю питания
    //Muudab need pildid nähtavaks, mis viitavad kasutaja valitud söömisstiilile
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    /*Добавляет условие при котором будет происходить проверка выбранного пользователем стиля питания
    и в зависимости от его выбора выводить нужную картинку*/
    tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;