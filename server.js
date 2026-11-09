const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Hardcoded secret (for secret scanning / DAST demo)
const ADMIN_TOKEN = 'banana-admin-secret-12345';
const DB_PASSWORD = 'super-secret-banana-db';

app.use(express.static(path.join(__dirname)));

app.get('/debug', (req, res) => {
  // Intentionally leaks credentials
  res.json({
    admin_token: ADMIN_TOKEN,
    db_password: DB_PASSWORD,
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/score', (req, res) => {
  // Simple reflection (potential XSS if consumed unsafely)
  const user = req.query.user || 'guest';
  res.send(`Score for ${user}`);
});

app.listen(PORT, () => {
  console.log(`Banana Clicker running on http://localhost:${PORT}`);
});
