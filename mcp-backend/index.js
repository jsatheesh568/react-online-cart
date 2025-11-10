const express = require('express');
const app = express();
app.use(express.json());

app.post('/mcp/github/connect', (req, res) => {
  res.json({ status: 'Connected', received: req.body });
});

app.post('/mcp/github/deploy', (req, res) => {
  res.json({ status: 'Deployed', received: req.body });
});

app.listen(3000, () => console.log('MCP API running on port 3000'));
