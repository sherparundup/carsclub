// index.js or app.js
const express = require('express');
const app = express();
const distributorDashboardRoute = require('./routes/distributorDashboardRoute');

app.use('/api', distributorDashboardRoute);

// Other routes...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
