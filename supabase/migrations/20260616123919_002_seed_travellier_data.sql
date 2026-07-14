/*
# Seed initial tour data and site settings

1. Data Insertions
- 8 tours with all details (Bali, Swiss Alps, Japan, Maldives, Iceland, Peru, Kenya, Egypt)
- 60 tour day entries (itinerary for all tours)
- 6 testimonials
- Site settings keys: company_name, tagline, destinations_count, travelers_count, years_experience, satisfaction_rate, phone, email, office_address

2. Notes
- Uses hardcoded UUIDs for tours so tour_days can reference them deterministically
- Prices are in INR (Indian Rupees) as per project requirement
*/

-- Insert tours
INSERT INTO tours (id, slug, name, destination, country, duration, price, rating, reviews, image, highlights, included, best_time, is_active, sort_order) VALUES
('a0000001-0000-0000-0000-000000000001', 'bali-paradise', 'Bali Paradise Escape', 'Bali', 'Indonesia', '7 Days', 108000, 4.9, 324, 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Ubud Rice Terraces', 'Temple Tours', 'Beach Paradise', 'Traditional Spa'], ARRAY['Flights', '4-Star Hotels', 'Breakfast', 'Transfers', 'Guide'], 'April - October', true, 1),
('a0000001-0000-0000-0000-000000000002', 'swiss-alps', 'Swiss Alps Adventure', 'Swiss Alps', 'Switzerland', '6 Days', 158000, 4.8, 256, 'https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Matterhorn Views', 'Scenic Train Rides', 'Swiss Chocolate Tour', 'Alpine Hiking'], ARRAY['Flights', 'Mountain Hotels', 'Swiss Pass', 'Breakfast', 'Guide'], 'June - September', true, 2),
('a0000001-0000-0000-0000-000000000003', 'japan-culture', 'Japan Cultural Journey', 'Tokyo & Kyoto', 'Japan', '10 Days', 207500, 4.9, 412, 'https://images.pexels.com/photos/2506922/pexels-photo-2506922.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Ancient Temples', 'Cherry Blossoms', 'Mount Fuji', 'Bullet Train'], ARRAY['Flights', 'Ryokan Stay', 'JR Pass', 'Guide', 'Some Meals'], 'March - May, October - November', true, 3),
('a0000001-0000-0000-0000-000000000004', 'maldives-luxury', 'Maldives Luxury Retreat', 'Maldives Islands', 'Maldives', '5 Days', 274000, 5.0, 189, 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Overwater Villa', 'Private Beach', 'Snorkeling Paradise', 'Spa Retreat'], ARRAY['Seaplane Transfer', 'Overwater Villa', 'All Meals', 'Water Sports', 'Spa'], 'November - April', true, 4),
('a0000001-0000-0000-0000-000000000005', 'iceland-northern', 'Iceland Northern Lights', 'Reykjavik & Beyond', 'Iceland', '7 Days', 174000, 4.7, 203, 'https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Northern Lights', 'Blue Lagoon', 'Golden Circle', 'Glacier Hike'], ARRAY['Flights', 'SUV Transport', 'Northern Lights Tour', 'Guide', 'Some Meals'], 'September - March', true, 5),
('a0000001-0000-0000-0000-000000000006', 'peru-machu', 'Peru Machu Picchu Trek', 'Cusco & Machu Picchu', 'Peru', '8 Days', 149000, 4.8, 287, 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Machu Picchu', 'Sacred Valley', 'Cusco History', 'Traditional Culture'], ARRAY['Flights', 'Hotels', 'Train to Machu Picchu', 'Guide', 'Most Meals'], 'April - October', true, 6),
('a0000001-0000-0000-0000-000000000007', 'safari-kenya', 'Kenya Safari Adventure', 'Masai Mara & Nairobi', 'Kenya', '6 Days', 232000, 4.9, 156, 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Big Five Safari', 'Masai Village', 'Great Migration', 'Luxury Camps'], ARRAY['Flights', 'Safari Camps', 'All Game Drives', 'All Meals', 'Park Fees'], 'July - October', true, 7),
('a0000001-0000-0000-0000-000000000008', 'egypt-pyramids', 'Egypt Ancient Wonders', 'Cairo & Nile Cruise', 'Egypt', '9 Days', 166000, 4.7, 234, 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Pyramids of Giza', 'Nile Cruise', 'Valley of Kings', 'Abu Simbel'], ARRAY['Flights', 'Nile Cruise', 'Hotels', 'All Tours', 'Most Meals'], 'October - April', true, 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert tour days for Bali
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000001', 1, 'Arrival in Paradise', 'Welcome to Bali! Begin your journey in this tropical paradise.', ARRAY['Airport pickup and transfer to hotel', 'Welcome drink and check-in', 'Evening beach walk at Seminyak', 'Welcome dinner at local restaurant'], ARRAY['Welcome Dinner'], '4-Star Beach Resort, Seminyak'),
('a0000001-0000-0000-0000-000000000001', 2, 'Ubud Cultural Immersion', 'Explore the cultural heart of Bali with ancient temples and stunning landscapes.', ARRAY['Visit Tegallalang Rice Terraces at sunrise', 'Sacred Monkey Forest Sanctuary', 'Traditional Balinese cooking class', 'Evening dance performance at Ubud Palace'], ARRAY['Breakfast', 'Lunch'], '4-Star Beach Resort, Seminyak'),
('a0000001-0000-0000-0000-000000000001', 3, 'Temples and Waterfalls', 'Discover ancient temples and natural wonders of Bali.', ARRAY['Tanah Lot Temple visit', 'Tegenungan Waterfall adventure', 'Local artisan villages', 'Sunset at Uluwatu Temple'], ARRAY['Breakfast', 'Dinner'], '4-Star Beach Resort, Seminyak'),
('a0000001-0000-0000-0000-000000000001', 4, 'Beach Day Bliss', 'Relax and enjoy the pristine beaches of Bali.', ARRAY['Morning yoga session', 'Nusa Dua beach activities', 'Snorkeling excursion', 'Sunset cruise'], ARRAY['Breakfast', 'Lunch', 'Dinner'], '4-Star Beach Resort, Seminyak'),
('a0000001-0000-0000-0000-000000000001', 5, 'Adventure Day', 'Experience thrilling adventures in the Balinese highlands.', ARRAY['White water rafting at Ayung River', 'Visit Kintamani Volcano', 'Hot springs relaxation', 'Traditional village tour'], ARRAY['Breakfast', 'Lunch'], '4-Star Beach Resort, Seminyak'),
('a0000001-0000-0000-0000-000000000001', 6, 'Wellness & Relaxation', 'Pamper yourself with traditional Balinese spa treatments.', ARRAY['Traditional Balinese massage', 'Flower bath ritual', 'Meditation session', 'Farewell gala dinner'], ARRAY['Breakfast', 'Lunch', 'Dinner'], '4-Star Beach Resort, Seminyak'),
('a0000001-0000-0000-0000-000000000001', 7, 'Departure', 'Say goodbye to paradise with beautiful memories.', ARRAY['Morning leisure time', 'Hotel checkout', 'Last-minute shopping', 'Airport transfer'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert tour days for Swiss Alps
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000002', 1, 'Arrival in Zurich', 'Begin your Swiss adventure in the vibrant city of Zurich.', ARRAY['Airport transfer to city center', 'Walking tour of Old Town', 'Lake Zurich cruise', 'Swiss fondue dinner'], ARRAY['Dinner'], 'Boutique Hotel, Zurich'),
('a0000001-0000-0000-0000-000000000002', 2, 'Lucerne & Mount Pilatus', 'Explore the charming city of Lucerne and ascend Mount Pilatus.', ARRAY['Scenic train to Lucerne', 'Chapel Bridge and Lion Monument', 'Cogwheel train to Mount Pilatus', 'Panoramic views and lunch'], ARRAY['Breakfast', 'Lunch'], 'Mountain Lodge, Lucerne'),
('a0000001-0000-0000-0000-000000000002', 3, 'Interlaken Valley', 'Journey through the stunning Interlaken region.', ARRAY['Train ride through Bernese Oberland', 'Lake Brienz boat tour', 'Visit Trummelbach Falls', 'Evening in Interlaken'], ARRAY['Breakfast', 'Dinner'], 'Alpine Resort, Interlaken'),
('a0000001-0000-0000-0000-000000000002', 4, 'Jungfraujoch - Top of Europe', 'Experience the highest railway station in Europe.', ARRAY['Train to Jungfraujoch', 'Ice Palace exploration', 'Snow activities', 'Eiger Express return'], ARRAY['Breakfast', 'Lunch'], 'Alpine Resort, Interlaken'),
('a0000001-0000-0000-0000-000000000002', 5, 'Zermatt & Matterhorn', 'Witness the iconic Matterhorn mountain.', ARRAY['Glacier Express to Zermatt', 'Gornergrat railway', 'Matterhorn Glacier Paradise', 'Village exploration'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Chalet Hotel, Zermatt'),
('a0000001-0000-0000-0000-000000000002', 6, 'Departure', 'Farewell to Switzerland.', ARRAY['Morning walk in Zermatt', 'Chocolate factory visit', 'Train to Zurich Airport', 'Departure'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert tour days for Japan
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000003', 1, 'Welcome to Tokyo', 'Arrive in the fascinating metropolis of Tokyo.', ARRAY['Narita Airport pickup', 'Hotel check-in in Shibuya', 'Evening walk through Shibuya Crossing', 'Welcome dinner'], ARRAY['Dinner'], 'Modern Hotel, Shibuya'),
('a0000001-0000-0000-0000-000000000003', 2, 'Tokyo Exploration', 'Discover the contrasts of modern and traditional Tokyo.', ARRAY['Senso-ji Temple in Asakusa', 'Nakamise shopping street', 'Ueno Park and museums', 'Akihabara district'], ARRAY['Breakfast', 'Lunch'], 'Modern Hotel, Shibuya'),
('a0000001-0000-0000-0000-000000000003', 3, 'Modern Tokyo', 'Experience the cutting-edge side of Tokyo.', ARRAY['Meiji Shrine visit', 'Harajuku fashion district', 'teamLab Digital Art Museum', 'Roppongi Hills'], ARRAY['Breakfast'], 'Modern Hotel, Shibuya'),
('a0000001-0000-0000-0000-000000000003', 4, 'Mount Fuji Day Trip', 'Witness the iconic Mount Fuji.', ARRAY['Bus tour to Fuji Five Lakes', 'Chureito Pagoda views', 'Oshino Hakkai village', 'Return to Tokyo'], ARRAY['Breakfast', 'Lunch'], 'Modern Hotel, Shibuya'),
('a0000001-0000-0000-0000-000000000003', 5, 'Bullet Train to Kyoto', 'Travel to the cultural heart of Japan.', ARRAY['Shinkansen to Kyoto', 'Fushimi Inari Shrine', 'Thousand Torii Gates hike', 'Evening in Gion'], ARRAY['Breakfast'], 'Traditional Ryokan, Kyoto'),
('a0000001-0000-0000-0000-000000000003', 6, 'Ancient Kyoto', 'Explore the temples and traditions of Kyoto.', ARRAY['Kinkaku-ji Golden Pavilion', 'Ryoan-ji Zen Garden', 'Arashiyama Bamboo Grove', 'Tenryu-ji Temple'], ARRAY['Breakfast', 'Traditional Kaiseki Dinner'], 'Traditional Ryokan, Kyoto'),
('a0000001-0000-0000-0000-000000000003', 7, 'Nara Day Trip', 'Visit the ancient capital of Japan.', ARRAY['Train to Nara', 'Todai-ji Temple and Great Buddha', 'Nara Park deer feeding', 'Kasuga Taisha Shrine'], ARRAY['Breakfast', 'Lunch'], 'Traditional Ryokan, Kyoto'),
('a0000001-0000-0000-0000-000000000003', 8, 'More of Kyoto', 'Continue exploring the treasures of Kyoto.', ARRAY['Tea ceremony experience', 'Kiyomizu-dera Temple', 'Sannenzaka shopping', 'Geisha district walk'], ARRAY['Breakfast', 'Tea Ceremony'], 'Traditional Ryokan, Kyoto'),
('a0000001-0000-0000-0000-000000000003', 9, 'Osaka Excursion', 'Experience the food capital of Japan.', ARRAY['Osaka Castle', 'Dotonbori food tour', 'Kuromon Market', 'Return to Kyoto'], ARRAY['Breakfast', 'Street Food Tour'], 'Traditional Ryokan, Kyoto'),
('a0000001-0000-0000-0000-000000000003', 10, 'Sayonara Japan', 'Bid farewell to the Land of the Rising Sun.', ARRAY['Morning free time', 'Last-minute shopping', 'Transfer to Kansai Airport', 'Departure'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert tour days for Maldives
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000004', 1, 'Arrival in Paradise', 'Begin your luxury escape in the Maldives.', ARRAY['Male Airport arrival', 'Seaplane to private island', 'Welcome refreshments', 'Overwater villa orientation', 'Sunset welcome cocktail'], ARRAY['Lunch', 'Dinner'], 'Luxury Overwater Villa'),
('a0000001-0000-0000-0000-000000000004', 2, 'Underwater World', 'Discover the incredible marine life of the Maldives.', ARRAY['Morning snorkeling expedition', 'Coral reef exploration', 'Private beach picnic', 'Night snorkeling adventure'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Overwater Villa'),
('a0000001-0000-0000-0000-000000000004', 3, 'Adventure Day', 'Exciting water activities and island exploration.', ARRAY['Jet ski adventure', 'Kayaking through lagoons', 'Dolphin watching cruise', 'Sunset fishing'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Overwater Villa'),
('a0000001-0000-0000-0000-000000000004', 4, 'Ultimate Relaxation', 'Pamper yourself with world-class spa treatments.', ARRAY['Sunrise yoga on deck', 'Couples spa treatment', 'Private sandbank dinner', 'Stargazing experience'], ARRAY['Breakfast', 'Lunch', 'Romantic Dinner'], 'Luxury Overwater Villa'),
('a0000001-0000-0000-0000-000000000004', 5, 'Farewell', 'Last moments in paradise.', ARRAY['Morning swim', 'Packing assistance', 'Seaplane to Male', 'Airport departure'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert tour days for Iceland
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000005', 1, 'Land of Fire and Ice', 'Arrive in the mystical land of Iceland.', ARRAY['Keflavik Airport pickup', 'Blue Lagoon geothermal spa', 'Reykjavik city tour', 'Welcome dinner'], ARRAY['Dinner'], 'Boutique Hotel, Reykjavik'),
('a0000001-0000-0000-0000-000000000005', 2, 'Golden Circle', 'Explore the famous Golden Circle route.', ARRAY['Thingvellir National Park', 'Geysir geothermal area', 'Gullfoss waterfall', 'Northern Lights hunt'], ARRAY['Breakfast', 'Lunch'], 'Boutique Hotel, Reykjavik'),
('a0000001-0000-0000-0000-000000000005', 3, 'South Coast Wonders', 'Discover the stunning waterfalls and beaches of the south.', ARRAY['Seljalandsfoss waterfall', 'Skogafoss waterfall', 'Reynisfjara black sand beach', 'Vik village'], ARRAY['Breakfast', 'Dinner'], 'Country Hotel, South Iceland'),
('a0000001-0000-0000-0000-000000000005', 4, 'Glacier Adventure', 'Experience the mighty glaciers of Iceland.', ARRAY['Skaftafell National Park', 'Glacier hiking with crampons', 'Jokulsarlon glacier lagoon', 'Diamond Beach'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Country Hotel, South Iceland'),
('a0000001-0000-0000-0000-000000000005', 5, 'Volcanic West', 'Explore the volcanic landscapes of the Reykjanes Peninsula.', ARRAY['Krysuvik geothermal area', 'Lake Kleifarvatn', 'Garoskagi lighthouse', 'Whale watching tour'], ARRAY['Breakfast', 'Lunch'], 'Boutique Hotel, Reykjavik'),
('a0000001-0000-0000-0000-000000000005', 6, 'Snafellsnes Peninsula', 'Journey to the mystical Snafellsnes Peninsula.', ARRAY['Kirkjufell mountain', 'Arnarstapi cliffs', 'Black church at Budir', 'Final Northern Lights search'], ARRAY['Breakfast', 'Lunch', 'Farewell Dinner'], 'Boutique Hotel, Reykjavik'),
('a0000001-0000-0000-0000-000000000005', 7, 'Departure', 'Say goodbye to Iceland.', ARRAY['Morning free time', 'Hallgrimskirkja church', 'Last-minute shopping', 'Airport transfer'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert tour days for Peru
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000006', 1, 'Arrival in Cusco', 'Welcome to the ancient Inca capital.', ARRAY['Airport pickup', 'Coca tea orientation', 'Acclimatization walk', 'Evening at leisure'], ARRAY['Dinner'], 'Colonial Hotel, Cusco'),
('a0000001-0000-0000-0000-000000000006', 2, 'Cusco Exploration', 'Discover the rich history of Cusco.', ARRAY['Plaza de Armas', 'Cusco Cathedral', 'Qorikancha Temple', 'San Blas neighborhood'], ARRAY['Breakfast', 'Lunch'], 'Colonial Hotel, Cusco'),
('a0000001-0000-0000-0000-000000000006', 3, 'Sacred Valley', 'Journey through the beautiful Sacred Valley.', ARRAY['Pisac ruins and market', 'Urubamba lunch', 'Ollantaytambo fortress', 'Traditional weaving demonstration'], ARRAY['Breakfast', 'Lunch'], 'Valley Hotel, Ollantaytambo'),
('a0000001-0000-0000-0000-000000000006', 4, 'Train to Aguas Calientes', 'Scenic train journey to the gateway of Machu Picchu.', ARRAY['Vistadome train experience', 'Arrival in Aguas Calientes', 'Hot springs relaxation', 'Preparation for Machu Picchu'], ARRAY['Breakfast', 'Dinner'], 'Boutique Hotel, Aguas Calientes'),
('a0000001-0000-0000-0000-000000000006', 5, 'Machu Picchu Wonder', 'Experience the incredible Machu Picchu citadel.', ARRAY['Early bus to Machu Picchu', 'Guided tour of the citadel', 'Huayna Picchu hike option', 'Afternoon exploration'], ARRAY['Breakfast', 'Lunch'], 'Boutique Hotel, Aguas Calientes'),
('a0000001-0000-0000-0000-000000000006', 6, 'Return to Cusco', 'Journey back through the Sacred Valley.', ARRAY['Morning train to Ollantaytambo', 'Chinchero market visit', 'Maras salt mines', 'Return to Cusco'], ARRAY['Breakfast', 'Lunch'], 'Colonial Hotel, Cusco'),
('a0000001-0000-0000-0000-000000000006', 7, 'Rainbow Mountain Option', 'Choose your adventure for the day.', ARRAY['Rainbow Mountain trek option', 'Or Cusco free exploration', 'Farewell dinner', 'Folklore show'], ARRAY['Breakfast', 'Farewell Dinner'], 'Colonial Hotel, Cusco'),
('a0000001-0000-0000-0000-000000000006', 8, 'Departure', 'Adios Peru!', ARRAY['Morning at leisure', 'Alpaca textile shopping', 'Airport transfer', 'Departure'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert tour days for Kenya
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000007', 1, 'Welcome to Kenya', 'Arrive in the vibrant city of Nairobi.', ARRAY['Airport pickup', 'Hotel check-in', 'Giraffe Centre visit', 'Welcome dinner at Carnivore'], ARRAY['Dinner'], 'Luxury Hotel, Nairobi'),
('a0000001-0000-0000-0000-000000000007', 2, 'Journey to Masai Mara', 'Travel to the world-famous Masai Mara National Reserve.', ARRAY['Morning flight or drive to Mara', 'Camp check-in', 'Afternoon game drive', 'Sunset at the reserve'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Safari Camp, Masai Mara'),
('a0000001-0000-0000-0000-000000000007', 3, 'Big Five Safari', 'Full day of incredible wildlife encounters.', ARRAY['Sunrise game drive', 'Bush breakfast', 'Mid-day relaxation', 'Afternoon game drive', 'Sundowner experience'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Safari Camp, Masai Mara'),
('a0000001-0000-0000-0000-000000000007', 4, 'Culture & Wildlife', 'Experience both nature and Masai culture.', ARRAY['Morning game drive', 'Masai village visit', 'Traditional dance performance', 'Night game drive option'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Safari Camp, Masai Mara'),
('a0000001-0000-0000-0000-000000000007', 5, 'Return to Nairobi', 'Final game drive before heading back.', ARRAY['Early morning game drive', 'Breakfast and checkout', 'Flight to Nairobi', 'Optional dinner at local restaurant'], ARRAY['Breakfast', 'Dinner'], 'Luxury Hotel, Nairobi'),
('a0000001-0000-0000-0000-000000000007', 6, 'Nairobi Exploration', 'Discover Nairobi before departure.', ARRAY['Elephant Orphanage visit', 'Karen Blixen Museum', 'Last-minute shopping', 'Airport transfer'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert tour days for Egypt
INSERT INTO tour_days (tour_id, day_number, title, description, activities, meals, accommodation) VALUES
('a0000001-0000-0000-0000-000000000008', 1, 'Welcome to Egypt', 'Arrive in Cairo, the city of a thousand minarets.', ARRAY['Airport pickup', 'Hotel check-in', 'Nile dinner cruise', 'Evening at leisure'], ARRAY['Welcome Dinner'], '5-Star Hotel, Cairo'),
('a0000001-0000-0000-0000-000000000008', 2, 'Pyramids of Giza', 'Witness the ancient wonders of the world.', ARRAY['Great Pyramids tour', 'Sphinx visit', 'Solar Boat Museum', 'Camel ride experience'], ARRAY['Breakfast', 'Lunch'], '5-Star Hotel, Cairo'),
('a0000001-0000-0000-0000-000000000008', 3, 'Egyptian Museum & Old Cairo', 'Explore the treasures of ancient Egypt.', ARRAY['Egyptian Museum treasures', 'Tutankhamun exhibit', 'Khan el-Khalili bazaar', 'Old Cairo churches and mosques'], ARRAY['Breakfast', 'Lunch'], '5-Star Hotel, Cairo'),
('a0000001-0000-0000-0000-000000000008', 4, 'Fly to Luxor', 'Begin your Nile cruise journey.', ARRAY['Flight to Luxor', 'Karnak Temple', 'Board luxury cruise', 'Evening temple light show'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Nile Cruise'),
('a0000001-0000-0000-0000-000000000008', 5, 'Valley of the Kings', 'Explore the ancient burial grounds.', ARRAY['Valley of the Kings tombs', 'Temple of Hatshepsut', 'Colossi of Memnon', 'Sail to Edfu'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Nile Cruise'),
('a0000001-0000-0000-0000-000000000008', 6, 'Edfu & Kom Ombo', 'Visit remarkably preserved temples.', ARRAY['Temple of Horus in Edfu', 'Sail to Kom Ombo', 'Temple of Sobek', 'Continue to Aswan'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Nile Cruise'),
('a0000001-0000-0000-0000-000000000008', 7, 'Aswan & Abu Simbel', 'Marvel at the relocated temples of Abu Simbel.', ARRAY['Optional Abu Simbel flight', 'Philae Temple', 'Aswan High Dam', 'Felucca sail around Elephantine Island'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Nile Cruise'),
('a0000001-0000-0000-0000-000000000008', 8, 'Return to Cairo', 'Final day in Cairo.', ARRAY['Flight to Cairo', 'Sakkara step pyramid', 'Memphis ancient capital', 'Farewell dinner'], ARRAY['Breakfast', 'Farewell Dinner'], '5-Star Hotel, Cairo'),
('a0000001-0000-0000-0000-000000000008', 9, 'Departure', 'Say goodbye to Egypt.', ARRAY['Morning at leisure', 'Last-minute souvenir shopping', 'Airport transfer', 'Departure'], ARRAY['Breakfast'], '')
ON CONFLICT DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, location, avatar, trip, rating, text, is_active, sort_order) VALUES
('Sarah Johnson', 'New York, USA', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', 'Bali Paradise Escape', 5, 'This trip exceeded all my expectations! The itinerary was perfectly planned, and every detail was taken care of. The local guides were incredibly knowledgeable.', true, 1),
('Marcus Chen', 'London, UK', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', 'Japan Cultural Journey', 5, 'An absolute dream come true! Japan had been on my bucket list for years, and Travellier made it happen seamlessly. The ryokan stay was unforgettable.', true, 2),
('Elena Rodriguez', 'Barcelona, Spain', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', 'Swiss Alps Adventure', 5, 'The Swiss Alps trip was breathtaking! From the Matterhorn views to the charming villages, every moment was picture-perfect. Highly recommend!', true, 3),
('James Wilson', 'Sydney, Australia', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', 'Kenya Safari Adventure', 5, 'Seeing the Big Five in their natural habitat was life-changing. The luxury camps exceeded expectations. Travellier truly knows how to deliver adventure.', true, 4),
('Yuki Tanaka', 'Tokyo, Japan', 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150', 'Maldives Luxury Retreat', 5, 'Pure paradise! The overwater villa was incredible, and the snorkeling was world-class. Every meal was a culinary masterpiece. Worth every penny!', true, 5),
('David Miller', 'Toronto, Canada', 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150', 'Iceland Northern Lights', 5, 'Finally saw the Northern Lights! The Blue Lagoon, glacier hiking, and the Golden Circle were highlights. Expert guides made all the difference.', true, 6)
ON CONFLICT DO NOTHING;

-- Insert site settings
INSERT INTO site_settings (key, value, description) VALUES
('company_name', 'Travellier', 'Company name displayed across the site'),
('tagline', 'Explore The World', 'Main hero tagline'),
('destinations_count', '150+', 'Number displayed for destinations'),
('travelers_count', '50K+', 'Number displayed for happy travelers'),
('years_experience', '15+', 'Number displayed for years of experience'),
('satisfaction_rate', '99%', 'Customer satisfaction percentage'),
('phone', '+1 (555) 123-4567', 'Contact phone number'),
('email', 'hello@travellier.com', 'Contact email address'),
('office_address', '123 Travel Lane, New York, NY 10001', 'Office address')
ON CONFLICT (key) DO NOTHING;
