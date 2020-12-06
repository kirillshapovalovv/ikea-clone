import { getData } from './getData.js';
import userData from './userData.js';

// WISHLIST

const COUNTER = 6;

const generateGoodsPage = () => {

    // главный зголовок страницы
    const mainHeader = document.querySelector('.main-header');
    
    // генерация карточек товаров
    const generateCards = (data) => {
        // список всех товаров в категории на странице
        const goodsList = document.querySelector('.goods-list');

        goodsList.textContent = '';
        // если поиск товара не ал результатов или в списке желаний ничего нет
        if(!data.length) {
            const goods = document.querySelector('.goods');
            goods.textContent = location.search === '?wishlist' ?
            'Список желаний пуст' :
            'Упс... По вашему запросу ничего не найдено'; 
        }
        data.forEach(item => {
            // пример деструктуризации
            const { name: itemName, description, count, price, img: image, id } = item;

            goodsList.insertAdjacentHTML('afterbegin', `
                <li class="goods-list__item">
                    <a class="goods-item__link" href="card.html#${id}">
                        <article class="goods-item">
                            <div class="goods-item__img">
                                <img src=${image[0]}
                                    ${image[1] ? `data-second-image=${image[1]}` : ''}>
                            </div>
                            ${count >= COUNTER ? `<p class="goods-item__new">Новинка</p>` : ''}
                            ${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}
                            <h3 class="goods-item__header">${itemName}</h3>
                            <p class="goods-item__description">${description}</p>
                            <p class="goods-item__price">
                                <span class="goods-item__price-value">${price}</span>
                                <span class="goods-item__currency"> ₽</span>
                            </p>
                            ${count ? `
                            <button class="btn btn-add-card" aria-label="Добравить в корзину" 
                            data-idd="${id}"></button>` : ''}
                        </article>
                    </a>
                </li>
            `)
        })
        // клик по кнопке корзина на товаре в списке товаров
        goodsList.addEventListener('click', e => {
            const btnAddCard = e.target.closest('.btn-add-card');
            if(btnAddCard) {
                e.preventDefault();
                userData.cartList = btnAddCard.dataset.idd;
            };
        })
    };


    if(location.pathname.includes('goods') && location.search) {

        const search = decodeURI(location.search);
        // console.log(search);
        const prop = search.split('=')[0].substring(1);
        // console.log(prop);
        const value = search.split('=')[1];
        // console.log(value);

        if(prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`
        } else if(prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = `Список желаний`;
        } else if(prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    };
};

export default generateGoodsPage;