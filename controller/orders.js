//Pattern 1
const db = require('../dbConfig');
/**
* The getOrdersByLastName function in a Node.js application retrieves employee data by
* last name from a database and generates an HTML response for display. 
* It uses the db.query method to execute a SQL query and handles errors gracefully.
*/
const getOrdersByLastName = (req, res) => {
    const lastName = req.query.lastName; // Get last name from query parameter
    const query = `
        SELECT CUSTOMERS.Lastname, ORDERS.Orderno
        FROM CUSTOMERS
        LEFT JOIN ORDERS ON CUSTOMERS.Customerid = ORDERS.Customerid
        WHERE CUSTOMERS.Lastname = ?
        UNION
        SELECT CUSTOMERS.Lastname, ORDERS.Orderno
        FROM CUSTOMERS
        RIGHT JOIN ORDERS ON CUSTOMERS.Customerid = ORDERS.Customerid
        WHERE CUSTOMERS.Lastname = ?
        ORDER BY Lastname
    `;
    db.query(query, [lastName, lastName], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching Customer data');
        }
        // Generate HTML response
        let html = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/minty/bootstrap.min.css">
            <div class="container mt-5">
            <h3>Order Details for Last Name: ${lastName}</h3>
        `;
        if (results.length === 0) {
            html += `<p>No results found.</p>`;
        } else {
            html += `
                <table class="table table-bordered table-striped mt-3">
                <thead class="table-dark">
                <tr>
                <th>Last Name</th>
                <th>Order Number</th>
                </tr>
                </thead>
                <tbody>
            `;
            results.forEach(result => {
                html += `
                    <tr>
                    <td>${result.Lastname}</td>
                    <td>${result.Orderno}</td>
                    </tr>
                `;
            });
            html += `
                </tbody>
                </table>
            `;
        }
        html += `
            <a href="/orders.html" class="btn btn-primary mt-3">Back to Search</a>
            </div>
        `;
        res.send(html); // Send the generated HTML as the response
    });
};
/**
* module.exports enables parts of the code to be accessible outside the file.
* Here, it exports the [getOrdersByLastName] function, allowing it to be imported.
*/
module.exports = {
    getOrdersByLastName,
};