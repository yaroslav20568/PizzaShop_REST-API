const db = require('./../config/db');

const getPizzasFromDB = (req, resp) => {
    const category = req.query.category;
    const _sort = req.query._sort;
    const _order = req.query._order;

    const queryStr = `
        SELECT * FROM pizzas ${category ? `WHERE category = ${category}` : ''} ORDER BY ${_sort} ${_order}
    `;

    db.query(queryStr, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            resp.json(results);
        }
    });
}

const registration = (req, resp) => {
    const login = req.body.login;
    const password = req.body.password;

    db.query('SELECT * FROM customers WHERE login = ? ', [login], (err, results) => {
        if(err) {
            console.log(err);
        } else {
            if(results.length === 0) {
                db.query('INSERT INTO customers(id_customers, login, password) VALUES (?, ?, ?)', [null, login, password]);
                resp.status(200).json({message: 'Регистрация прошла успешно'});
            } else {
                resp.status(200).json({message: 'Пользователь уже зарегестрирован'});
            }
        }
    });
}

module.exports = { getPizzasFromDB, registration };