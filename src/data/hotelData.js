export const hotelInfo = {
  name: "HENDRY",
  tagline: "Where Luxury Meets Serenity",
  description:
    "Nestled in the heart of the Mediterranean, Hendry is a sanctuary of refined elegance. Every detail has been curated to provide an unparalleled experience of comfort and sophistication.",
  founded: "2018",
  location: "Santorini, Greece",
  email: "reservations@hendry-hotel.com",
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
    image: "/images/horizon-suite-800.jpg",
    gallery: [
      "/images/horizon-suite-1200.jpg",
      "/images/atheneum-loft-1200.jpg",
      "/images/asset-3-1200.jpg",
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
    image: "/images/terrace-villa-800.jpg",
    gallery: [
      "/images/terrace-villa-1200.jpg",
      "/images/asset-5-1200.jpg",
      "/images/atheneum-loft-9-1200.jpg",
    ],
    description:
      "A private oasis of calm, The Terrace Villa extends seamlessly from indoor luxury to outdoor paradise. Your own infinity plunge pool merges with the horizon, while ancient olive trees provide dappled shade over the al fresco dining area.",
    amenities: [
      "Private infinity plunge pool",
      "Outdoor rain shower",
      "Full kitchenette",
      "Dedicated villa host",
      "Herm├¿s bath products",
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
    image: "/images/caldera-penthouse-800.jpg",
    gallery: [
      "/images/caldera-penthouse-1200.jpg",
      "/images/asset-4-1200.jpg",
      "/images/asset-1200.jpg",
    ],
    description:
      "The crown jewel of Hendry. The Caldera Penthouse spans the entire top floor, offering 360-degree views that will take your breath away. A private rooftop terrace with a heated pool, outdoor kitchen, and lounge area make this the ultimate retreat.",
    amenities: [
      "Rooftop heated pool",
      "360┬░ panoramic views",
      "Private dining room",
      "Wine cellar selection",
      "Herm├¿s amenities",
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
    image: "/images/garden-retreat-800.jpg",
    gallery: [
      "/images/garden-retreat-1200.jpg",
      "/images/asset-4-1200.jpg",
      "/images/asset-1200.jpg",
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
    image: "/images/honeymoon-suite-800.jpg",
    gallery: [
      "/images/honeymoon-suite-1200.jpg",
      "/images/atheneum-loft-1200.jpg",
      "/images/asset-3-1200.jpg",
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
    image: "/images/atheneum-loft-800.jpg",
    gallery: [
      "/images/atheneum-loft-1200.jpg",
      "/images/horizon-suite-1200.jpg",
      "/images/atheneum-loft-9-1200.jpg",
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
    description: "Sail the caldera at sunset aboard a traditional wooden ca├»que.",
    image: "/images/atheneum-loft-2-800.jpg",
  },
  {
    id: 2,
    title: "Wine Tasting Journey",
    description: "Discover Assyrtiko and Mavrotragano at exclusive volcanic vineyards.",
    image: "/images/atheneum-loft-3-800.jpg",
  },
  {
    id: 3,
    title: "Cliffside Dining",
    description: "An intimate seven-course dinner perched above the caldera.",
    image: "/images/atheneum-loft-4-800.jpg",
  },
  {
    id: 4,
    title: "Wellness Sanctuary",
    description: "Holistic treatments inspired by ancient Greek healing rituals.",
    image: "/images/atheneum-loft-5-800.jpg",
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
    text: "Hendry redefined what luxury means to us. The attention to detail is extraordinary ΓÇö from the hand-selected artwork in our suite to the personalized welcome note.",
    author: "Charlotte & James",
    origin: "London, UK",
    rating: 5,
  },
  {
    id: 2,
    text: "We've stayed at world-class hotels across the globe, but nothing compares to the warmth and elegance of Hendry. The sunset from our terrace was magical.",
    author: "Marco & Elena",
    origin: "Milan, Italy",
    rating: 5,
  },
  {
    id: 3,
    text: "The team at Hendry made our anniversary unforgettable. Every moment felt curated yet effortless ΓÇö the hallmark of true luxury hospitality.",
    author: "Sarah Chen",
    origin: "Singapore",
    rating: 5,
  },
];

export const teamMembers = [
  {
    name: "Alexandros Petridis",
    role: "Founder & Director",
    image: "/images/atheneum-loft-6-400.jpg",
    bio: "With over 20 years in luxury hospitality, Alexandros founded Hendry to create a new standard of Mediterranean elegance.",
  },
  {
    name: "Elena Vasiliou",
    role: "Head of Guest Relations",
    image: "/images/atheneum-loft-7-400.jpg",
    bio: "Elena ensures every guest's journey is seamless from arrival to departure, crafting personalized experiences that exceed expectations.",
  },
  {
    name: "Dimitris Alexopoulos",
    role: "Executive Chef",
    image: "/images/atheneum-loft-4-800.jpg",
    bio: "A Michelin-starred chef who brings the flavors of the Aegean to life, Dimitris transforms local ingredients into culinary masterpieces.",
  },
];

export const values = [
  {
    title: "Timeless Elegance",
    description:
      "We believe true luxury is not about opulence, but about refined simplicity that stands the test of time.",
    icon: "Γ£ª",
  },
  {
    title: "Authentic Connection",
    description:
      "Every interaction is an opportunity to create a genuine human connection that transcends the ordinary.",
    icon: "Γùê",
  },
  {
    title: "Mindful Hospitality",
    description:
      "We anticipate needs before they arise, delivering intuitive service that feels both effortless and deeply personal.",
    icon: "Γùç",
  },
  {
    title: "Sustainable Luxury",
    description:
      "Our commitment to the environment is woven into every aspect of the Hendry experience, without compromise.",
    icon: "Γ¼í",
  },
];

export const galleryImages = [
  {
    src: "/images/atheneum-loft-8-800.jpg",
    alt: "Hotel exterior at sunset",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/atheneum-loft-9-800.jpg",
    alt: "Infinity pool overlooking the sea",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/atheneum-loft-10-800.jpg",
    alt: "Elegant room interior",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/atheneum-loft-4-800.jpg",
    alt: "Fine dining experience",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/terrace-villa-1200.jpg",
    alt: "Spa treatment room",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/atheneum-loft-11-800.jpg",
    alt: "Private beach",
    span: "col-span-2 row-span-1",
  },
];

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "About", path: "/about" },
];
