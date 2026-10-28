/** Public images resolve correctly at both localhost and GitHub Pages subpaths. */
export const DISH_IMAGES = {
  jollof: `${import.meta.env.BASE_URL}images/jollof-rice.jpg`,
  egusi: `${import.meta.env.BASE_URL}images/egusi-pounded-yam.jpg`,
  suya: `${import.meta.env.BASE_URL}images/beef-suya-skewers.jpg`,
} as const;

export interface MenuItem {
  id: string;
  name: string;
  nativeName: string;
  category: 'small-chops' | 'rice-grains' | 'soups-swallows' | 'hearth-grill' | 'drinks-desserts';
  price: number;
  region: string;
  description: string;
  ingredients: string[];
  spiceLevel: 0 | 1 | 2 | 3;
  dietary: ('Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Chef Signature')[];
  prepTime: string;
  image: string;
  winePairing?: string;
  isDailySpecial?: boolean;
}

export interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingArea: 'Heritage Hearth' | 'Emerald Courtyard' | "Chef's Tasting Counter";
  occasion?: string;
  specialRequests?: string;
  preSelectedDishes?: string[];
  createdAt: string;
}

export const RESTAURANT_INFO = {
  name: 'Zamani African Heritage Kitchen',
  shortName: 'ZAMANI',
  tagline: 'African Hearth & Gastronomy',
  subheading: 'Centuries of culinary soul in an emerald dining sanctuary.',
  phone: '+44 20 7946 0912',
  displayPhone: '+44 (0) 20 7**6 ***2',
  whatsappNumber: '4*********6',
  whatsappDisplay: '+44 7**0 9***26',
  email: 'concierge@zamanihearth.com',
  address: '28 Victoria Crescent, Kensington, London W8 5RH',
  googleMapsUrl: 'https://maps.google.com/?q=Kensington+London',
  openingHours: [
    { days: 'Tuesday – Friday', lunch: '12:00 PM – 3:30 PM', dinner: '5:30 PM – 11:00 PM' },
    { days: 'Saturday', lunch: '12:30 PM – 4:00 PM', dinner: '5:00 PM – 11:30 PM' },
    { days: 'Sunday', lunch: '1:00 PM – 9:00 PM', dinner: 'Continuous Service' },
    { days: 'Monday', lunch: 'Closed', dinner: 'Private Hire' },
  ],
  chef: {
    name: 'Chef Folake Adesina',
    title: 'Head Chef',
    quote: 'Ancestral fire, slow reductions, and seasonal single-origin spices.',
    accolades: 'West African Gastronomy Award',
  },
  stats: [
    { label: 'Heritage Recipes', value: '38+' },
    { label: 'Guest Rating', value: '4.9★' },
    { label: 'Single-Origin Spices', value: '14 Regions' },
  ],
};

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All Dishes', icon: 'Sparkles', count: 15 },
  { id: 'small-chops', label: 'Small Chops', icon: 'Utensils', count: 3 },
  { id: 'rice-grains', label: 'Jollof & Grains', icon: 'Flame', count: 3 },
  { id: 'soups-swallows', label: 'Clay Pot Soups', icon: 'Soup', count: 3 },
  { id: 'hearth-grill', label: 'Woodsmoke Suya', icon: 'Beef', count: 3 },
  { id: 'drinks-desserts', label: 'Sips & Sweets', icon: 'GlassWater', count: 3 },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // Small Chops
  {
    id: 'puff-puff-caviar',
    name: 'Puff Puff & Chili Jam',
    nativeName: 'Mikate & Ata Din-Din',
    category: 'small-chops',
    price: 9.5,
    region: 'Lagos',
    description: 'Golden fermented dough with nutmeg and roasted Scotch bonnet jam.',
    ingredients: ['Fermented yeast dough', 'Nutmeg', 'Scotch bonnet', 'Wild honey'],
    spiceLevel: 1,
    dietary: ['Vegetarian'],
    prepTime: '10 mins',
    image: DISH_IMAGES.jollof,
  },
  {
    id: 'kelewele-ginger',
    name: 'Charred Kelewele',
    nativeName: 'Kelewele na Nkatie',
    category: 'small-chops',
    price: 10.5,
    region: 'Accra',
    description: 'Ripe plantain tossed in crushed ginger and roasted peanuts.',
    ingredients: ['Plantain', 'Ginger', 'Ashanti cloves', 'Roasted peanuts'],
    spiceLevel: 2,
    dietary: ['Vegan', 'Gluten-Free', 'Chef Signature'],
    prepTime: '12 mins',
    image: DISH_IMAGES.jollof,
  },
  {
    id: 'akara-prawns',
    name: 'Black-Eyed Pea Akara',
    nativeName: 'Kosai & Ede',
    category: 'small-chops',
    price: 14.0,
    region: 'Oyo',
    description: 'Crisp pea fritters with sautéed prawns and smoked pepper oil.',
    ingredients: ['Black-eyed peas', 'King prawns', 'Fermented iru', 'Habanero'],
    spiceLevel: 2,
    dietary: ['Gluten-Free'],
    prepTime: '14 mins',
    image: DISH_IMAGES.egusi,
  },

  // Rice & Grains
  {
    id: 'smoked-party-jollof',
    name: 'Firewood Smoked Jollof',
    nativeName: 'Iresi Jollof Oloyin',
    category: 'rice-grains',
    price: 24.5,
    region: 'Lagos',
    description: 'Aged rice in roasted pepper broth with charred crust and caramelized plantain.',
    ingredients: ['Parboiled rice', 'Roasted bell pepper', 'Scotch bonnet', 'Plantain dodo', 'Curry leaf'],
    spiceLevel: 2,
    dietary: ['Gluten-Free', 'Chef Signature'],
    prepTime: '20 mins',
    winePairing: 'Pinotage, Western Cape',
    isDailySpecial: true,
    image: DISH_IMAGES.jollof,
  },
  {
    id: 'thieboudienne-rouge',
    name: 'Senegalese Thiéboudienne',
    nativeName: 'Ceebu Jën',
    category: 'rice-grains',
    price: 27.0,
    region: 'Saint-Louis',
    description: 'Broken jasmine rice steamed in tamarind tomato broth with pan-seared sea bass.',
    ingredients: ['Broken jasmine rice', 'Sea bass', 'Tamarind', 'Cassava', 'Netetou'],
    spiceLevel: 2,
    dietary: ['Gluten-Free'],
    prepTime: '22 mins',
    image: DISH_IMAGES.jollof,
  },
  {
    id: 'waakye-royale',
    name: 'Heritage Waakye',
    nativeName: 'Waakye na Shito',
    category: 'rice-grains',
    price: 26.0,
    region: 'Northern Ghana',
    description: 'Rice and cowpeas steamed with sorghum leaves, dark shito chili jam, and egg.',
    ingredients: ['Cowpeas', 'Sorghum leaves', 'Aged rice', 'Black shito jam', 'Egg'],
    spiceLevel: 3,
    dietary: ['Gluten-Free'],
    prepTime: '18 mins',
    image: DISH_IMAGES.jollof,
  },

  // Clay Pot Soups & Swallows
  {
    id: 'royal-egusi-pounded-yam',
    name: 'Velvet Egusi Stew & Pounded Yam',
    nativeName: 'Egusi Elepo & Iyan',
    category: 'soups-swallows',
    price: 26.5,
    region: 'Yoruba Heartland',
    description: 'Stone-crushed melon seeds in palm oil with fluted pumpkin greens, braised beef, and pounded yam.',
    ingredients: ['Melon seeds', 'Virgin palm oil', 'Tender braised beef', 'Pumpkin leaves', 'Pounded yam'],
    spiceLevel: 2,
    dietary: ['Gluten-Free', 'Chef Signature'],
    prepTime: '20 mins',
    winePairing: 'Grenache, Cederberg',
    isDailySpecial: true,
    image: DISH_IMAGES.egusi,
  },
  {
    id: 'ogbono-fisherman',
    name: 'Coastal Ogbono Broth',
    nativeName: 'Ogbono Ofe Ndida',
    category: 'soups-swallows',
    price: 28.0,
    region: 'Niger Delta',
    description: 'Wild bush mango seed reduction with prawns, crab claws, and uziza leaf.',
    ingredients: ['Wild mango seeds', 'Crab claws', 'Tiger prawns', 'Uziza leaf'],
    spiceLevel: 2,
    dietary: ['Gluten-Free'],
    prepTime: '22 mins',
    image: DISH_IMAGES.egusi,
  },
  {
    id: 'doro-wat-injera',
    name: 'Ethiopian Doro Wat',
    nativeName: 'Doro Wot & Injera',
    category: 'soups-swallows',
    price: 25.0,
    region: 'Ethiopian Highlands',
    description: 'Chicken simmered in berbere spice butter with soft egg and fermented teff injera.',
    ingredients: ['Chicken', 'Berbere spice', 'Spiced butter', 'Poached egg', 'Teff injera'],
    spiceLevel: 2,
    dietary: ['Gluten-Free'],
    prepTime: '18 mins',
    image: DISH_IMAGES.egusi,
  },

  // Hearth & Suya
  {
    id: 'kallaba-beef-suya',
    name: 'Woodfire Beef Sirloin Suya',
    nativeName: 'Nama Mai Yaji',
    category: 'hearth-grill',
    price: 22.0,
    region: 'Kano',
    description: 'Thin beef sirloin coated in peanut yaji spice, charred over embers with sweet onion and lime.',
    ingredients: ['Beef sirloin', 'Northern yaji spice', 'Peanut meal', 'Red onion', 'Lime'],
    spiceLevel: 3,
    dietary: ['Gluten-Free', 'Chef Signature'],
    prepTime: '15 mins',
    winePairing: 'Cabernet Sauvignon',
    isDailySpecial: true,
    image: DISH_IMAGES.suya,
  },
  {
    id: 'asun-peppered-goat',
    name: 'Peppered Asun Goat',
    nativeName: 'Asun Alata',
    category: 'hearth-grill',
    price: 21.0,
    region: 'Ondo',
    description: 'Wood-smoked goat meat tossed with blistered habaneros and sweet peppers.',
    ingredients: ['Smoked goat', 'Habanero', 'Sweet peppers', 'Spring onion', 'Lime'],
    spiceLevel: 3,
    dietary: ['Gluten-Free'],
    prepTime: '16 mins',
    image: DISH_IMAGES.suya,
  },
  {
    id: 'peri-peri-sea-bream',
    name: 'Charred Peri-Peri Sea Bream',
    nativeName: 'Peixe na Brasa',
    category: 'hearth-grill',
    price: 29.5,
    region: 'Maputo',
    description: 'Whole sea bream marinated in bird’s eye chili, garlic, and fresh lemon.',
    ingredients: ['Whole sea bream', 'Bird’s eye chili', 'Lemon oil', 'Garlic', 'Coriander'],
    spiceLevel: 2,
    dietary: ['Gluten-Free'],
    prepTime: '22 mins',
    image: DISH_IMAGES.suya,
  },

  // Drinks & Desserts
  {
    id: 'artisan-zobo-spritz',
    name: 'Hibiscus Star Anise Zobo',
    nativeName: 'Zoborodo Royal',
    category: 'drinks-desserts',
    price: 7.5,
    region: 'Sahel',
    description: 'Cold-steeped organic hibiscus with cinnamon, star anise, and fresh ginger.',
    ingredients: ['Hibiscus calyces', 'Fresh ginger', 'Star anise', 'Orange peel'],
    spiceLevel: 0,
    dietary: ['Vegan', 'Gluten-Free', 'Chef Signature'],
    prepTime: '5 mins',
    image: DISH_IMAGES.jollof,
  },
  {
    id: 'palm-wine-cooler',
    name: 'Sparkling Palm Nectar',
    nativeName: 'Emu & Lemoni',
    category: 'drinks-desserts',
    price: 8.5,
    region: 'Southern Rainforests',
    description: 'Wild palm nectar with fresh lemongrass, lime, and botanical soda.',
    ingredients: ['Palm nectar', 'Lemongrass', 'Lime', 'Mineral soda'],
    spiceLevel: 0,
    dietary: ['Vegan', 'Gluten-Free'],
    prepTime: '5 mins',
    image: DISH_IMAGES.jollof,
  },
  {
    id: 'plantain-crumble-tart',
    name: 'Caramelized Plantain Tart',
    nativeName: 'Dodo Dun & Baobab',
    category: 'drinks-desserts',
    price: 11.0,
    region: 'Pastry Lab',
    description: 'Cassava pastry with sweet plantain compote and vanilla bean gelato.',
    ingredients: ['Plantain compote', 'Baobab curd', 'Toasted coconut', 'Vanilla gelato'],
    spiceLevel: 0,
    dietary: ['Vegetarian', 'Gluten-Free'],
    prepTime: '8 mins',
    image: DISH_IMAGES.jollof,
  },
];

export const WHATSAPP_PRESETS = [
  {
    id: 'reserve-table',
    title: 'Table Reservation',
    badge: 'Quick Desk',
    message: 'Hello Zamani! I would like to check table availability for [Date & Time].',
  },
  {
    id: 'catering-events',
    title: 'Private Feasts & Events',
    badge: 'Events',
    message: 'Hello! I would like to inquire about hosting a private dinner at Zamani.',
  },
  {
    id: 'dietary-spices',
    title: 'Spice Level Enquiry',
    badge: 'Kitchen',
    message: 'Hi Zamani, could you let me know if mild spice options are available tonight?',
  },
  {
    id: 'chefs-specials',
    title: "Today's Specials",
    badge: 'Daily Cut',
    message: "Hi! What are today's fresh hearth specials?",
  },
];

