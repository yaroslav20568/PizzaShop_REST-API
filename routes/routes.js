const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { getPizzasFromDB, registration, authorization, authentication } = require('./../controllers/controllers');

const router = Router();

const authMiddleware = (req, resp, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        console.log('no token');
    }
    const user = jwt.verify(token, 'tokenKey');
    req.user = user;
    next();
}

router.use('/pizzas', getPizzasFromDB);
router.use('/register', registration);
router.use('/login', authorization);
router.use('/auth', authMiddleware, authentication);

module.exports = router;