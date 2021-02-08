const goodsSearch = () => {
    Vue.component('goods-search', {
        template: `
        <input type="text" class="goods-search" v-on:input="$emit('input', $event.target.value)"/>
        `

    });
}

const cart = () => {
    Vue.component('cart', {
        props: ['cartVisibility', 'cart', 'removeFromCart'],
        template: `
        <div class="cart" v-if="cartVisibility">
                        <h2>Cart</h2>
                        <div class="cart-list">
                            <cart-item v-for="good in cart" :good="good" :removeFromCart="removeFromCart"></cart-item>
                        </div>
                    </div>
        `
    });
}

const cartItem = () => {
    Vue.component('cart-item', {
        props: ['good', 'removeFromCart'],
        template: `
        <div class="cart-item">
                <h3>{{ good.product_name }}</h3>
                <p>{{ good.price }}</p>
                <p> {{good.quantity}}</p>
                <button class="remove-button" type="button" @click="removeFromCart(good.id_product)">Remove</button>
        </div>
        `,
    });
}

const goodsList = () => {
    Vue.component('goods-list', {
        props: ['goods', 'addToCart'],
        template: `<div class="goods-list">
                            <goods-item v-for="good in goods" :good="good" :addToCart="addToCart"></goods-item>
    
                </div>`
    });
}

const goodsItem = () => {
    Vue.component('goods-item', {
        props: ['good', 'addToCart'],
        template: `
        <div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
            <button class="add-button" type="button" @click="addToCart(good.id_product)">Buy</button>
           
        </div>
        `,

    });
}
export default {
    goodsSearch: goodsSearch,
    cart: cart,
    goodsList: goodsList,
    cartItem: cartItem,
    goodsItem: goodsItem,

};