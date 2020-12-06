import { getData } from './getData.js';
import userData from './userData.js';

const generateCartPage = () => {
    // если находимся на странице корзина
    if(location.pathname.includes('cart')) {
        // список товаров
        const cartList = document.querySelector('.cart-list');
        const cartTotalPrice = document.querySelector('.cart-total-price');
        const renderCartList = (data) => {
            cartList.textContent = '';

            let totalPrice = 0;
            // перебор данных, которые содержатся в корзине
            data.forEach(({ name: itemName, id, img, price, count, description }) => {

                let options = '';
                // количество определенного товара, заказанного пользователем
                let userCount = userData.cartList.find(item => item.id === id).count;

                // делаем так, чтобы пользователь не мог положить 
                // товара больше, чем есть в Базе данных
                if(userCount > count) {
                    userCount = count;
                }
                
                for(let i = 1; i <= count; i++) {
                    options += `
                        <option value=${i} ${userCount === i ? 'selected' : ''}>${i}</option>
                    `;
                }

                totalPrice += userCount * price;
                
                cartList.insertAdjacentHTML('beforeend', `
                    <li class="cart-item">
                        <div class="product">
                            <div class="product__image-container">
                                <img src=${img[0]} 
                                alt="${itemName} - ${description}">
                            </div>
                            <div class="product__description">
                                <h3 class="product__name">
                                    <a href="card.html#${id}">${itemName}</a></h3>
                                <p class="product_description-text">${description}</p>
                            </div>
                            <div class="product__prices">
                                <div class="product__price-type product__price-type-regular">
                                    <div>
                                        <div class="product__total product__total-regular">${price*userCount}.-</div>
                                        ${
                                            userCount > 1 ?
                                            `
                                            <div class="product__price-regular">${price}.-</div>
                                            ` : ``
                                        }
                                    </div>
                                </div>
                            </div>
                            <div class="product__controls">

                                <div class="product-controls__remove">
                                    <button type="button" class="btn btn-remove" data-idd=${id}>
                                        <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                    </button>
                                </div>
                                <div class="product-controls__quantity">
                                    <select title="Выберите количество" aria-label="Выберите количество" data-idd=${id}>
                                        ${options}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </li>
                `)
            });

            // итоговая цена за все товары
            cartTotalPrice.textContent = totalPrice;
        };
        
        // изменение кол-ва товаров в корзине
        cartList.addEventListener('change', (e) => {
            userData.changeCountCartList = {
                id: e.target.dataset.idd,
                count: parseInt(e.target.value)
            };
            getData.cart(userData.cartList, renderCartList);
        });

        // удаление товара из корзины
        cartList.addEventListener('click', (e) => {
            const btnRemove = e.target.closest('.btn-remove');
            if(btnRemove) {
                // удаление товара
                userData.deleteItemCartList = btnRemove.dataset.idd;
                getData.cart(userData.cartList, renderCartList);
            }
        })
        getData.cart(userData.cartList, renderCartList);
    };
};

export default generateCartPage;