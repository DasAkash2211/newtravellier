export interface VRTour {
  id: string;
  destination: string;
  country: string;
  description: string;
  videoId: string; // YouTube 360 video ID
  thumbnail: string;
  tags: string[];
  duration: string;
}

export const vrTours: VRTour[] = [
  {
    id: 'bali-vr',
    destination: 'Bali Temples',
    country: 'Indonesia',
    description: 'Walk through ancient temples and lush rice terraces of Bali in full 360°.',
    videoId: 'dBcnGIVnq8Y',
    thumbnail: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Temples', 'Culture', 'Nature'],
    duration: '4:32',
  },
  {
    id: 'swiss-alps-vr',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Soar above the Matterhorn and glide through pristine Alpine valleys.',
    videoId: 'ltIJeABtX7k',
    thumbnail: 'https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Mountains', 'Snow', 'Adventure'],
    duration: '5:10',
  },
  {
    id: 'japan-vr',
    destination: 'Kyoto Shrines',
    country: 'Japan',
    description: 'Stroll through thousands of Torii gates and cherry blossom lanes.',
    videoId: 'ChPR7E5XTXY',
    thumbnail: 'https://images.pexels.com/photos/2506922/pexels-photo-2506922.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Culture', 'History', 'Sakura'],
    duration: '6:18',
  },
  {
    id: 'maldives-vr',
    destination: 'Maldives Reef',
    country: 'Maldives',
    description: 'Dive into the turquoise lagoons and vibrant coral reefs of the Maldives.',
    videoId: 'Ea9VB1JUPOM',
    thumbnail: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Ocean', 'Diving', 'Luxury'],
    duration: '3:55',
  },
  {
    id: 'iceland-vr',
    destination: 'Northern Lights',
    country: 'Iceland',
    description: 'Experience the magical aurora borealis dancing across the Arctic sky.',
    videoId: 'kVCnOqAmPgk',
    thumbnail: 'https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Aurora', 'Arctic', 'Night Sky'],
    duration: '7:02',
  },
  {
    id: 'egypt-vr',
    destination: 'Pyramids of Giza',
    country: 'Egypt',
    description: 'Stand at the foot of the Great Pyramid and explore ancient Pharaonic wonders.',
    videoId: 'e-6s2PiRuL8',
    thumbnail: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['History', 'Desert', 'Ancient'],
    duration: '5:40',
  },
];
