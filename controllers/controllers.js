const db = require('./../config/db');

const getPizzasFromDB = (req, resp) => {
    db.query('SELECT * FROM pizzashop.pizzas', (err, results) => {
        if(err) {
            console.log(err);
        } else {
            resp.json(results);
        }
    });
}

module.exports = { getPizzasFromDB };