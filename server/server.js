const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');

const app = express();
const client = new Client({ node: 'http://localhost:9200' });

app.use(cors()); 
app.use(express.json());

app.get('/company_users', async (req, res) => {
  try {
    const result = await client.search({
      index: 'company_users',
      body: {
        query: {
          match_all: {}
        }
      }
    });

    const hits = result.hits?.hits || [];
    res.json({ hits }); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
