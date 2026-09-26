-- ============================================================
-- Hendry Hotel — Supabase schema
-- Run this in Supabase Dashboard > SQL Editor.
--
-- After running this file:
-- 1. Create your admin user at Authentication > Users: email
--    admin@admin.hendry.local (must match the RLS policy below and
--    <VITE_ADMIN_USERNAME>@admin.hendry.local), with any password you like.
--    Admin write access is granted to any authenticated user via the
--    policies below.
-- ============================================================

-- ---------- hotel_info (singleton, id = 1) ----------
create table if not exists public.hotel_info (
  id smallint primary key default 1 check (id = 1),
  name text not null default 'HENDRY',
  tagline text default '',
  description text default '',
  founded text default '',
  location text default '',
  email text default '',
  phone text default '',
  "heroBadge" text default '',
  "heroTitle" text default '',
  "heroTitleAccent" text default '',
  "heroSubtitle" text default '',
  "ctaBadge" text default '',
  "ctaTitle" text default '',
  "ctaText" text default '',
  "aboutStory" text default '',
  "aboutImage" text default ''
);

-- ---------- rooms ----------
create table if not exists public.rooms (
  id bigint generated always as identity primary key,
  "sortOrder" int not null default 0,
  name text not null,
  slug text not null unique,
  category text not null default 'Suite',
  price numeric not null default 0,
  size numeric not null default 0,
  "maxGuests" int not null default 2,
  "bedType" text default '',
  floor text default '',
  image text default '',
  gallery jsonb not null default '[]'::jsonb,
  description text default '',
  amenities jsonb not null default '[]'::jsonb
);

-- ---------- experiences ----------
create table if not exists public.experiences (
  id bigint generated always as identity primary key,
  "sortOrder" int not null default 0,
  title text not null,
  description text default '',
  image text default ''
);

-- ---------- stats ----------
create table if not exists public.stats (
  id bigint generated always as identity primary key,
  "sortOrder" int not null default 0,
  value text not null,
  label text not null default ''
);

-- ---------- testimonials ----------
create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  "sortOrder" int not null default 0,
  text text not null,
  author text not null default '',
  origin text default '',
  rating int not null default 5 check (rating between 1 and 5)
);

-- ---------- core values ("values" is a reserved word) ----------
create table if not exists public.core_values (
  id bigint generated always as identity primary key,
  "sortOrder" int not null default 0,
  title text not null,
  description text default '',
  icon text default ''
);

-- ---------- gallery images ----------
create table if not exists public.gallery_images (
  id bigint generated always as identity primary key,
  "sortOrder" int not null default 0,
  src text not null,
  alt text default '',
  span text not null default 'col-span-1 row-span-1'
);

-- ============================================================
-- Row Level Security: everyone can read; only the admin email
-- (the user you create at Authentication > Users) can write.
-- Keep the email in sync with <VITE_ADMIN_USERNAME>@admin.hendry.local.
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'hotel_info', 'rooms', 'experiences', 'stats',
    'testimonials', 'core_values', 'gallery_images'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);

    execute format(
      'drop policy if exists "public_read" on public.%I;', t);
    execute format(
      'create policy "public_read" on public.%I for select using (true);', t);

    execute format(
      'drop policy if exists "admin_write" on public.%I;', t);
    execute format(
      'create policy "admin_write" on public.%I for all
         using (auth.jwt() ->> ''email'' = ''admin@admin.hendry.local'')
         with check (auth.jwt() ->> ''email'' = ''admin@admin.hendry.local'');', t);
  end loop;
end $$;

-- ============================================================
-- Dedupe
--
-- The tables below have no unique constraint, and the seed
-- inserts that follow used to run unguarded, so every re-run of
-- this file appended a second copy of each row. These deletes
-- drop any row that matches a lower-id row in every column,
-- keeping the oldest. Rows an admin has since edited differ in
-- value and are left alone, so this is safe to run repeatedly
-- and is a no-op once the data is clean.
-- ============================================================
delete from public.experiences a using public.experiences b
where a.id > b.id
  and a."sortOrder" is not distinct from b."sortOrder"
  and a.title is not distinct from b.title
  and a.description is not distinct from b.description
  and a.image is not distinct from b.image;

delete from public.stats a using public.stats b
where a.id > b.id
  and a."sortOrder" is not distinct from b."sortOrder"
  and a.value is not distinct from b.value
  and a.label is not distinct from b.label;

delete from public.testimonials a using public.testimonials b
where a.id > b.id
  and a."sortOrder" is not distinct from b."sortOrder"
  and a.text is not distinct from b.text
  and a.author is not distinct from b.author
  and a.origin is not distinct from b.origin
  and a.rating is not distinct from b.rating;

delete from public.core_values a using public.core_values b
where a.id > b.id
  and a."sortOrder" is not distinct from b."sortOrder"
  and a.title is not distinct from b.title
  and a.description is not distinct from b.description
  and a.icon is not distinct from b.icon;

delete from public.gallery_images a using public.gallery_images b
where a.id > b.id
  and a."sortOrder" is not distinct from b."sortOrder"
  and a.src is not distinct from b.src
  and a.alt is not distinct from b.alt
  and a.span is not distinct from b.span;

-- ============================================================
-- Seed data (mirrors src/data/hotelData.js)
-- ============================================================
insert into public.hotel_info (
  id, name, tagline, description, founded, location, email, phone,
  "heroBadge", "heroTitle", "heroTitleAccent", "heroSubtitle",
  "ctaBadge", "ctaTitle", "ctaText", "aboutStory", "aboutImage"
) values (
  1,
  'HENDRY',
  'Where Luxury Meets Serenity',
  'Nestled in the heart of the Mediterranean, Hendry is a sanctuary of refined elegance. Every detail has been curated to provide an unparalleled experience of comfort and sophistication.',
  '2018',
  'Santorini, Greece',
  'reservations@hendry-hotel.com',
  '+30 22860 71234',
  'Santorini, Greece',
  'Where Luxury Meets',
  'Serenity',
  'A curated collection of extraordinary spaces designed to elevate your senses and nourish your soul.',
  'Begin Your Journey',
  'Your Escape Awaits',
  'Discover a world where every detail has been considered, every moment has been crafted, and every experience is uniquely yours.',
  E'Hendry was born from a simple yet profound belief: that luxury should be felt, not merely seen. Founded in 2018 by Alexandros Petridis, our hotel emerged from a desire to create a space where the timeless beauty of the Mediterranean meets contemporary elegance.\n\nPerched on the volcanic cliffs of Santorini, Greece, Hendry draws inspiration from the island''s dramatic landscapes — the deep blue of the Aegean, the blinding white of traditional architecture, and the golden hues of the setting sun.\n\nEvery aspect of Hendry has been thoughtfully designed to honor the traditions of Greek hospitality while pushing the boundaries of modern luxury. We believe that true sophistication lies in the details — from the hand-selected linens to the locally sourced ingredients in our kitchen.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'
)
on conflict (id) do nothing;

insert into public.rooms (
  "sortOrder", name, slug, category, price, size, "maxGuests",
  "bedType", floor, image, gallery, description, amenities
) values
(1, 'The Horizon Suite', 'horizon-suite', 'Suite', 890, 85, 2, 'King', '5th Floor',
 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
 '["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80"]'::jsonb,
 'Perched on the fifth floor, The Horizon Suite offers breathtaking panoramic views of the Aegean Sea. Floor-to-ceiling windows frame the infinite blue, while the private terrace becomes your personal front row to the most spectacular sunsets on earth.',
 '["Private terrace with sea view","Walk-in rainfall shower","Freestanding marble bathtub","Complimentary minibar","24/7 butler service","Bang & Olufsen sound system"]'::jsonb),
(2, 'The Terrace Villa', 'terrace-villa', 'Villa', 1450, 150, 4, '2 King Beds', 'Ground Floor',
 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
 '["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80","https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80"]'::jsonb,
 'A private oasis of calm, The Terrace Villa extends seamlessly from indoor luxury to outdoor paradise. Your own infinity plunge pool merges with the horizon, while ancient olive trees provide dappled shade over the al fresco dining area.',
 '["Private infinity plunge pool","Outdoor rain shower","Full kitchenette","Dedicated villa host","Hermès bath products","Sonos surround system"]'::jsonb),
(3, 'The Caldera Penthouse', 'caldera-penthouse', 'Penthouse', 2200, 220, 4, 'Emperor King', '6th Floor',
 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80',
 '["https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80","https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"]'::jsonb,
 'The crown jewel of Hendry. The Caldera Penthouse spans the entire top floor, offering 360-degree views that will take your breath away. A private rooftop terrace with a heated pool, outdoor kitchen, and lounge area make this the ultimate retreat.',
 '["Rooftop heated pool","360° panoramic views","Private dining room","Wine cellar selection","Hermès amenities","Personal chef available"]'::jsonb),
(4, 'The Garden Retreat', 'garden-retreat', 'Deluxe', 620, 55, 2, 'Queen', 'Ground Floor',
 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
 '["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80","https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"]'::jsonb,
 'Immerse yourself in the lush Mediterranean gardens from your private terrace. The Garden Retreat offers an intimate connection with nature, surrounded by bougainvillea, jasmine, and the gentle sound of water features.',
 '["Private garden terrace","Outdoor soaking tub","Organic minibar","Yoga mat provided","L''Occitane bath products","Bluetooth speaker"]'::jsonb),
(5, 'The Honeymoon Suite', 'honeymoon-suite', 'Suite', 1100, 95, 2, 'King', '4th Floor',
 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
 '["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80"]'::jsonb,
 'Designed for romance, The Honeymoon Suite features a cantilevered glass floor section revealing the sea below, a private jacuzzi on the terrace, and an elegant bedroom with a canopy bed draped in flowing white linens.',
 '["Private jacuzzi terrace","Glass floor ocean view","Canopy king bed","Champagne on arrival","Couples spa vouchers","Sunset dinner reservation"]'::jsonb),
(6, 'The Atheneum Loft', 'atheneum-loft', 'Loft', 780, 75, 3, 'King + Daybed', '3rd Floor',
 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
 '["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80","https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80","https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80"]'::jsonb,
 'A double-height space flooded with natural light, The Atheneum Loft is inspired by the creative spirit of Greek intellectuals. A curated library, writing desk, and sweeping views make it perfect for those who seek inspiration.',
 '["Double-height ceiling","Curated library collection","Ergonomic writing desk","Nespresso machine","Bose wireless speaker","Complimentary late checkout"]'::jsonb)
on conflict (slug) do nothing;

-- These five tables have no unique constraint, so "on conflict do
-- nothing" would never fire and a re-run would duplicate every row.
-- Guard each seed on the table being empty instead. Re-running this
-- file therefore never overwrites or duplicates admin edits.
do $$
begin
  if not exists (select 1 from public.experiences) then
    insert into public.experiences ("sortOrder", title, description, image) values
    (1, 'Private Yacht Charter', 'Sail the caldera at sunset aboard a traditional wooden caïque.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'),
    (2, 'Wine Tasting Journey', 'Discover Assyrtiko and Mavrotragano at exclusive volcanic vineyards.', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80'),
    (3, 'Cliffside Dining', 'An intimate seven-course dinner perched above the caldera.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80'),
    (4, 'Wellness Sanctuary', 'Holistic treatments inspired by ancient Greek healing rituals.', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80');
  end if;

  if not exists (select 1 from public.stats) then
    insert into public.stats ("sortOrder", value, label) values
    (1, '6', 'Unique Rooms'),
    (2, '98%', 'Guest Satisfaction'),
    (3, '7', 'Years of Excellence'),
    (4, '24/7', 'Dedicated Service');
  end if;

  if not exists (select 1 from public.testimonials) then
    insert into public.testimonials ("sortOrder", text, author, origin, rating) values
    (1, 'Hendry redefined what luxury means to us. The attention to detail is extraordinary — from the hand-selected artwork in our suite to the personalized welcome note.', 'Charlotte & James', 'London, UK', 5),
    (2, 'We''ve stayed at world-class hotels across the globe, but nothing compares to the warmth and elegance of Hendry. The sunset from our terrace was magical.', 'Marco & Elena', 'Milan, Italy', 5),
    (3, 'The team at Hendry made our anniversary unforgettable. Every moment felt curated yet effortless — the hallmark of true luxury hospitality.', 'Sarah Chen', 'Singapore', 5);
  end if;

  if not exists (select 1 from public.core_values) then
    insert into public.core_values ("sortOrder", title, description, icon) values
    (1, 'Timeless Elegance', 'We believe true luxury is not about opulence, but about refined simplicity that stands the test of time.', '✦'),
    (2, 'Authentic Connection', 'Every interaction is an opportunity to create a genuine human connection that transcends the ordinary.', '◈'),
    (3, 'Mindful Hospitality', 'We anticipate needs before they arise, delivering intuitive service that feels both effortless and deeply personal.', '◇'),
    (4, 'Sustainable Luxury', 'Our commitment to the environment is woven into every aspect of the Hendry experience, without compromise.', '⬡');
  end if;

  if not exists (select 1 from public.gallery_images) then
    insert into public.gallery_images ("sortOrder", src, alt, span) values
    (1, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', 'Hotel exterior at sunset', 'col-span-2 row-span-2'),
    (2, 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80', 'Infinity pool overlooking the sea', 'col-span-1 row-span-1'),
    (3, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', 'Elegant room interior', 'col-span-1 row-span-1'),
    (4, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', 'Fine dining experience', 'col-span-1 row-span-2'),
    (5, 'https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=800&q=80', 'Spa treatment room', 'col-span-1 row-span-1'),
    (6, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Private beach', 'col-span-2 row-span-1');
  end if;
end $$;
