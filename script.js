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




class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [{
                id: 0,
                title: 'Shirt',
                price: 150
            },
            {
                id: 1,
                title: 'Socks',
                price: 50
            },
            {
                id: 2,
                title: 'Jacket',
                price: 350
            },
            {
                id: 3,
                title: 'Shoes',
                price: 250
            },
        ];
    }

    goodsSum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        });
        return sum;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }
    deleteItem(id, quantity = 1) {
        //убрать один или несколько продуктов одного типа из корзины
    }

    addItem(id, quantity = 1) {
        //добавить один или несколько продуктов одного типа в корзину
    }

    render() {
        //отобразить корзину
    }

}

class CartItem extends GoodsItem {
    constructor(title, price, id) {
        super(title, price, id);
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.goodsSum());