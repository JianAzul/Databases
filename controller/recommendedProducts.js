//Pattern 1, Query 8
const db = require('../dbConfig');
/**
* The getRecommendationById function in a Node.js application retrieves customer data by
* username / id from a database and generates an HTML response for display. 
* It uses the db.query method to execute a SQL query and handles errors gracefully.
*/
const getRecommendationById = (req, res) => {
    const userId = req.query.userId; // Get user Id name from query parameter
    const query = `
        WITH OrderHistory AS (
            SELECT p.Itemno, p.Category, p.Colormain, p.Colorsecondary
            FROM CUSTOMERS c
            JOIN ORDERS o ON c.Customerid = o.Customerid
            JOIN ORDERITEMS i ON o.Orderno = i.Orderno
            JOIN PRODUCTS p ON i.Itemno = p.Itemno
            WHERE c.Customerid = ? -- Denver_Sara89, 
        )
        SELECT p.Itemno, p.Category, p.Colormain, p.Colorsecondary
        FROM PRODUCTS p
        JOIN OrderHistory oh ON p.Category = oh.Category OR p.Colormain = oh.Colormain
        WHERE p.Itemno NOT IN (
            SELECT Itemno
            FROM OrderHistory
        )
        `;
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching Customer data');
        }
        // Generate HTML response
        let html = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/minty/bootstrap.min.css">
            <div class="container mt-5">
            <h3>Recommendation Details for Id: ${userId}</h3>
        `;
        if (results.length === 0) {
            html += `<p>No recommendations found.</p>`;
        } else {
            html += `
                <table class="table table-bordered table-striped mt-3">
                <thead class="table-dark">
                <tr>
                <th>Item Number</th>
                <th>Category</th>
                <th>Main Color</th>
                <th>Secondary Color</th>
                </tr>
                </thead>
                <tbody>
            `;
            results.forEach(result => {
                html += `
                    <tr>
                    <td>${result.Itemno}</td>
                    <td>${result.Category}</td>
                    <td>${result.Colormain}</td>
                    <td>${result.Colorsecondary}</td>
                    </tr>
                `;
            });
            html += `
                </tbody>
                </table>
            `;
        }
        html += `
            <a href="/recommendedProducts.html" class="btn btn-primary mt-3">Back to Search</a>
            </div>
        `;
        res.send(html); // Send the generated HTML as the response
    });
};
/**
* module.exports enables parts of the code to be accessible outside the file.
* Here, it exports the [getRecommendationById] function, allowing it to be imported.
*/
module.exports = {
    getRecommendationById,
};