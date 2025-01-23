import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Validate environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('Error: Missing Supabase credentials in .env file');
  console.log('Please connect to Supabase using the "Connect to Supabase" button');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Configure CORS to allow all origins in development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Add a test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const { query, category } = req.query;
    
    let queryBuilder = supabase
      .from('java_resources')
      .select('*');

    if (query) {
      queryBuilder = queryBuilder.textSearch(
        'title || description',
        query
      );
    }

    if (category) {
      queryBuilder = queryBuilder.eq('category', category);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Search error:', error);
      throw error;
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get categories endpoint
app.get('/api/categories', async (req, res) => {
  try {
    console.log('Fetching categories...');
    const { data, error } = await supabase
      .from('java_resources')
      .select('category');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Get unique categories
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    console.log('Categories data:', uniqueCategories);

    res.json({
      success: true,
      data: uniqueCategories
    });
  } catch (error) {
    console.error('Error in /api/categories:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Server is accessible at http://localhost:' + port);
  console.log('Supabase URL:', process.env.SUPABASE_URL);
  console.log('Supabase key is set:', !!process.env.SUPABASE_ANON_KEY);
});