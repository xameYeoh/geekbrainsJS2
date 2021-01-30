const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-search', {
    template: `
    <input type="text" class="goods-search" v-on:input="$emit('input', $event.target.value)"/>
    `

});

Vue.component('cart', {
    props: ['cartVisibility'],
    template: `
    <div class="cart" v-if="cartVisibility">
                    <h2>Cart</h2>
                    <cart-item></cart-item>
                </div>
    `,
    methods: {

    }
});

Vue.component('cart-item', {
    props: [''],
    template: `
    <div class="cart-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
    </div>
    `,
    methods: {

    }
});

Vue.component('goods-list', {
    props: ['goods'],
    template: `<div class="goods-list">
                        <goods-item v-for="good in goods" :good="good"></goods-item>

            </div>`
});

Vue.component('goods-item', {
    props: ['good', 'cart'],
    template: `
    <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
       
    </div>
    `,
    // methods:{
    //     addToCart(){
    //         this.cart.push(good);
    //     }
    // }
});


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        searchLine: '',
        isVisibleCart: false
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
                <goods-list :goods="filteredGoods"></goods-list>
                <p v-if="noGoods">Нет данных</p>
                <cart :cart-visibility="isVisibleCart"></cart>
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
        cartToggler() {
            return this.isVisibleCart = !this.isVisibleCart;
        },
        returnSearchLine() {
            return this.searchLine;
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