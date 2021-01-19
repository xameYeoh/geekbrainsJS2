class GoodsList {
    // ...
    fetchGoods() {
        return new Promise(function (resolve) {
            makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
                resolve("Done");
            })
        })

    }
    // ...

};
const list = new GoodsList();
let promise = list.fetchGoods();
promise.then(
    () => list.render()
);