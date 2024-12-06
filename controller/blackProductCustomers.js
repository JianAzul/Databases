//Pattern 2, Query 9
const db = require('../dbConfig');

const getBlackProductCustomers = (req, res) => {
    const query = `
        SELECT DISTINCT 
            c.customerid, 
            c.firstname, 
            c.lastname
        FROM CUSTOMERS c, WISHLISTS w, PRODUCTS p
        WHERE c.customerid = w.customerid 
        AND w.itemno = p.itemno 
        AND p.colormain = 'black'
        ORDER BY c.lastname, c.firstname
    `;

    db.query(query, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching customer wishlist data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No customers found with black items in wishlist' });
        }
        res.json(results);
    });
};

module.exports = {
    getBlackProductCustomers,
};