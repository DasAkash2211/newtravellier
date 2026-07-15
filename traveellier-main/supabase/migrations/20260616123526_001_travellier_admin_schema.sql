/*
# Travellier Admin Panel - Database Schema

1. New Tables
- `tours` — Stores tour packages with name, destination, price, rating, image, highlights, included items, best time to visit, and status (active/draft).
- `tour_days` — Stores individual day itinerary entries linked to a tour via foreign key. Each day has a title, description, activities (text[]), meals (text[]), and accommodation.
- `testimonials` — Customer testimonials with name, location, avatar, trip name, rating, review text, and status.
- `contact_submissions` — Contact form submissions with name, email, destination, message, and read status.
- `newsletter_subscribers` — Newsletter email subscriptions with timestamp.
- `site_settings` — Key-value store for site-wide configuration (stats, company info, etc.). Key is unique.

2. Security
- Enable RLS on all tables.
- Admin-scoped policies: authenticated users can perform all CRUD operations.
- Public read-only for tours, testimonials, and site_settings (front-end displays this data).
- Contact and newsletter tables: public insert (anyone can submit), authenticated read-only.
- Tour days inherit access from parent tour via EXISTS check on tours table.
*/

-- Tours table
CREATE TABLE IF NOT EXISTS tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  destination text NOT NULL,
  country text NOT NULL,
  duration text NOT NULL,
  price integer NOT NULL,
  rating numeric(2,1) NOT NULL DEFAULT 4.5,
  reviews integer NOT NULL DEFAULT 0,
  image text NOT NULL,
  highlights text[] NOT NULL DEFAULT '{}',
  included text[] NOT NULL DEFAULT '{}',
  best_time text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_tours" ON tours;
CREATE POLICY "public_read_tours" ON tours FOR SELECT
  TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "admin_read_tours" ON tours;
CREATE POLICY "admin_read_tours" ON tours FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_tours" ON tours;
CREATE POLICY "admin_insert_tours" ON tours FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_tours" ON tours;
CREATE POLICY "admin_update_tours" ON tours FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_tours" ON tours;
CREATE POLICY "admin_delete_tours" ON tours FOR DELETE
  TO authenticated USING (true);

-- Tour Days table
CREATE TABLE IF NOT EXISTS tour_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  activities text[] NOT NULL DEFAULT '{}',
  meals text[] NOT NULL DEFAULT '{}',
  accommodation text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tour_days ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_tour_days" ON tour_days;
CREATE POLICY "public_read_tour_days" ON tour_days FOR SELECT
  TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM tours WHERE tours.id = tour_days.tour_id AND tours.is_active = true)
  );

DROP POLICY IF EXISTS "admin_read_tour_days" ON tour_days;
CREATE POLICY "admin_read_tour_days" ON tour_days FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_tour_days" ON tour_days;
CREATE POLICY "admin_insert_tour_days" ON tour_days FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM tours WHERE tours.id = tour_days.tour_id)
  );

DROP POLICY IF EXISTS "admin_update_tour_days" ON tour_days;
CREATE POLICY "admin_update_tour_days" ON tour_days FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_tour_days" ON tour_days;
CREATE POLICY "admin_delete_tour_days" ON tour_days FOR DELETE
  TO authenticated USING (true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  avatar text NOT NULL DEFAULT '',
  trip text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  text text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "admin_read_testimonials" ON testimonials;
CREATE POLICY "admin_read_testimonials" ON testimonials FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);

-- Contact Submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  destination text DEFAULT '',
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact" ON contact_submissions;
CREATE POLICY "public_insert_contact" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_contact" ON contact_submissions;
CREATE POLICY "admin_read_contact" ON contact_submissions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_contact" ON contact_submissions;
CREATE POLICY "admin_update_contact" ON contact_submissions FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_contact" ON contact_submissions;
CREATE POLICY "admin_delete_contact" ON contact_submissions FOR DELETE
  TO authenticated USING (true);

-- Newsletter Subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_newsletter" ON newsletter_subscribers;
CREATE POLICY "admin_read_newsletter" ON newsletter_subscribers FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_delete_newsletter" ON newsletter_subscribers;
CREATE POLICY "admin_delete_newsletter" ON newsletter_subscribers FOR DELETE
  TO authenticated USING (true);

-- Site Settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_settings" ON site_settings;
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_settings" ON site_settings;
CREATE POLICY "admin_insert_settings" ON site_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_settings" ON site_settings;
CREATE POLICY "admin_update_settings" ON site_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_settings" ON site_settings;
CREATE POLICY "admin_delete_settings" ON site_settings FOR DELETE
  TO authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tour_days_tour_id ON tour_days(tour_id);
CREATE INDEX IF NOT EXISTS idx_tour_days_day_number ON tour_days(tour_id, day_number);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_settings_key ON site_settings(key);
