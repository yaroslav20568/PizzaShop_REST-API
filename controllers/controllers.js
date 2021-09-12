const db = require('./../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createGenerateToken = (id, login) => {
    const user = {
        id,
        login
    }

    return jwt.sign(user, 'tokenKey', {expiresIn: '5h'});
}

const getPizzasFromDB = (req, resp) => {
    const { category, _sort, _order } = req.query;

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
            resp.status(200).json(results);
        }
    });
}

const registration = (req, resp) => {
    const { login, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 7);

    db.query('SELECT * FROM users WHERE login = ? ', [login], (err, results) => {
        if(err) {
            console.log(err);
        } else {
            if(results.length === 0) {
                db.query('INSERT INTO users(id_user, login, password) VALUES (?, ?, ?)', [null, login, hashPassword]);
                resp.status(200).json({message: 'Регистрация прошла успешно'});
            } else {
                resp.status(200).json({message: 'Пользователь уже зарегистрирован'});
            }
        }
    });
}

const authorization = (req, resp) => {
    const { login, password } = req.body;

    db.query('SELECT * FROM users WHERE login = ?', [login], (err, results) => {
        console.log(login);
        if(err) {
            console.log(err);
        } else if (results.length === 0) {
            resp.status(200).json({message: 'Такого пользователя нету, зарегиструруйтесь'});
        } else {
            if(bcrypt.compareSync(password, results[0].password)) {
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
                        const token = createGenerateToken(results[0].id, results[0].login);
                        resp.status(200).json({message: 'Вы авторизованы', userInfo: {id: results[0].id_user, user: login, isAuth: true}, items: array, token: token});
                    }
                });
            } else {
                resp.status(200).json({message: 'Неверный пороль'});
            }
        }
    });
};

const authentication = (req, resp) => {
    const queryStr = `
        SELECT id_item, login, imageUrl, name, type, size, count, price FROM cart 
        JOIN users ON cart.id_user = users.id_user
        WHERE login = ?
    `;
    db.query(queryStr, req.user.login, (err, results) => {
        if(err) {
            console.log(err)
        } else {
            console.log(results);
            const token = jwt.sign({id: req.user.id, login: req.user.login}, 'tokenKey', {expiresIn: '5h'});
            resp.status(200).json({message: 'Вы авторизованы', userInfo: {id: results[0].id_user, user: results[0].login, isAuth: true}, items: results, token: token});
        }
    });
};

module.exports = { getPizzasFromDB, registration, authorization, authentication };