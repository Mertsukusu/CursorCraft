-- Projects table (matching backup structure)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  template_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'created'::text
);

-- Disable RLS for public access
-- ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public access to projects (no authentication required)
CREATE POLICY "Allow public access to projects" 
  ON public.projects 
  FOR ALL USING (true);

-- Commented out auth-based policies
-- CREATE POLICY "Users can view their own projects" 
--   ON public.projects 
--   FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert their own projects" 
--   ON public.projects 
--   FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can update their own projects" 
--   ON public.projects 
--   FOR UPDATE USING (auth.uid() = user_id);

-- CREATE POLICY "Users can delete their own projects" 
--   ON public.projects 
--   FOR DELETE USING (auth.uid() = user_id);

-- Templates table
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'::text[],
  content JSONB DEFAULT '{}'::jsonb
);

-- Make templates accessible to all authenticated users
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Templates are viewable by all authenticated users" 
  ON public.templates 
  FOR SELECT USING (auth.role() = 'authenticated');

-- Insert some example templates
INSERT INTO public.templates (name, description, type, tags, content) VALUES
('Next.js Blog', 'A simple blog built with Next.js', 'web', ARRAY['nextjs', 'blog', 'typescript'], '{"prompts": ["Create a responsive header component", "Create a blog post card component", "Create a featured posts section"]}'),
('React Dashboard', 'Admin dashboard with React and Tailwind', 'web', ARRAY['react', 'dashboard', 'admin'], '{"prompts": ["Create a sidebar navigation component", "Create a stats overview component", "Create a data table component"]}'),
('Express API', 'RESTful API with Express and MongoDB', 'api', ARRAY['express', 'mongodb', 'rest'], '{"prompts": ["Create a user authentication controller", "Create CRUD operations for posts", "Create middleware for request validation"]}'),
('Flutter App', 'Cross-platform mobile app with Flutter', 'mobile', ARRAY['flutter', 'mobile', 'dart'], '{"prompts": ["Create a login screen", "Create a product list screen", "Create a user profile screen"]}'); 