import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

export const catalog = () => {
    const updateSubCatalog = generateSubCatalog();

    const btnBurger = document.querySelector('.btn-burger');
    // получение меню
    const catalog = document.querySelector('.catalog');
    const subCatalog = document.querySelector('.subcatalog');
    const subCatalogHeader = document.querySelector('.subcatalog-header');
    // стрелочка назад
    const btnReturn = document.querySelector('.btn-return');  


    // создание элемента затемнения фона (подложки)
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('beforeend', overlay)


    // открытие каталога
    const openMenu = () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
    };

    // закрытие каталога и дополнительного каталога
    const closeMenu = () => {
        catalog.classList.remove('open');
        overlay.classList.remove('active');
        closeSubMenu();
    };

    // открытие дополнительного меню
    const handlerCatalog = (event) => {
        // запрещаем переход на другую страницу
        event.preventDefault();
        const itemList = event.target.closest('.catalog-list__item>a');
        // открытие дополнительного меню
        if(itemList) {
            getData.subCatalog(itemList.textContent, (data) => {
                // открытие сабкаталога и получение из него данных 
                updateSubCatalog(itemList.textContent, data);
                subCatalog.classList.add('subopen');
            })

            
        }

        if(event.target.closest('.btn-close')) {
            closeMenu();
        }
    };


    const closeSubMenu = () => {
        subCatalog.classList.remove('subopen');
    }


    // открытие каталога
    btnBurger.addEventListener('click', openMenu);

    // закрытие каталога при клике на крестик

    // закрытие каталога при клике на подложку
    overlay.addEventListener('click', closeMenu);

    // закрытие каталога и доп. каталога при нажатиии на клаве клавиши Escape
    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape') {
            closeMenu();
            closeSubMenu();
        };
    });

    // открытие дополнительного меню
    catalog.addEventListener('click', handlerCatalog);

    // закрытие дополнительного окна при клике на стрелочку назад
    subCatalog.addEventListener('click', event => {
        const btnReturn = event.target.closest('.btn-return');
        if(btnReturn) closeSubMenu();
    })

    // закрытие дополнительного окна при клике на подложку
    overlay.addEventListener('click', closeSubMenu);
};



    

