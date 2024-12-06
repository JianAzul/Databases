//pattern 2, Query 6
const db = require('../dbConfig');
// getSalesPerformance is responsible for retrieving 
const getSalesPerformance = (req, res) => {

    const total_units_sold = req.query.total_units_sold; // Get total_units_sold from query parameter

    const query = `
        SELECT
        p.Itemno,
        p.Category,
        p.Colormain,
        p.Price,
        COUNT(oi.Orderno) as times_ordered,
        COALESCE(SUM(oi.Quantity), 0) as total_units_sold,
        p.Price * COALESCE(SUM(oi.Quantity), 0) as total_revenue
        FROM PRODUCTS p
        LEFT JOIN ORDERITEMS oi ON p.Itemno = oi.Itemno
        GROUP BY p.Itemno, p.Category, p.Colormain, p.Price
        HAVING total_units_sold >= ?
        ORDER BY total_revenue DESC
    `;
    db.query(query, [total_units_sold], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching performance data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No performance data found with that search' }); // perhaps edit this later?
        }
        res.json(results);
    });
};
// Export an object containing the getSalesPerformance function from the project.js file. 
module.exports = {
    getSalesPerformance,
};
