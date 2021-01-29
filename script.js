const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        searchLine: '',
        isVisibleCart: false
    },
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
        cartToggler() {
            return this.isVisibleCart = !this.isVisibleCart;
        }



    },
    computed: {
        filteredGoods() {
            return this.goods.filter((good) => good.product_name.includes(this.searchLine));
        },
        noGoods() {
            if (this.filteredGoods.length == 0) return true;
            return false;
        }

    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
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



    addItem(id, goodsList, quantity = 1) {
        //добавить один или несколько продуктов одного типа в корзину

        let searchedGood = goodsList.find(good => good.id_product == id ? true : false);
        if (!searchedGood || quantity < 1) return;
        for (let i = 0; i < quantity; i++) {
            this.goods.push(searchedGood);
        }
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

const list = new GoodsList();
const cart = new Cart();

// let promise = app.mounted();
//вызов render в результате fulfilled promise(удачного выполнения fetchgoods)
// promise.then(
//     () => {
//         list.render();
//         //добавить ноутбук в корзину
//         cart.addItem(123, list.goods);
//         //добавить 3 мышки в корзину
//         cart.addItem(456, list.goods, 3);
//         console.log(cart.goods);
//         cart.render();

//     }
// );