const db = require('../dbConfig');

const getProductRecommendations = (req, res) => {
    const customerId = req.query.customerId;

    if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }

    const query = `
        WITH OrderHistory AS (
            SELECT p.itemno, p.Category, p.Colormain, p.Colorsecondary
            FROM CUSTOMERS c, PRODUCTS p, ORDERS o, ORDERITEMS i
            WHERE c.Customerid = o.Customerid 
            AND o.Orderno = i.Orderno 
            AND i.Itemno = p.Itemno 
            AND c.Customerid = ?
        )
        SELECT p.Itemno, p.Category, p.Colormain, p.Colorsecondary
        FROM PRODUCTS p, OrderHistory oh
        WHERE p.Category IN (oh.Category)
        OR p.Colormain IN (oh.Colormain)
        EXCEPT
        SELECT * FROM OrderHistory
        ORDER BY Category, Colormain
    `;

    db.query(query, [customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching product recommendations' });
        }
        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'No recommendations found. Customer may not have any purchase history or no similar products available.' 
            });
        }
        res.json(results);
    });
};

module.exports = {
    getProductRecommendations,
};