export const hotelInfo = {
  name: "AURELIA",
  tagline: "Where Luxury Meets Serenity",
  description:
    "Nestled in the heart of the Mediterranean, Aurelia is a sanctuary of refined elegance. Every detail has been curated to provide an unparalleled experience of comfort and sophistication.",
  founded: "2018",
  location: "Santorini, Greece",
  email: "reservations@aurelia-hotel.com",
  phone: "+30 22860 71234",
};

export const rooms = [
  {
    id: 1,
    name: "The Horizon Suite",
    slug: "horizon-suite",
    category: "Suite",
    price: 890,
    size: 85,
    maxGuests: 2,
    bedType: "King",
    floor: "5th Floor",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    ],
    description:
      "Perched on the fifth floor, The Horizon Suite offers breathtaking panoramic views of the Aegean Sea. Floor-to-ceiling windows frame the infinite blue, while the private terrace becomes your personal front row to the most spectacular sunsets on earth.",
    amenities: [
      "Private terrace with sea view",
      "Walk-in rainfall shower",
      "Freestanding marble bathtub",
      "Complimentary minibar",
      "24/7 butler service",
      "Bang & Olufsen sound system",
    ],
  },
  {
    id: 2,
    name: "The Terrace Villa",
    slug: "terrace-villa",
    category: "Villa",
    price: 1450,
    size: 150,
    maxGuests: 4,
    bedType: "2 King Beds",
    floor: "Ground Floor",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
    ],
    description:
      "A private oasis of calm, The Terrace Villa extends seamlessly from indoor luxury to outdoor paradise. Your own infinity plunge pool merges with the horizon, while ancient olive trees provide dappled shade over the al fresco dining area.",
    amenities: [
      "Private infinity plunge pool",
      "Outdoor rain shower",
      "Full kitchenette",
      "Dedicated villa host",
      "Hermès bath products",
      "Sonos surround system",
    ],
  },
  {
    id: 3,
    name: "The Caldera Penthouse",
    slug: "caldera-penthouse",
    category: "Penthouse",
    price: 2200,
    size: 220,
    maxGuests: 4,
    bedType: "Emperor King",
    floor: "6th Floor",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    description:
      "The crown jewel of Aurelia. The Caldera Penthouse spans the entire top floor, offering 360-degree views that will take your breath away. A private rooftop terrace with a heated pool, outdoor kitchen, and lounge area make this the ultimate retreat.",
    amenities: [
      "Rooftop heated pool",
      "360° panoramic views",
      "Private dining room",
      "Wine cellar selection",
      "Hermès amenities",
      "Personal chef available",
    ],
  },
  {
    id: 4,
    name: "The Garden Retreat",
    slug: "garden-retreat",
    category: "Deluxe",
    price: 620,
    size: 55,
    maxGuests: 2,
    bedType: "Queen",
    floor: "Ground Floor",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    description:
      "Immerse yourself in the lush Mediterranean gardens from your private terrace. The Garden Retreat offers an intimate connection with nature, surrounded by bougainvillea, jasmine, and the gentle sound of water features.",
    amenities: [
      "Private garden terrace",
      "Outdoor soaking tub",
      "Organic minibar",
      "Yoga mat provided",
      "L'Occitane bath products",
      "Bluetooth speaker",
    ],
  },
  {
    id: 5,
    name: "The Honeymoon Suite",
    slug: "honeymoon-suite",
    category: "Suite",
    price: 1100,
    size: 95,
    maxGuests: 2,
    bedType: "King",
    floor: "4th Floor",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    ],
    description:
      "Designed for romance, The Honeymoon Suite features a cantilevered glass floor section revealing the sea below, a private jacuzzi on the terrace, and an elegant bedroom with a canopy bed draped in flowing white linens.",
    amenities: [
      "Private jacuzzi terrace",
      "Glass floor ocean view",
      "Canopy king bed",
      "Champagne on arrival",
      "Couples spa vouchers",
      "Sunset dinner reservation",
    ],
  },
  {
    id: 6,
    name: "The Atheneum Loft",
    slug: "atheneum-loft",
    category: "Loft",
    price: 780,
    size: 75,
    maxGuests: 3,
    bedType: "King + Daybed",
    floor: "3rd Floor",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
    ],
    description:
      "A double-height space flooded with natural light, The Atheneum Loft is inspired by the creative spirit of Greek intellectuals. A curated library, writing desk, and sweeping views make it perfect for those who seek inspiration.",
    amenities: [
      "Double-height ceiling",
      "Curated library collection",
      "Ergonomic writing desk",
      "Nespresso machine",
      "Bose wireless speaker",
      "Complimentary late checkout",
    ],
  },
];

export const experiences = [
  {
    id: 1,
    title: "Private Yacht Charter",
    description: "Sail the caldera at sunset aboard a traditional wooden caïque.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  },
  {
    id: 2,
    title: "Wine Tasting Journey",
    description: "Discover Assyrtiko and Mavrotragano at exclusive volcanic vineyards.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
  },
  {
    id: 3,
    title: "Cliffside Dining",
    description: "An intimate seven-course dinner perched above the caldera.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    id: 4,
    title: "Wellness Sanctuary",
    description: "Holistic treatments inspired by ancient Greek healing rituals.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
  },
];

export const stats = [
  { value: "6", label: "Unique Rooms" },
  { value: "98%", label: "Guest Satisfaction" },
  { value: "7", label: "Years of Excellence" },
  { value: "24/7", label: "Dedicated Service" },
];

export const testimonials = [
  {
    id: 1,
    text: "Aurelia redefined what luxury means to us. The attention to detail is extraordinary — from the hand-selected artwork in our suite to the personalized welcome note.",
    author: "Charlotte & James",
    origin: "London, UK",
    rating: 5,
  },
  {
    id: 2,
    text: "We've stayed at world-class hotels across the globe, but nothing compares to the warmth and elegance of Aurelia. The sunset from our terrace was magical.",
    author: "Marco & Elena",
    origin: "Milan, Italy",
    rating: 5,
  },
  {
    id: 3,
    text: "The team at Aurelia made our anniversary unforgettable. Every moment felt curated yet effortless — the hallmark of true luxury hospitality.",
    author: "Sarah Chen",
    origin: "Singapore",
    rating: 5,
  },
];

export const teamMembers = [
  {
    name: "Alexandros Petridis",
    role: "Founder & Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "With over 20 years in luxury hospitality, Alexandros founded Aurelia to create a new standard of Mediterranean elegance.",
  },
  {
    name: "Elena Vasiliou",
    role: "Head of Guest Relations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Elena ensures every guest's journey is seamless from arrival to departure, crafting personalized experiences that exceed expectations.",
  },
  {
    name: "Dimitris Alexopoulos",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce390783d7bf?w=400&q=80",
    bio: "A Michelin-starred chef who brings the flavors of the Aegean to life, Dimitris transforms local ingredients into culinary masterpieces.",
  },
];

export const values = [
  {
    title: "Timeless Elegance",
    description:
      "We believe true luxury is not about opulence, but about refined simplicity that stands the test of time.",
    icon: "✦",
  },
  {
    title: "Authentic Connection",
    description:
      "Every interaction is an opportunity to create a genuine human connection that transcends the ordinary.",
    icon: "◈",
  },
  {
    title: "Mindful Hospitality",
    description:
      "We anticipate needs before they arise, delivering intuitive service that feels both effortless and deeply personal.",
    icon: "◇",
  },
  {
    title: "Sustainable Luxury",
    description:
      "Our commitment to the environment is woven into every aspect of the Aurelia experience, without compromise.",
    icon: "⬡",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    alt: "Hotel exterior at sunset",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    alt: "Infinity pool overlooking the sea",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    alt: "Elegant room interior",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Fine dining experience",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=800&q=80",
    alt: "Spa treatment room",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Private beach",
    span: "col-span-2 row-span-1",
  },
];

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "About", path: "/about" },
];
