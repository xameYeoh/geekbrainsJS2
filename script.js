// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
//   ];

//   const renderGoodsItem = (title, price) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
//   };

//   const renderGoodsList = (list) => {
//     const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
//     document.querySelector('.goods-list').innerHTML = goodsList.join('');
//   }

//   renderGoodsList(goods);
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
    var xhr;

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

    xhr.open('GET', url, true);
    xhr.send();
}



class GoodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return new Promise(function (resolve) {
            makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
                resolve("Done");
            })
        })

    }


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

class Cart extends GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        return this.goods;
    }

    deleteItem(id) {
        //убрать продукт одного типа из корзины
        let searchedGoodIndex = goodsList.findIndex(good => good.id == id ? true : false);
        if (!searchedGood) return;

        this.goods.splice(searchedGoodIndex);
    }



    addItem(id, quantity = 1, goodsList) {
        //добавить один или несколько продуктов одного типа в корзину
        let searchedGood = goodsList.find(good => good.id == id ? true : false);
        if (!searchedGood || quantity < 1) return;
        for (let i = 0; i < quantity; i++) {
            this.goods.push(searchedGood);
        }
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const cartItem = new CartItem(good.title, good.price);
            listHtml += cartItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

}

class CartItem extends GoodsItem {
    constructor(title, price, id) {
        super(title, price, id);
    }
}

const list = new GoodsList();
let promise = list.fetchGoods();
promise.then(
    () => list.render()
);
console.log(list.goodsSum());