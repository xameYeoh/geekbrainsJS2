const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('.'));

app.get('/api/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/api/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            cart.push(item);

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});


app.delete('/api/removeFromCart/:id', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const itemId = req.params.id;

            cart.splice(cart.findIndex((good) => good.id == itemId));

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.get('/api/catalogData/:id/', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        if (!err) {
            let good;
            try {
                const goods = JSON.parse(data);
                console.log(req.params.id, goods);
                good = goods.find((good) => good.id == req.params.id)
                console.log(good);
            } catch (e) {
                res.status(500).json({
                    error: 'error parsing datafile'
                });
            }

            if (good) {
                res.json(good);
            } else {
                res.status(404).json('no such good with id ' + req.params.id)
            }
        } else {
            res.status(500).json({
                error: 'no data file!'
            });
        }
    })
});

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});