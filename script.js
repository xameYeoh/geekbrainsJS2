const goods = [{
        title: 'Shirt',
        price: 150
    },
    {
        title: 'Socks',
        price: 50
    },
    {
        title: 'Jacket',
        price: 350
    },
    {
        title: 'Shoes',
        price: 250
    },
];

const renderCartButton = document.querySelector('.cart-button');

const renderGoodsItem = (title = "Product Name", price = 0) => `<h3>${title}</h3><p>${price}</p>`; //сократил запись функции, добавил аргументы по умолчанию

//запятая выводилась потому что в html добавлялся массив как таковой, в которой элементы перечислены через запятую. Если работать с каждым элементом массива и добавлять их по очереди, запятой не будет
const renderGoodsList = (list) => {
    document.querySelector('.goods-list').innerHTML = ''; //предотвращает бесконечного заполнения корзины повторяющимися элементами
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    goodsList.forEach(goodHTML => {
        let goodsItemElement = document.createElement('div');
        goodsItemElement.classList.add('goods-item');
        goodsItemElement.innerHTML = goodHTML;
        document.querySelector('.goods-list').appendChild(goodsItemElement);
    });

}

renderCartButton.addEventListener("click", () => renderGoodsList(goods));