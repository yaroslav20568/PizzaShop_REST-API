const { Router } = require('express');
const { getPizzasFromDB } = require('./../controllers/controllers');

const router = Router();

router.use('/pizzas', getPizzasFromDB);

module.exports = router;