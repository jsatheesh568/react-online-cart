const express = require('express');
const app = express();

app.use(express.json());

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mcp-api', time: new Date().toISOString() });
});

// Common handler you can extend to do real work
const executeHandler = (req, res) => {
  // TODO: pull repo/build/deploy/etc.
  res.json({ status: 'Deployed', via: req.path, received: req.body });
};

// Connect
app.post('/mcp/github/connect', (req, res) => {
  res.json({ status: 'Connected', received: req.body });
});

// Deploy (both paths accepted)
app.post('/mcp/github/deploy', executeHandler);
app.post('/mcp/deploy/execute', executeHandler);

// Listen on all interfaces
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`MCP API running on port ${PORT}`));
