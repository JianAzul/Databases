//pattern 1, Query 4
const db = require('../dbConfig');

const getCustomerOrders = (req, res) => {
    const query = `
        SELECT CUSTOMERS.Lastname, ORDERS.Orderno 
        FROM CUSTOMERS 
        LEFT JOIN ORDERS ON CUSTOMERS.Customerid = ORDERS.Customerid
        UNION
        SELECT CUSTOMERS.Lastname, ORDERS.Orderno 
        FROM CUSTOMERS 
        RIGHT JOIN ORDERS ON CUSTOMERS.Customerid = ORDERS.Customerid
        ORDER BY Lastname
    `;

    db.query(query, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching customer orders data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No customer orders found' });
        }
        res.json(results);
    });
};

module.exports = {
    getCustomerOrders,
};