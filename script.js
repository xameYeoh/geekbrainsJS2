const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

import module from './module.js';

module.goodsSearch();
module.cart();
module.cartItem();
module.goodsList();
module.goodsItem();

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        searchLine: '',
        isVisibleCart: false,
        cart: []
    },

    template: `
        <div>
        <header>
            <goods-search v-model="searchLine"></goods-search>
            <button class="cart-button" type="button" @click="cartToggler">Cart</button>
        </header>
        <main>
            <div class="container">
                <h2>eShop</h2>
                <goods-list :goods="filteredGoods" :addToCart="addToCart"></goods-list>
                <p v-if="noGoods">Нет данных</p>
                <cart :cart-visibility="isVisibleCart" :cart="cart" :removeFromCart = "removeFromCart"></cart>
            </div>
        </main>
   </div>
    `,
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve) => {
                const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
                var xhr;

                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        resolve(xhr.responseText);
                    }
                }

                xhr.open('GET', url, true);
                xhr.send();
            });
        },
        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);
        },

        cartToggler() {
            return this.isVisibleCart = !this.isVisibleCart;
        },
        returnSearchLine() {
            return this.searchLine;
        },
        addToCart(id) {
            let goodsItem = this.goods.find((good) => good.id_product == id ? true : false);
            let cartItem = this.cart.find(elem => elem == goodsItem);

            if (!cartItem) {
                this.cart.push(goodsItem);
                this.$set(this.cart[this.cart.length - 1], 'quantity', 1)
            } else {
                cartItem.quantity++;
            }
            console.log(this.cart)
        },
        removeFromCart(id) {
            let cartItem = this.goods.find((good) => good.id_product == id);
            if (cartItem.quantity == 1) {
                this.cart.splice(this.goods.indexOf(cartItem));
            } else cartItem.quantity--;

        }



    },
    computed: {
        filteredGoods() {
            return this.goods.filter((good) => good.product_name.includes(this.searchLine));
        },
        noGoods() {
            if (this.filteredGoods.length == 0) return true;
            return false;
        },


    },
    mounted() {
        this.makeGETRequest(`/catalogData`).then((goods) => {
            this.goods = JSON.parse(goods);
        });

    }

});

class GoodsItem {
    constructor(product_name, price, id) {
        this.product_name = product_name;
        this.price = price;
        this.id = id;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}


class GoodsList {


    goodsSum() {
        return this.goods.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

class Cart {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        return this.goods;
    }

    deleteItem(id) {
        //убрать продукт одного типа из корзины
        let searchedGoodIndex = this.goods.findIndex(good => good.id_product == id ? true : false);
        console.log(searchedGoodIndex);
        if (searchedGoodIndex == -1) return;

        this.goods.splice(searchedGoodIndex);
    }



    addItem(id, goodsList) {
        //добавить один или несколько продуктов одного типа в корзину

        let searchedGood = goodsList.find(good => good.id_product == id ? true : false);
        if (!searchedGood) return;

        this.goods.push(searchedGood);

    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const cartItem = new CartItem(good.product_name, good.price);
            listHtml += cartItem.render();
        });
        document.querySelector('.cart').innerHTML = listHtml;
    }


}

class CartItem extends GoodsItem {
    constructor(title, price, id) {
        super(title, price, id);
    }
    render() {
        return `<div class="cart-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}