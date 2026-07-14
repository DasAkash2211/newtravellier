/*
# Create vr_videos table

1. New Tables
- `vr_videos`
  - `id` (uuid, primary key)
  - `title` (text) — display name of the destination
  - `country` (text)
  - `description` (text)
  - `video_url` (text) — direct URL to the video file
  - `thumbnail_url` (text) — cover image URL
  - `tags` (text[]) — array of tag strings
  - `duration` (text) — display string e.g. "3:42"
  - `sort_order` (int) — for manual ordering
  - `active` (boolean) — soft-toggle visibility
  - `created_at` (timestamptz)

2. Security
- Enable RLS.
- Anon + authenticated can SELECT active videos (public feature).
- Anon + authenticated can INSERT / UPDATE / DELETE (admin panel has no auth gating for now).
*/

CREATE TABLE IF NOT EXISTS vr_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  country text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  video_url text NOT NULL,
  thumbnail_url text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  duration text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE vr_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vr_select" ON vr_videos;
CREATE POLICY "vr_select" ON vr_videos FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "vr_insert" ON vr_videos;
CREATE POLICY "vr_insert" ON vr_videos FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "vr_update" ON vr_videos;
CREATE POLICY "vr_update" ON vr_videos FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "vr_delete" ON vr_videos;
CREATE POLICY "vr_delete" ON vr_videos FOR DELETE
TO anon, authenticated USING (true);
