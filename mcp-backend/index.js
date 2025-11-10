const express = require('express');
const app = express();

app.use(express.json());

// ✅ Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/mcp/github/connect', (req, res) => {
  res.json({ status: 'Connected', received: req.body });
});

app.post('/mcp/github/deploy', (req, res) => {
  res.json({ status: 'Deployed', received: req.body });
});

// ✅ Listen on env PORT or 3000, on all interfaces
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`MCP API running on port ${PORT}`));
