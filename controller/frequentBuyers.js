const db = require('../dbConfig');

const getFrequentBuyers = (req, res) => {
    const query = `
        SELECT 
            c.customerid, 
            COUNT(o.orderno) AS order_count,
            SUM(i.quantity) AS total_items_ordered
        FROM CUSTOMERS c, ORDERS o, ORDERITEMS i
        WHERE c.customerid = o.customerid 
        AND o.orderno = i.orderno
        GROUP BY c.customerid
        HAVING SUM(i.quantity) >= 5
        ORDER BY total_items_ordered DESC
    `;

    db.query(query, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching frequent buyer data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No customers found with 5 or more items ordered' });
        }
        res.json(results);
    });
};

module.exports = {
    getFrequentBuyers,
};