import { getLocalStorage, setLocalStorage } from './storage.js'

// реализуем орхзину и вишлист с помозью геттеров и сеттеров

const userData = {

    // wishList
    wishListData: getLocalStorage('wishList'),
    get wishList() {
        return this.wishListData;
    },
    set wishList(id) {
        if(this.wishListData.includes(id)) {
            const index = this.wishListData.indexOf(id);
            this.wishListData.splice(index, 1);
        } else {
            this.wishListData.push(id);
        }
        setLocalStorage('wishList', this.wishList)
    },



    // корзина
    cartListData: getLocalStorage('cartList'),
    get cartList() {
        return this.cartListData;
    },
    set cartList(id) {
        let obj = this.cartListData.find(item => item.id === id);
        // если товар есть в корзине
        if(obj) {
            // увеличиваем его кол-во
            obj.count++;
        }
        // если товара нет в корзине
        else {
            // создаем товар
            obj = {id, count: 1};
            // добавляем товар в корзину
            this.cartListData.push(obj);
        };
        setLocalStorage('cartList', this.cartList);
    },
    // кол-во отдельного товара в корзине
    set changeCountCartList(itemCart) {
        let obj = this.cartListData.find(item => item.id === itemCart.id);
        obj.count = itemCart.count;

        setLocalStorage('cartList', this.cartList)
    },
    // удаление товара из корзины
    set deleteItemCartList(idd) {
        let index = -1;
        this.cartList.forEach((item, i) => {
            // узнаем индекс удаляемого элемента
            if(item.id === idd) {
                index = i;
            };
        });
        // удаляем элемент
        this.cartList.splice(index, 1);
        setLocalStorage('cartList', this.cartList);
    }
};

export default userData;
