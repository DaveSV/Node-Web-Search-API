/*
  # Java and Spring Web Resources Database

  1. New Tables
    - `java_resources`
      - `id` (uuid, primary key)
      - `title` (text, searchable)
      - `description` (text, searchable)
      - `category` (text) - e.g., 'Java Core', 'Spring Web', 'Spring Security'
      - `tags` (text[]) - array of related topics
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `java_resources` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS java_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Full Text Search
CREATE INDEX IF NOT EXISTS java_resources_fts_idx ON java_resources 
USING gin(to_tsvector('english', title || ' ' || description));

-- Enable RLS
ALTER TABLE java_resources ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON java_resources
  FOR SELECT
  TO public
  USING (true);

-- Insert some initial data
INSERT INTO java_resources (title, description, category, tags) VALUES
('Spring Web MVC Basics', 'Introduction to building web applications with Spring MVC', 'Spring Web', ARRAY['mvc', 'controllers', 'spring-boot']),
('Java Collections Framework', 'Deep dive into Java Collections Framework and its implementations', 'Java Core', ARRAY['collections', 'list', 'set', 'map']),
('Spring Security Authentication', 'Implementing authentication in Spring Web applications', 'Spring Security', ARRAY['security', 'auth', 'jwt'])
ON CONFLICT DO NOTHING;