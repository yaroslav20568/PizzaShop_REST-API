const { Router } = require('express');
const { getPizzasFromDB, registration, authorization } = require('./../controllers/controllers');

const router = Router();

router.use('/pizzas', getPizzasFromDB);
router.use('/register', registration);
router.use('/login', authorization);

module.exports = router;