const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Verify OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY is not set in environment variables');
  process.exit(1);
}

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'healthy', message: 'DigiSathi API is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request format',
        details: 'Messages array is required' 
      });
    }

    // Prepare OpenAI request
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
      timeout: 10000 // 10 second timeout
    });

    // Handle OpenAI response
    const responseData = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error('OpenAI API Error:', responseData);
      return res.status(openaiResponse.status).json({
        error: 'OpenAI API Error',
        details: responseData.error?.message || 'Unknown error'
      });
    }

    if (!responseData.choices?.[0]?.message?.content) {
      throw new Error('No content in OpenAI response');
    }

    res.json({
      reply: responseData.choices[0].message.content,
      usage: responseData.usage // Include token usage info
    });

  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: err.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});