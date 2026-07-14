export interface TourDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation?: string;
}

export interface Tour {
  id: string;
  name: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  itinerary: TourDay[];
  included: string[];
  bestTime: string;
}

export const tours: Tour[] = [
  {
    id: 'bali-paradise',
    name: 'Bali Paradise Escape',
    destination: 'Bali',
    country: 'Indonesia',
    duration: '7 Days',
    price: 108000,
    rating: 4.9,
    reviews: 324,
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Ubud Rice Terraces', 'Temple Tours', 'Beach Paradise', 'Traditional Spa'],
    bestTime: 'April - October',
    included: ['Flights', '4-Star Hotels', 'Breakfast', 'Transfers', 'Guide'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paradise',
        description: 'Welcome to Bali! Begin your journey in this tropical paradise.',
        activities: ['Airport pickup and transfer to hotel', 'Welcome drink and check-in', 'Evening beach walk at Seminyak', 'Welcome dinner at local restaurant'],
        meals: ['Welcome Dinner'],
        accommodation: '4-Star Beach Resort, Seminyak'
      },
      {
        day: 2,
        title: 'Ubud Cultural Immersion',
        description: 'Explore the cultural heart of Bali with ancient temples and stunning landscapes.',
        activities: ['Visit Tegallalang Rice Terraces at sunrise', 'Sacred Monkey Forest Sanctuary', 'Traditional Balinese cooking class', 'Evening dance performance at Ubud Palace'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: '4-Star Beach Resort, Seminyak'
      },
      {
        day: 3,
        title: 'Temples and Waterfalls',
        description: 'Discover ancient temples and natural wonders of Bali.',
        activities: ['Tanah Lot Temple visit', 'Tegenungan Waterfall adventure', 'Local artisan villages', 'Sunset at Uluwatu Temple'],
        meals: ['Breakfast', 'Dinner'],
        accommodation: '4-Star Beach Resort, Seminyak'
      },
      {
        day: 4,
        title: 'Beach Day Bliss',
        description: 'Relax and enjoy the pristine beaches of Bali.',
        activities: ['Morning yoga session', 'Nusa Dua beach activities', 'Snorkeling excursion', 'Sunset cruise'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: '4-Star Beach Resort, Seminyak'
      },
      {
        day: 5,
        title: 'Adventure Day',
        description: 'Experience thrilling adventures in the Balinese highlands.',
        activities: ['White water rafting at Ayung River', 'Visit Kintamani Volcano', 'Hot springs relaxation', 'Traditional village tour'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: '4-Star Beach Resort, Seminyak'
      },
      {
        day: 6,
        title: 'Wellness & Relaxation',
        description: 'Pamper yourself with traditional Balinese spa treatments.',
        activities: ['Traditional Balinese massage', 'Flower bath ritual', 'Meditation session', 'Farewell gala dinner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: '4-Star Beach Resort, Seminyak'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Say goodbye to paradise with beautiful memories.',
        activities: ['Morning leisure time', 'Hotel checkout', 'Last-minute shopping', 'Airport transfer'],
        meals: ['Breakfast'],
      }
    ]
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps Adventure',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    duration: '6 Days',
    price: 158000,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Matterhorn Views', 'Scenic Train Rides', 'Swiss Chocolate Tour', 'Alpine Hiking'],
    bestTime: 'June - September',
    included: ['Flights', 'Mountain Hotels', 'Swiss Pass', 'Breakfast', 'Guide'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich',
        description: 'Begin your Swiss adventure in the vibrant city of Zurich.',
        activities: ['Airport transfer to city center', 'Walking tour of Old Town', 'Lake Zurich cruise', 'Swiss fondue dinner'],
        meals: ['Dinner'],
        accommodation: 'Boutique Hotel, Zurich'
      },
      {
        day: 2,
        title: 'Lucerne & Mount Pilatus',
        description: 'Explore the charming city of Lucerne and ascend Mount Pilatus.',
        activities: ['Scenic train to Lucerne', 'Chapel Bridge and Lion Monument', 'Cogwheel train to Mount Pilatus', 'Panoramic views and lunch'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Mountain Lodge, Lucerne'
      },
      {
        day: 3,
        title: 'Interlaken Valley',
        description: 'Journey through the stunning Interlaken region.',
        activities: ['Train ride through Bernese Oberland', 'Lake Brienz boat tour', 'Visit Trummelbach Falls', 'Evening in Interlaken'],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Alpine Resort, Interlaken'
      },
      {
        day: 4,
        title: 'Jungfraujoch - Top of Europe',
        description: 'Experience the highest railway station in Europe.',
        activities: ['Train to Jungfraujoch', 'Ice Palace exploration', 'Snow activities', 'Eiger Express return'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Alpine Resort, Interlaken'
      },
      {
        day: 5,
        title: 'Zermatt & Matterhorn',
        description: 'Witness the iconic Matterhorn mountain.',
        activities: ['Glacier Express to Zermatt', 'Gornergrat railway', 'Matterhorn Glacier Paradise', 'Village exploration'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Chalet Hotel, Zermatt'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Farewell to Switzerland.',
        activities: ['Morning walk in Zermatt', 'Chocolate factory visit', 'Train to Zurich Airport', 'Departure'],
        meals: ['Breakfast'],
      }
    ]
  },
  {
    id: 'japan-culture',
    name: 'Japan Cultural Journey',
    destination: 'Tokyo & Kyoto',
    country: 'Japan',
    duration: '10 Days',
    price: 207500,
    rating: 4.9,
    reviews: 412,
    image: 'https://images.pexels.com/photos/2506922/pexels-photo-2506922.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Ancient Temples', 'Cherry Blossoms', 'Mount Fuji', 'Bullet Train'],
    bestTime: 'March - May, October - November',
    included: ['Flights', 'Ryokan Stay', 'JR Pass', 'Guide', 'Some Meals'],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Tokyo',
        description: 'Arrive in the fascinating metropolis of Tokyo.',
        activities: ['Narita Airport pickup', 'Hotel check-in in Shibuya', 'Evening walk through Shibuya Crossing', 'Welcome dinner'],
        meals: ['Dinner'],
        accommodation: 'Modern Hotel, Shibuya'
      },
      {
        day: 2,
        title: 'Tokyo Exploration',
        description: 'Discover the contrasts of modern and traditional Tokyo.',
        activities: ['Senso-ji Temple in Asakusa', 'Nakamise shopping street', 'Ueno Park and museums', 'Akihabara district'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Modern Hotel, Shibuya'
      },
      {
        day: 3,
        title: 'Modern Tokyo',
        description: 'Experience the cutting-edge side of Tokyo.',
        activities: ['Meiji Shrine visit', 'Harajuku fashion district', 'teamLab Digital Art Museum', 'Roppongi Hills'],
        meals: ['Breakfast'],
        accommodation: 'Modern Hotel, Shibuya'
      },
      {
        day: 4,
        title: 'Mount Fuji Day Trip',
        description: 'Witness the iconic Mount Fuji.',
        activities: ['Bus tour to Fuji Five Lakes', 'Chureito Pagoda views', 'Oshino Hakkai village', 'Return to Tokyo'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Modern Hotel, Shibuya'
      },
      {
        day: 5,
        title: 'Bullet Train to Kyoto',
        description: 'Travel to the cultural heart of Japan.',
        activities: ['Shinkansen to Kyoto', 'Fushimi Inari Shrine', 'Thousand Torii Gates hike', 'Evening in Gion'],
        meals: ['Breakfast'],
        accommodation: 'Traditional Ryokan, Kyoto'
      },
      {
        day: 6,
        title: 'Ancient Kyoto',
        description: 'Explore the temples and traditions of Kyoto.',
        activities: ['Kinkaku-ji Golden Pavilion', 'Ryoan-ji Zen Garden', 'Arashiyama Bamboo Grove', 'Tenryu-ji Temple'],
        meals: ['Breakfast', 'Traditional Kaiseki Dinner'],
        accommodation: 'Traditional Ryokan, Kyoto'
      },
      {
        day: 7,
        title: 'Nara Day Trip',
        description: 'Visit the ancient capital of Japan.',
        activities: ['Train to Nara', 'Todai-ji Temple and Great Buddha', 'Nara Park deer feeding', 'Kasuga Taisha Shrine'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Traditional Ryokan, Kyoto'
      },
      {
        day: 8,
        title: 'More of Kyoto',
        description: 'Continue exploring the treasures of Kyoto.',
        activities: ['Tea ceremony experience', 'Kiyomizu-dera Temple', 'Sannenzaka shopping', 'Geisha district walk'],
        meals: ['Breakfast', 'Tea Ceremony'],
        accommodation: 'Traditional Ryokan, Kyoto'
      },
      {
        day: 9,
        title: 'Osaka Excursion',
        description: 'Experience the food capital of Japan.',
        activities: ['Osaka Castle', 'Dotonbori food tour', 'Kuromon Market', 'Return to Kyoto'],
        meals: ['Breakfast', 'Street Food Tour'],
        accommodation: 'Traditional Ryokan, Kyoto'
      },
      {
        day: 10,
        title: 'Sayonara Japan',
        description: 'Bid farewell to the Land of the Rising Sun.',
        activities: ['Morning free time', 'Last-minute shopping', 'Transfer to Kansai Airport', 'Departure'],
        meals: ['Breakfast'],
      }
    ]
  },
  {
    id: 'maldives-luxury',
    name: 'Maldives Luxury Retreat',
    destination: 'Maldives Islands',
    country: 'Maldives',
    duration: '5 Days',
    price: 274000,
    rating: 5.0,
    reviews: 189,
    image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Overwater Villa', 'Private Beach', 'Snorkeling Paradise', 'Spa Retreat'],
    bestTime: 'November - April',
    included: ['Seaplane Transfer', 'Overwater Villa', 'All Meals', 'Water Sports', 'Spa'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paradise',
        description: 'Begin your luxury escape in the Maldives.',
        activities: ['Male Airport arrival', 'Seaplane to private island', 'Welcome refreshments', 'Overwater villa orientation', 'Sunset welcome cocktail'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Luxury Overwater Villa'
      },
      {
        day: 2,
        title: 'Underwater World',
        description: 'Discover the incredible marine life of the Maldives.',
        activities: ['Morning snorkeling expedition', 'Coral reef exploration', 'Private beach picnic', 'Night snorkeling adventure'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Overwater Villa'
      },
      {
        day: 3,
        title: 'Adventure Day',
        description: 'Exciting water activities and island exploration.',
        activities: ['Jet ski adventure', 'Kayaking through lagoons', 'Dolphin watching cruise', 'Sunset fishing'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Overwater Villa'
      },
      {
        day: 4,
        title: 'Ultimate Relaxation',
        description: 'Pamper yourself with world-class spa treatments.',
        activities: ['Sunrise yoga on deck', 'Couples spa treatment', 'Private sandbank dinner', 'Stargazing experience'],
        meals: ['Breakfast', 'Lunch', 'Romantic Dinner'],
        accommodation: 'Luxury Overwater Villa'
      },
      {
        day: 5,
        title: 'Farewell',
        description: 'Last moments in paradise.',
        activities: ['Morning swim', 'Packing assistance', 'Seaplane to Male', 'Airport departure'],
        meals: ['Breakfast'],
      }
    ]
  },
  {
    id: 'iceland-northern',
    name: 'Iceland Northern Lights',
    destination: 'Reykjavik & Beyond',
    country: 'Iceland',
    duration: '7 Days',
    price: 174000,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Northern Lights', 'Blue Lagoon', 'Golden Circle', 'Glacier Hike'],
    bestTime: 'September - March',
    included: ['Flights', 'SUV Transport', 'Northern Lights Tour', 'Guide', 'Some Meals'],
    itinerary: [
      {
        day: 1,
        title: 'Land of Fire and Ice',
        description: 'Arrive in the mystical land of Iceland.',
        activities: ['Keflavik Airport pickup', 'Blue Lagoon geothermal spa', 'Reykjavik city tour', 'Welcome dinner'],
        meals: ['Dinner'],
        accommodation: 'Boutique Hotel, Reykjavik'
      },
      {
        day: 2,
        title: 'Golden Circle',
        description: 'Explore the famous Golden Circle route.',
        activities: ['Thingvellir National Park', 'Geysir geothermal area', 'Gullfoss waterfall', 'Northern Lights hunt'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Boutique Hotel, Reykjavik'
      },
      {
        day: 3,
        title: 'South Coast Wonders',
        description: 'Discover the stunning waterfalls and beaches of the south.',
        activities: ['Seljalandsfoss waterfall', 'Skogafoss waterfall', 'Reynisfjara black sand beach', 'Vik village'],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Country Hotel, South Iceland'
      },
      {
        day: 4,
        title: 'Glacier Adventure',
        description: 'Experience the mighty glaciers of Iceland.',
        activities: ['Skaftafell National Park', 'Glacier hiking with crampons', 'Jokulsarlon glacier lagoon', 'Diamond Beach'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Country Hotel, South Iceland'
      },
      {
        day: 5,
        title: 'Volcanic West',
        description: 'Explore the volcanic landscapes of the Reykjanes Peninsula.',
        activities: ['Krysuvik geothermal area', 'Lake Kleifarvatn', 'Garoskagi lighthouse', 'Whale watching tour'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Boutique Hotel, Reykjavik'
      },
      {
        day: 6,
        title: 'Snafellsnes Peninsula',
        description: 'Journey to the mystical Snafellsnes Peninsula.',
        activities: ['Kirkjufell mountain', 'Arnarstapi cliffs', 'Black church at Budir', 'Final Northern Lights search'],
        meals: ['Breakfast', 'Lunch', 'Farewell Dinner'],
        accommodation: 'Boutique Hotel, Reykjavik'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Say goodbye to Iceland.',
        activities: ['Morning free time', 'Hallgrimskirkja church', 'Last-minute shopping', 'Airport transfer'],
        meals: ['Breakfast'],
      }
    ]
  },
  {
    id: 'peru-machu',
    name: 'Peru Machu Picchu Trek',
    destination: 'Cusco & Machu Picchu',
    country: 'Peru',
    duration: '8 Days',
    price: 149000,
    rating: 4.8,
    reviews: 287,
    image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Machu Picchu', 'Sacred Valley', 'Cusco History', 'Traditional Culture'],
    bestTime: 'April - October',
    included: ['Flights', 'Hotels', 'Train to Machu Picchu', 'Guide', 'Most Meals'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cusco',
        description: 'Welcome to the ancient Inca capital.',
        activities: ['Airport pickup', 'Coca tea orientation', 'Acclimatization walk', 'Evening at leisure'],
        meals: ['Dinner'],
        accommodation: 'Colonial Hotel, Cusco'
      },
      {
        day: 2,
        title: 'Cusco Exploration',
        description: 'Discover the rich history of Cusco.',
        activities: ['Plaza de Armas', 'Cusco Cathedral', 'Qorikancha Temple', 'San Blas neighborhood'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Colonial Hotel, Cusco'
      },
      {
        day: 3,
        title: 'Sacred Valley',
        description: 'Journey through the beautiful Sacred Valley.',
        activities: ['Pisac ruins and market', 'Urubamba lunch', 'Ollantaytambo fortress', 'Traditional weaving demonstration'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Valley Hotel, Ollantaytambo'
      },
      {
        day: 4,
        title: 'Train to Aguas Calientes',
        description: 'Scenic train journey to the gateway of Machu Picchu.',
        activities: ['Vistadome train experience', 'Arrival in Aguas Calientes', 'Hot springs relaxation', 'Preparation for Machu Picchu'],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Boutique Hotel, Aguas Calientes'
      },
      {
        day: 5,
        title: 'Machu Picchu Wonder',
        description: 'Experience the incredible Machu Picchu citadel.',
        activities: ['Early bus to Machu Picchu', 'Guided tour of the citadel', 'Huayna Picchu hike option', 'Afternoon exploration'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Boutique Hotel, Aguas Calientes'
      },
      {
        day: 6,
        title: 'Return to Cusco',
        description: 'Journey back through the Sacred Valley.',
        activities: ['Morning train to Ollantaytambo', 'Chinchero market visit', 'Maras salt mines', 'Return to Cusco'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Colonial Hotel, Cusco'
      },
      {
        day: 7,
        title: 'Rainbow Mountain Option',
        description: 'Choose your adventure for the day.',
        activities: ['Rainbow Mountain trek option', 'Or Cusco free exploration', 'Farewell dinner', 'Folklore show'],
        meals: ['Breakfast', 'Farewell Dinner'],
        accommodation: 'Colonial Hotel, Cusco'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'Adios Peru!',
        activities: ['Morning at leisure', 'Alpaca textile shopping', 'Airport transfer', 'Departure'],
        meals: ['Breakfast'],
      }
    ]
  },
  {
    id: 'safari-kenya',
    name: 'Kenya Safari Adventure',
    destination: 'Masai Mara & Nairobi',
    country: 'Kenya',
    duration: '6 Days',
    price: 232000,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Big Five Safari', 'Masai Village', 'Great Migration', 'Luxury Camps'],
    bestTime: 'July - October',
    included: ['Flights', 'Safari Camps', 'All Game Drives', 'All Meals', 'Park Fees'],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Kenya',
        description: 'Arrive in the vibrant city of Nairobi.',
        activities: ['Airport pickup', 'Hotel check-in', 'Giraffe Centre visit', 'Welcome dinner at Carnivore'],
        meals: ['Dinner'],
        accommodation: 'Luxury Hotel, Nairobi'
      },
      {
        day: 2,
        title: 'Journey to Masai Mara',
        description: 'Travel to the world-famous Masai Mara National Reserve.',
        activities: ['Morning flight or drive to Mara', 'Camp check-in', 'Afternoon game drive', 'Sunset at the reserve'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Safari Camp, Masai Mara'
      },
      {
        day: 3,
        title: 'Big Five Safari',
        description: 'Full day of incredible wildlife encounters.',
        activities: ['Sunrise game drive', 'Bush breakfast', 'Mid-day relaxation', 'Afternoon game drive', 'Sundowner experience'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Safari Camp, Masai Mara'
      },
      {
        day: 4,
        title: 'Culture & Wildlife',
        description: 'Experience both nature and Masai culture.',
        activities: ['Morning game drive', 'Masai village visit', 'Traditional dance performance', 'Night game drive option'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Safari Camp, Masai Mara'
      },
      {
        day: 5,
        title: 'Return to Nairobi',
        description: 'Final game drive before heading back.',
        activities: ['Early morning game drive', 'Breakfast and checkout', 'Flight to Nairobi', 'Optional dinner at local restaurant'],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Luxury Hotel, Nairobi'
      },
      {
        day: 6,
        title: 'Nairobi Exploration',
        description: 'Discover Nairobi before departure.',
        activities: ['Elephant Orphanage visit', 'Karen Blixen Museum', 'Last-minute shopping', 'Airport transfer'],
        meals: ['Breakfast'],
      }
    ]
  },
  {
    id: 'egypt-pyramids',
    name: 'Egypt Ancient Wonders',
    destination: 'Cairo & Nile Cruise',
    country: 'Egypt',
    duration: '9 Days',
    price: 166000,
    rating: 4.7,
    reviews: 234,
    image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: ['Pyramids of Giza', 'Nile Cruise', 'Valley of Kings', 'Abu Simbel'],
    bestTime: 'October - April',
    included: ['Flights', 'Nile Cruise', 'Hotels', 'All Tours', 'Most Meals'],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Egypt',
        description: 'Arrive in Cairo, the city of a thousand minarets.',
        activities: ['Airport pickup', 'Hotel check-in', 'Nile dinner cruise', ' evenng at leisure'],
        meals: ['Welcome Dinner'],
        accommodation: '5-Star Hotel, Cairo'
      },
      {
        day: 2,
        title: 'Pyramids of Giza',
        description: 'Witness the ancient wonders of the world.',
        activities: ['Great Pyramids tour', 'Sphinx visit', 'Solar Boat Museum', 'Camel ride experience'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: '5-Star Hotel, Cairo'
      },
      {
        day: 3,
        title: 'Egyptian Museum & Old Cairo',
        description: 'Explore the treasures of ancient Egypt.',
        activities: ['Egyptian Museum treasures', 'Tutankhamun exhibit', 'Khan el-Khalili bazaar', 'Old Cairo churches and mosques'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: '5-Star Hotel, Cairo'
      },
      {
        day: 4,
        title: 'Fly to Luxor',
        description: 'Begin your Nile cruise journey.',
        activities: ['Flight to Luxor', 'Karnak Temple', 'Board luxury cruise', 'Evening temple light show'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Nile Cruise'
      },
      {
        day: 5,
        title: 'Valley of the Kings',
        description: 'Explore the ancient burial grounds.',
        activities: ['Valley of the Kings tombs', 'Temple of Hatshepsut', 'Colossi of Memnon', 'Sail to Edfu'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Nile Cruise'
      },
      {
        day: 6,
        title: 'Edfu & Kom Ombo',
        description: 'Visit remarkably preserved temples.',
        activities: ['Temple of Horus in Edfu', 'Sail to Kom Ombo', 'Temple of Sobek', 'Continue to Aswan'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Nile Cruise'
      },
      {
        day: 7,
        title: 'Aswan & Abu Simbel',
        description: 'Marvel at the relocated temples of Abu Simbel.',
        activities: ['Optional Abu Simbel flight', 'Philae Temple', 'Aswan High Dam', 'Felucca sail around Elephantine Island'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Nile Cruise'
      },
      {
        day: 8,
        title: 'Return to Cairo',
        description: 'Final day in Cairo.',
        activities: ['Flight to Cairo', 'Sakkara step pyramid', 'Memphis ancient capital', 'Farewell dinner'],
        meals: ['Breakfast', 'Farewell Dinner'],
        accommodation: '5-Star Hotel, Cairo'
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Say goodbye to Egypt.',
        activities: ['Morning at leisure', 'Last-minute souvenir shopping', 'Airport transfer', 'Departure'],
        meals: ['Breakfast'],
      }
    ]
  }
];
