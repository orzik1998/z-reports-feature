const express = require('express');
const path = require('path');

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the detail page
app.get('/report/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Z Reports server running on port ${port}`);
});
