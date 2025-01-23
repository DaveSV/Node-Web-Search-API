# Java Spring Search API

A Node.js REST API service that provides search functionality for Java and Spring-related learning resources using Supabase as the backend database.

## Features

- Full-text search across Java resources
- Category-based filtering
- RESTful API endpoints
- Supabase integration for data storage
- CORS enabled for cross-origin requests

## API Endpoints

### 1. Search Resources
```
GET /api/search
```

Query Parameters:
- `query`: Search term for full-text search across titles and descriptions
- `category`: Filter results by specific category

Example:
```
GET /api/search?query=spring&category=Spring Web
```

### 2. Get Categories
```
GET /api/categories
```
Returns a list of all unique categories available in the database.

### 3. Health Check
```
GET /
```
Simple endpoint to verify API is running.

## Database Schema

The application uses a `java_resources` table with the following structure:
- `id`: UUID (Primary Key)
- `title`: Text (Required)
- `description`: Text
- `category`: Text (Required)
- `tags`: Text Array
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Technical Details

- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Features**:
  - Full-text search using PostgreSQL's text search capabilities
  - Row Level Security (RLS) enabled
  - Public read access
  - CORS enabled for development

## Environment Variables

Required environment variables in `.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000 (optional, defaults to 3000)
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Start production server:
```bash
npm start
```

The server will start on port 3000 (or the port specified in your environment variables).