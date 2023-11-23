const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

// Sample route
app.get('/', (req, res) => {
res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});
