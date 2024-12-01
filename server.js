// Step 1: Import Required Libraries
const express = require('express');
const app = express();
// Step 2: Import Controllers
// Import the employee controller to handle employee-related routes.
// const employeeController = require('./controllers/employee');
// Step 3: Middleware Setup
// Use express.json() to parse incoming JSON requests.
// Use express.static() to serve static files from the 'public' directory.
// app.use(express.json());
// app.use(express.static('public'));
// Step 4: Define Routes
// Set up a GET route for '/employee' that invokes the getAllEmployees method 
// from the employee controller. For the dropdownmenu selection, use a different
// method called getEmployeeDetails
// app.get('/employee', employeeController.getAllEmployees);
// app.get('/employee/details', employeeController.getEmployeeDetails);
// Step 5: Start the Server
// Define the port the server will listen on, defaulting to 5000 if not specified in environment variables.
const PORT = process.env.PORT || 5000;
// Start the server and log a message indicating the URL.
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});