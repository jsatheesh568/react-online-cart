const express = require('express');
const app = express();

app.use(express.json());

// ✅ Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mcp-api', time: new Date().toISOString() });
});

// MCP CONNECT endpoint
app.post('/mcp/github/connect', (req, res) => {
  res.json({
    status: 'Connected',
    received: req.body,
    message: 'MCP connect working'
  });
});

// MCP DEPLOY endpoint
app.post('/mcp/github/deploy', (req, res) => {
  res.json({
    status: 'Deployed',
    received: req.body,
    message: 'MCP deploy working'
  });
});

// Listen on all interfaces (important)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MCP API running on port ${PORT}`);
});
