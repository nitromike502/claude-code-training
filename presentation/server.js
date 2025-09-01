const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get markdown content
app.get('/api/session-content', (req, res) => {
  try {
    const markdownPath = path.join(__dirname, '..', 'sessions', 'session-1.md');
    const content = fs.readFileSync(markdownPath, 'utf8');
    res.json({ content });
  } catch (error) {
    console.error('Error reading markdown file:', error);
    res.status(500).json({ error: 'Unable to load session content' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎯 Presentation server running at http://localhost:${PORT}`);
  console.log(`📚 Loading content from: ${path.join(__dirname, '..', 'sessions', 'session-1.md')}`);
});