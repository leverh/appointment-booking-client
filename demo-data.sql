-- Demo Data for Portfolio Demonstration
-- Run this AFTER running the schema file

-- Insert demo stylists
INSERT INTO stylists (name, bio, photo_url) VALUES
  ('Emma Schmidt', 'Senior stylist with 10 years experience. Specializes in color treatments and modern cuts.', '/images/stylists/emma-schmidt.jpg'),
  ('Lucas Weber', 'Creative hair artist passionate about bold styles and transformations. Expert in balayage.', '/images/stylists/lucas-weber.jpg'),
  ('Sofia Müller', 'Classic cuts and elegant styling. Known for attention to detail and personalized consultations.', '/images/stylists/sofia-muller.jpg'),
  ('Max Fischer', 'Men''s grooming specialist. Traditional barbering meets contemporary style.', '/images/stylists/max-fischer.jpg');

-- Insert demo services
INSERT INTO services (name, duration_minutes, price, description) VALUES
  ('Haircut', 60, 45.00, 'Professional cut and styling tailored to your preferences'),
  ('Color Treatment', 120, 85.00, 'Full color application including consultation and styling'),
  ('Balayage', 180, 120.00, 'Hand-painted highlights for a natural, sun-kissed look'),
  ('Wash & Blow Dry', 45, 30.00, 'Shampoo, conditioning treatment, and professional styling'),
  ('Beard Trim', 30, 20.00, 'Precision beard shaping and grooming'),
  ('Highlights', 120, 95.00, 'Foil highlights with toner and styling');

-- Assign services to stylists
INSERT INTO stylist_services (stylist_id, service_id)
SELECT s.id, srv.id FROM stylists s, services srv 
WHERE s.name = 'Emma Schmidt' 
AND srv.name IN ('Haircut', 'Color Treatment', 'Balayage', 'Wash & Blow Dry', 'Highlights');

INSERT INTO stylist_services (stylist_id, service_id)
SELECT s.id, srv.id FROM stylists s, services srv 
WHERE s.name = 'Lucas Weber' 
AND srv.name IN ('Haircut', 'Balayage', 'Highlights', 'Wash & Blow Dry');

INSERT INTO stylist_services (stylist_id, service_id)
SELECT s.id, srv.id FROM stylists s, services srv 
WHERE s.name = 'Sofia Müller' 
AND srv.name IN ('Haircut', 'Wash & Blow Dry', 'Highlights');

INSERT INTO stylist_services (stylist_id, service_id)
SELECT s.id, srv.id FROM stylists s, services srv 
WHERE s.name = 'Max Fischer' 
AND srv.name IN ('Haircut', 'Beard Trim', 'Wash & Blow Dry');