// TCSS 445 | Assign3 | Controllers | project.js
//pattern 2
const db = require('../dbConfig');
// getProjectDetails is responsible for retrieving project details based on a given project name.
const getSalesPerformance = (req, res) => {
    const projectName = req.query.projectName; // Get project name from query parameter
    const query = `
`;
    db.query(query, [projectName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching project data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No project found with that name' });
        }
        res.json(results);
    });
};
// Export an object containing the getProjectDetails function from the project.js file. 
module.exports = {
    getSalesPerformance,
};
