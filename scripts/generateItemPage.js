import { catalog } from './catalog.js';
import { getData } from './getData.js';
import userData from './userData.js';

const NEW_COUNT_ITEM = 6;

const generateItemPage = () => {

    // достаем данные с помощью деструктуризации
    const renderCard = ({ category, count, description, id, img, name: itemName, price, subcategory }) => {
        
        const breadcrumbLink = document.querySelectorAll('.breadcrumb__link')
        const goodImages = document.querySelector('.good-images');
        const goodItemNew = document.querySelector('.good-item__new');
        const goodItemHeader = document.querySelector('.good-item__header');
        const goodItemDescription = document.querySelector('.good-item__description');
        const goodItemEmpty = document.querySelector('.good-item__empty');
        const goodItemPriceValue = document.querySelector('.good-item__price-value');
        const btnGood = document.querySelector('.btn-good');
        const btnAddWishlist = document.querySelector('.btn-add-wishlist');


        // хлебные крошки
        const arr = [category, subcategory, itemName];

        breadcrumbLink.forEach((item, i) => {
            item.textContent = arr[i];
        })
        // переход по ссылкам в хлебных крошках
        breadcrumbLink[0].href = `goods.html?cat=${category}`;
        breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`;


        // заполняем карточку товара
        goodImages.textContent = ``;
        goodItemHeader.textContent = itemName;
        goodItemDescription.textContent = description;
        goodItemPriceValue.textContent = price;
        btnGood.dataset.idd = id;
        btnAddWishlist.dataset.idd = id;

        img.forEach(item => {
            goodImages.insertAdjacentHTML('afterbegin', `
            <div class="good-image__item">
					<img src=${item} alt="${itemName} - ${description}">
			</div>
            `)
        });


        // новинка
        if(count >= NEW_COUNT_ITEM) {
            goodItemNew.style.display = 'block';
            goodItemNew.style.color = 'red';
        } 
        // если товара нет в наличии
        else if(!count){
            goodItemEmpty.style.display = 'block';
            goodItemEmpty.style.color = 'red';
            btnGood.style.display = 'none';
        }


        // проверка вишлиста
        const checkWishList = () => {
            if(userData.wishList.includes(id)) {
                btnAddWishlist.classList.add('contains-wishlist');
            } else {
                btnAddWishlist.classList.remove('contains-wishlist');
            };
        };
        btnAddWishlist.addEventListener('click', () => {
            // передаем id в userData в set
            userData.wishList = id;
            checkWishList();
        });

        // корзина
        btnGood.addEventListener('click', () => {
            // передаем id в userData в set
            userData.cartList = id;        
        });

        checkWishList();
    }

    if(location.hash && location.pathname.includes('card')) {
        getData.item(location.hash.substring(1), renderCard);
    };

};

export default generateItemPage;