import { Product, Review } from './types';

export const DAIRY_PRODUCTS: Product[] = [
  {
    id: 'fresh-milk',
    name: 'Fresh Milk',
    description: "Pure and fresh buffalo & cow milk for your family's daily health and nutrition.",
    category: 'Daily Essentials',
    price: 66,
    unit: '1 Litre',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600',
    popular: true,
    benefits: ['100% Pure & Unadulterated', 'Rich in Calcium & Protein', 'Sourced Daily']
  },
  {
    id: 'fresh-paneer',
    name: 'Fresh Paneer',
    description: 'Ultra-soft, hygienic cottage cheese prepared fresh daily. Ideal for rich curries and snacks.',
    category: 'Fresh & Hygienic',
    price: 90,
    unit: '250g',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
    popular: true,
    benefits: ['Soft & Melt-in-mouth Texture', 'High Protein Content', 'No Artificial Preservatives']
  },
  {
    id: 'fresh-curd',
    name: 'Fresh Curd (Dahi)',
    description: 'Thick, creamy, and naturally set curd with a rich taste and cooling benefits.',
    category: 'Fresh & Hygienic',
    price: 45,
    unit: '500g',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    popular: true,
    benefits: ['Thick & Creamy Texture', 'Great for Gut Health & Digestion', 'Freshly Prepared']
  },
  {
    id: 'desi-ghee',
    name: 'Desi Ghee',
    description: 'Pure dairy ghee with a rich traditional aroma, granular texture, and authentic taste.',
    category: 'Premium Quality',
    price: 360,
    unit: '500ml',
    imageUrl: 'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?auto=format&fit=crop&q=80&w=600',
    popular: true,
    benefits: ['Traditional Granular (Danedar) Ghee', 'Rich Ayurvedic Aroma', 'Perfect for Indian Cooking']
  },
  {
    id: 'flavoured-milk',
    name: 'Flavoured Milk',
    description: 'Refreshing, nutrient-dense chilled dairy drinks available in Kesar Pista, Badam, and Elaichi flavours.',
    category: 'Beverages',
    price: 35,
    unit: '200ml Bottle',
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600',
    popular: false,
    benefits: ['Chilled & Nutrient-Rich', 'Real Saffron & Nut Extracts', 'Loved by Kids & Adults']
  },
  {
    id: 'chaach-lassi',
    name: 'Chaach & Lassi',
    description: 'Perfect thirst-quenchers. Choose between salted spiced buttermilk (Chaach) or sweet thick Lassi.',
    category: 'Beverages',
    price: 20,
    unit: '1 Packet / Glass',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    popular: false,
    benefits: ['Cooling & Rehydrating', 'Traditional Spiced Butter Milk', 'Hygienic & Fresh']
  }
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Rajesh Sharma',
    rating: 5,
    text: 'Fresh milk with consistent quality. The creaminess is excellent, and it never smells or spoils. Our daily tea tastes amazing now.',
    date: '2 days ago',
    verified: true,
    avatarLetter: 'R'
  },
  {
    id: 'rev-2',
    name: 'Priya Gupta',
    rating: 5,
    text: 'Soft, fresh paneer perfect for every meal. It is incredibly soft and tastes just like home-made paneer. Curd is also very thick and creamy.',
    date: '1 week ago',
    verified: true,
    avatarLetter: 'P'
  },
  {
    id: 'rev-3',
    name: 'Amit Verma',
    rating: 5,
    text: "Our family's preferred dairy store in Noida Phase 2. They deliver fresh stock every morning. Very clean and hygienic handling.",
    date: '3 weeks ago',
    verified: true,
    avatarLetter: 'A'
  },
  {
    id: 'rev-4',
    name: 'Sandeep Chaudhary',
    rating: 5,
    text: 'Best quality Desi Ghee in the area. Granular texture and wonderful aroma. Reminds me of pure village ghee. Highly recommended!',
    date: '1 month ago',
    verified: true,
    avatarLetter: 'S'
  }
];

export const SEO_KEYWORDS = [
  'Dairy Store in Noida',
  'Best Dairy Shop in Noida Phase 2',
  'Fresh Milk Near Me',
  'Fresh Paneer in Noida',
  'Pure Desi Ghee Noida',
  'Fresh Curd Shop',
  'Dairy Products Near Me',
  'Best Milk Supplier Noida',
  'Hygienic Dairy Store',
  'Fresh Dairy Products Noida'
];

export const CONTACT_INFO = {
  storeName: 'Parag Dairy',
  address: 'Noida Phase 2, Noida, Uttar Pradesh, 201305',
  phone: '+919873000000', // standard representational phone for Noida
  whatsapp: '+919873000000',
  gmapsUrl: 'https://maps.google.com/?q=Parag+Dairy+Noida+Phase+2',
  hours: [
    { days: 'Monday – Saturday', time: '10:00 AM – 6:00 PM' },
    { days: 'Sunday', time: 'Closed' }
  ]
};
