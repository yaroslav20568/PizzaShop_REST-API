const db = require('./../config/db');

const getPizzasFromDB = (req, resp) => {
    const category = req.query.category;
    const _sort = req.query._sort;
    const _order = req.query._order;

    const queryStr = `
        SELECT id_pizza, imageUrl, name, types, sizes, price, category, rating FROM pizzas 
        JOIN images ON pizzas.id_imageUrl = images.id_imageUrl
        JOIN names ON pizzas.id_name = names.id_name
        JOIN types ON pizzas.id_types = types.id_types 
        JOIN sizes ON pizzas.id_sizes = sizes.id_sizes
        ${category ? `WHERE category = ${category}` : ''} ORDER BY ${_sort} ${_order}
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

    db.query('SELECT * FROM users WHERE login = ? ', [login], (err, results) => {
        if(err) {
            console.log(err);
        } else {
            if(results.length === 0) {
                db.query('INSERT INTO users(id_user, login, password) VALUES (?, ?, ?)', [null, login, password]);
                resp.status(200).json({message: 'Регистрация прошла успешно'});
            } else {
                resp.status(200).json({message: 'Пользователь уже зарегистрирован'});
            }
        }
    });
}

const authorization = (req, resp) => {
    const login = req.body.login;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE login = ?', [login], (err, results) => {
        console.log(login)
        if(results.length === 0) {
            resp.status(200).json({message: 'Такого пользователя нету, зарегиструруйтесь'});
        } else {
            if(results[0].password === password) {
                const queryStr = `
                    SELECT id_item, login, imageUrl, name, type, size, count, price FROM cart 
                    JOIN users ON cart.id_user = users.id_user
                    WHERE login = ?
                `;
                db.query(queryStr, login, (err, array) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(array);
                        resp.status(200).json({message: 'Вы авторизованы', auth: true, login: login, data: array});
                    }
                });
            } else {
                resp.status(200).json({message: 'Неверный пороль'});
            }
        }
    })
};

module.exports = { getPizzasFromDB, registration, authorization };