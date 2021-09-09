const { Router } = require('express');
const { getPizzasFromDB, registration } = require('./../controllers/controllers');

const router = Router();

router.use('/pizzas', getPizzasFromDB);
router.use('/register', registration);

module.exports = router;