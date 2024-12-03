
//pattern 2
const db = require('../dbConfig');
// getProjectDetails is responsible for retrieving project details based on a given project name.
const getSalesPerformance = (req, res) => {

    /* 
        TO DO:
        Change const projectName variable to match the query
        Apply query; Also consider looking at query to see if that type of query
                     is needed to match the pattern
    */

    const projectName = req.query.projectName; // Get project name from query parameter
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
        ORDER BY total_revenue DESC;
    `;
    db.query(query, [projectName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching performance data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No performance data found with that search' }); // perhaps edit this later?
        }
        res.json(results);
    });
};
// Export an object containing the getProjectDetails function from the project.js file. 
module.exports = {
    getSalesPerformance,
};
