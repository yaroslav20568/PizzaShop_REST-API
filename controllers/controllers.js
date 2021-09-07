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

module.exports = { getPizzasFromDB };