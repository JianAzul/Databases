//Pattern 1
const db = require('../dbConfig');
/**
* The getCustomers function in a Node.js application retrieves customer data by
* item quantity per order from a database and generates an HTML response for display. 
* It uses the db.query method to execute a SQL query and handles errors gracefully.
*/
const getCustomers = (req, res) => {
    const minimumItemQuantity = req.query.minimumItemQuantity; // Get minimum item quantity per order from query parameter
    const query = `
        SELECT c.customerid, count(o.orderno) AS Num_Orders
        FROM CUSTOMERS c, ORDERS o, ORDERITEMS i
        WHERE c.customerid = o.customerid AND o.orderno = i.orderno
        GROUP BY c.customerid
        HAVING SUM(i.quantity) >= ?
        `;
    db.query(query, [minimumItemQuantity], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching Customer data');
        }
        // Generate HTML response
        let html = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/minty/bootstrap.min.css">
            <div class="container mt-5">
            <h3>Customer Details for Number of Orders with Minimum Item Quantity of: ${minimumItemQuantity}</h3>
        `;
        if (results.length === 0) {
            html += `<p>No recommendations found.</p>`;
        } else {
            html += `
                <table class="table table-bordered table-striped mt-3">
                <thead class="table-dark">
                <tr>
                <th>Customer Username</th>
                <th>Number of Orders</th>
                </tr>
                </thead>
                <tbody>
            `;
            results.forEach(result => {
                html += `
                    <tr>
                    <td>${result.customerid}</td>
                    <td>${result.Num_Orders}</td>
                    </tr>
                `;
            });
            html += `
                </tbody>
                </table>
            `;
        }
        html += `
            <a href="/productOrderHistory.html" class="btn btn-primary mt-3">Back to Search</a>
            </div>
        `;
        res.send(html); // Send the generated HTML as the response
    });
};
/**
* module.exports enables parts of the code to be accessible outside the file.
* Here, it exports the [getCustomers] function, allowing it to be imported.
*/
module.exports = { 
    getCustomers,
};