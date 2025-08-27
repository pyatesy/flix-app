export interface StockLevel {
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  carouselImage?: string;
  heroImage?: string;
  productImages: string[];
  category: number[];
  brand: number;
  rating: number;
  description: string;
  smallDescription?: string;
  stockLevel: StockLevel[];
  featured?: boolean;
  recommended?: boolean;
}

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentCategory?: number;
}

export const brands: ProductBrand[] = [
  {
    id: 2,
    name: "Opal Couture",
    slug: "opal-couture",
    description: "The best in womens AI Fashion",
    image: "/assets/img/brands/opal-couture.jpg"
  },
  {
    id: 1,
    name: "Man by Opal",
    slug: "man-by-opal",
    description: "The best in womens AI Fashion",
    image: "/assets/img/brands/opal-couture.jpg"
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Womens",
    slug: "womens",
    description: "Latest Womens Fashion",
    parentCategory: 0,
    image: "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1kMGI2NTIwNjcyY2YxMWYwODMzNjFlMzNhZWY3MTY5NA=="
  },
  {
    id: 2,
    name: "Elegant Workwear",
    slug: "elegant-workwear",
    description: "Fashion and apparel for all seasons",
    image: "/assets/img/categories/elegant-workwear.jpg",
    parentCategory: 1
  },
  {
    id: 3,
    name: "Evening Wear",
    slug: "evening-wear",
    description: "Latest Evening Wear",
    image: "/assets/img/categories/evening-wear.jpg",
    parentCategory: 1
  },
  {
    id: 7,
    name: "Bridal Wear",
    slug: "bridal-wear",
    description: "Latest Bridal Wear",
    image: "/assets/img/categories/bridal-wear.jpg",
    parentCategory: 1
  },
  {
    id: 4,
    name: "Mens",
    slug: "mens",
    description: "Latest Mens Fashion",
    parentCategory: 0,
    image: "https://images3.cmp.optimizely.com/assets/The+Apex+Slimline/09b3af8a661f11f0bc5a8e9d719a61b1"
  },
  {
    id: 5,
    name: "Suits",
    slug: "suits",
    description: "Fashion and apparel for all seasons",
    image: "/assets/img/categories/suits.jpg",
    parentCategory: 4
  },
  {
    id: 6,
    name: "Casual Wear",
    slug: "casual-wear",
    description: "Latest Casual Wear",
    image: "/assets/img/categories/casual-wear.jpg",
    parentCategory: 4
  },
  {
    id: 9,
    name: "Sale",
    slug: "sale",
    description: "Items on sale",
    image: "/assets/img/categories/sale.jpg",
    parentCategory: 0
  }
];

export const products: Product[] = [
  {
    id: 100,
    name: "The Sterling Grey Executive Suit",
    description: "Command attention with 'The Sterling Grey Executive Suit,' a masterpiece of modern tailoring designed for the discerning professional. Crafted from the finest Italian wool, its sleek silhouette and subtle grey hue exude understated power and sophisticated elegance. This suit is more than attire; it's a statement of ambition, a testament to impeccable taste, and a promise of unparalleled comfort, ensuring you move with confidence from the boardroom to exclusive evening events. Elevate your presence, define your success.",
    smallDescription: "Command attention with 'The Sterling Grey Executive Suit,' a masterpiece of modern tailoring. Crafted from the finest Italian wool, its sleek silhouette and subtle grey hue exude understated power and sophisticated elegance. More than attire, it's a statement of ambition and impeccable taste.",
    originalPrice: 2500.00,
    slug: "the-sterling-grey-executive-suit",
    price: 2500,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/Zz03OTA2MjM1MDY2MWUxMWYwYjk3MjJhOGEyNjk4MTA1YQ==",
    carouselImage: "https://images3.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/Zz03OTA2MjM1MDY2MWUxMWYwYjk3MjJhOGEyNjk4MTA1YQ==",
    heroImage: "https://images3.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/Zz03OTA2MjM1MDY2MWUxMWYwYjk3MjJhOGEyNjk4MTA1YQ==",
    productImages: [
      "https://images2.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/8e7aad46661e11f0ad657614976283e1",
      "https://images2.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/8e81dfa8661e11f0bc5a8e9d719a61b1",
      "https://images3.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/8e8907ec661e11f0ad657614976283e1",
      "https://images3.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/8e4cd4a2661e11f0bc5a8e9d719a61b1",
      "https://images1.cmp.optimizely.com/assets/The+Sterling+Grey+Executive+Suit/8e769f12661e11f0ad657614976283e1"
    ],
    category: [5],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 15 },
      { size: "38", quantity: 25 },
      { size: "40", quantity: 30 },
      { size: "42", quantity: 20 },
      { size: "44", quantity: 10 }
    ],
    featured: true
  },
  {
    id: 101,
    name: "The Apex Slimline Ensemble",
    description: "Introducing 'The Apex Slimline Ensemble,' a testament to precision tailoring and timeless design. This suit redefines modern elegance with its sharp, sculpted silhouette and classic lines that effortlessly enhance the wearer's form. Crafted from premium, breathable fabrics, it offers unparalleled comfort without compromising on its distinguished aesthetic. Perfect for the contemporary gentleman who demands sophistication and a commanding presence, 'The Apex Slimline Ensemble' is an investment in enduring style and unwavering confidence, designed to make every entrance unforgettable.",
    smallDescription: "The Apex Slimline Ensemble redefines modern elegance with its sharp, sculpted silhouette and classic lines. Crafted from premium, breathable fabrics, it offers unparalleled comfort and a distinguished aesthetic for the contemporary gentleman.",
    originalPrice: 2800.00,
    slug: "the-apex-slimline-ensemble",
    price: 2600.00,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Apex+Slimline/09b3af8a661f11f0bc5a8e9d719a61b1",
    carouselImage: "https://images3.cmp.optimizely.com/assets/The+Apex+Slimline/09edb234661f11f0bc5a8e9d719a61b1",
    heroImage: "https://images3.cmp.optimizely.com/assets/The+Apex+Slimline/09edb234661f11f0bc5a8e9d719a61b1",
    productImages: [
      "https://images3.cmp.optimizely.com/assets/The+Apex+Slimline/09edb234661f11f0bc5a8e9d719a61b1",
      "https://images2.cmp.optimizely.com/assets/The+Apex+Slimline/09aaa93a661f11f0ad657614976283e1",
      "https://images1.cmp.optimizely.com/assets/The+Apex+Slimline/098c23d4661f11f0ad657614976283e1",
      "https://images3.cmp.optimizely.com/assets/The+Apex+Slimline/09b58e40661f11f0ad657614976283e1",
      "https://images3.cmp.optimizely.com/assets/The+Apex+Slimline/09b5c81a661f11f0bc5a8e9d719a61b1"
    ],
    category: [5,9],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 12 },
      { size: "38", quantity: 18 },
      { size: "40", quantity: 25 },
      { size: "42", quantity: 22 },
      { size: "44", quantity: 15 },
      { size: "46", quantity: 8 }
    ],
    featured: false,
    recommended: true
  },
  {
    id: 102,
    name: "The Mocha Regent Suit",
    description: "Step into a realm of refined elegance with The Mocha Regent Suit, a masterpiece tailored for the discerning gentleman. Crafted from the finest Italian wool in a rich coffee mocha hue, this suit exudes understated luxury and sophisticated charm. Its impeccable cut and fluid drape promise a silhouette that commands attention, while the subtle texture of the fabric invites a closer look. Perfect for high-stakes meetings or exclusive evening events, The Mocha Regent Suit is more than attire; it's a statement of unparalleled taste and confident ambition. Elevate your presence and embody the essence of modern regality.",
    smallDescription: "A refined men's suit in a rich coffee mocha hue, crafted from fine Italian wool. Impeccable cut and fluid drape for a commanding silhouette. Perfect for high-stakes meetings or exclusive evening events, embodying unparalleled taste and confident ambition.",
    originalPrice: 2800.00,
    slug: "the-mocha-regent-suit",
    price: 2200.00,
    brand: 2,
    image: "https://images1.cmp.optimizely.com/assets/The+Mocha+Regent/Zz0xMWE2NTZhMDY2MjExMWYwOTY2MmM2NjUzZDE1YWQ2Yw==",
    carouselImage: "https://images1.cmp.optimizely.com/assets/The+Mocha+Regent/Zz0xMWE2NTZhMDY2MjExMWYwOTY2MmM2NjUzZDE1YWQ2Yw==",
    heroImage: "https://images1.cmp.optimizely.com/assets/The+Mocha+Regent/Zz0xMWE2NTZhMDY2MjExMWYwOTY2MmM2NjUzZDE1YWQ2Yw==",
    productImages: [
      "https://images1.cmp.optimizely.com/assets/The+Mocha+Regent/2567172e662111f0bc5a8e9d719a61b1",
    "https://images2.cmp.optimizely.com/assets/The+Mocha+Regent/25686cfa662111f0ad657614976283e1",
    "https://images2.cmp.optimizely.com/assets/The+Mocha+Regent/256eaf7a662111f0bc5a8e9d719a61b1",
    "https://images3.cmp.optimizely.com/assets/The+Mocha+Regent/256aea3e662111f0bc5a8e9d719a61b1",
    "https://images3.cmp.optimizely.com/assets/The+Mocha+Regent/257048bc662111f0ad657614976283e1"
    ],
    category: [5,9],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 8 },
      { size: "38", quantity: 14 },
      { size: "40", quantity: 20 },
      { size: "42", quantity: 18 },
      { size: "44", quantity: 12 },
      { size: "46", quantity: 6 }
    ],
    featured: true
},

{
    id: 201,
    name: "The Celestial Bride Gown",
    description: "Embark on your eternal journey adorned in The Celestial Bride Gown, a vision of ethereal beauty and timeless grace. This exquisite bridal masterpiece features a meticulously hand-beaded bodice, shimmering with an array of delicate beads and luminous gems that capture the light with every movement, echoing the sparkle of a starlit sky. From the cinched waist, a magnificent train cascades, flowing behind you like a dream, creating an aura of unparalleled majesty. Crafted from the finest silks and laces, this gown is a symphony of luxurious textures and intricate details, designed to make your momentous day truly unforgettable. The Celestial Bride Gown is more than just a dress; it is a promise of enchantment, a symbol of everlasting love, and a testament to the artistry of haute couture.",
    originalPrice: 25000.00,
    slug: "The-Celestial-Bride-Gown",
    price: 25000.00,
    brand: 2,
    image: "https://images4.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1lNWQ1NWE2ODYzYzIxMWYwYjlkZmI2MGZjY2M0YzRkYg==",
    carouselImage: "https://images4.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1lNWQ1NWE2ODYzYzIxMWYwYjlkZmI2MGZjY2M0YzRkYg==",
    heroImage: "https://images4.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1lNWQ1NWE2ODYzYzIxMWYwYjlkZmI2MGZjY2M0YzRkYg==",
    productImages: [
      "https://images3.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1lYjA3MjY5YzYzYzIxMWYwOTk3MTVlMGU5NTdlZDc3ZQ==",
      "https://images4.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1lY2Y1NTliYTYzYzIxMWYwOGUxNTBlYTBlMDAzOTRhZg==",
      "https://images1.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1mMzAxMGNkMjYzYzIxMWYwYThlZDdlYTA3MmQzNzM3OA==",
      "https://images4.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1mN2ZlYzk5MDYzYzIxMWYwYWFjMWRlN2RkYTcwN2I5Mw==",
      "https://images4.cmp.optimizely.com/assets/The+Celestial+Bridal+Gown/Zz1lNjcxYWZiYzYzYzIxMWYwYTY5ODBlYTBlMDAzOTRhZg=="
    ],
    category: [7],
    rating: 0,
    stockLevel: [
      { size: "XS", quantity: 5 },
      { size: "S", quantity: 12 },
      { size: "M", quantity: 15 },
      { size: "L", quantity: 8 },
      { size: "XL", quantity: 3 }
    ],
    featured: false,
    recommended: true
  },      

{
    id: 203,
    name: "The Ethereal Bloom Gown",
    description: "Step into a dream with The Ethereal Bloom Gown, a bridal masterpiece that whispers tales of delicate beauty and timeless romance. Crafted from the purest white fabrics, this gown is adorned with transparent flower patterns that gracefully unfurl across its entire design, creating an illusion of blossoms dancing on air. Each petal and vine is meticulously woven, allowing the gown to capture and reflect light with an enchanting subtlety. The silhouette is designed to flow effortlessly, embracing the figure with a gentle grace that is both regal and ethereal. The Ethereal Bloom Gown is more than just a dress; it is a poetic expression of love, a celebration of natural beauty, and a testament to the artistry of haute couture, ensuring your walk down the aisle is nothing short of magical.",
    originalPrice: 22000.00,
    slug: "The-Ethereal-Bloom-Gown",
    price: 22000.00,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1hZTg1MzA0YzYzYzIxMWYwOTUzYzU2YjFjNmFiYjBhZQ==",
    carouselImage: "https://images3.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1hZTg1MzA0YzYzYzIxMWYwOTUzYzU2YjFjNmFiYjBhZQ==",
    heroImage: "https://images3.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1hZTg1MzA0YzYzYzIxMWYwOTUzYzU2YjFjNmFiYjBhZQ==",
    productImages: [
      "https://images3.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1hZThmMmNlNjYzYzIxMWYwOThjNTU2YjFjNmFiYjBhZQ==",
      "https://images3.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1hZWY5MDE4ZTYzYzIxMWYwYjc4NzU2YjFjNmFiYjBhZQ==", 
      "https://images1.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1iYzRiZjJhNjYzYzIxMWYwYThlZDdlYTA3MmQzNzM3OA==",
      "https://images3.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1hZTkxNmY5YzYzYzIxMWYwYmExZjJhOGEyNjk4MTA1YQ==",
      "https://images4.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/Zz1jMDgwZGE4MDYzYzIxMWYwOWUxOWNhNTcyNzI3ZTIxYg=="
    ],
    category: [7],
    rating: 0,
    stockLevel: [
      { size: "XS", quantity: 8 },
      { size: "S", quantity: 15 },
      { size: "M", quantity: 20 },
      { size: "L", quantity: 12 },
      { size: "XL", quantity: 5 }
    ],
    featured: false,
    recommended: true
  },

  {
    id: 204,
    name: "The Avian Serenade Gown",
    description: "Embrace a symphony of nature and elegance with The Avian Serenade Gown, a bridal masterpiece that celebrates the delicate beauty of the natural world. This exquisite gown features a graceful silhouette adorned with intricate bird prints, subtly woven into the fabric, creating a unique and enchanting design. Each feathered motif is a testament to the gown's artisanal craftsmanship, adding a touch of whimsical charm and sophisticated allure. Crafted from luxurious, flowing fabrics, this gown drapes beautifully, ensuring every movement is as fluid and captivating as a bird in flight. The Avian Serenade Gown is more than just a dress; it is a harmonious blend of high fashion and natural artistry, perfect for the bride who dreams of a wedding as unique and beautiful as her love story.",
    originalPrice: 18500.00,
    slug: "The-Avian-Serenade-Gown",
    price: 18500.00,
    brand: 2,
    image: "https://images4.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz03ODY5NzcwYzYzYzIxMWYwYWFjMWRlN2RkYTcwN2I5Mw==",
    carouselImage: "https://images4.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz03ODY5NzcwYzYzYzIxMWYwYWFjMWRlN2RkYTcwN2I5Mw==",
    heroImage: "https://images4.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz03ODY5NzcwYzYzYzIxMWYwYWFjMWRlN2RkYTcwN2I5Mw==",
    productImages: [
      "https://images4.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz03YWExMDQzNjYzYzIxMWYwOTlkYTBlYTBlMDAzOTRhZg==",
    "https://images1.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz03ZGMyZmU2MjYzYzIxMWYwOGIxZTdlYTA3MmQzNzM3OA==",
    "https://images4.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz03ZjY4MDVlNjYzYzIxMWYwYTY5ODBlYTBlMDAzOTRhZg==",
    "https://images4.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz04M2ZjNjVlODYzYzIxMWYwYjlkZmI2MGZjY2M0YzRkYg==",
    "https://images4.cmp.optimizely.com/assets/The+Avian+Serenade+/Zz04YjEwZGU1NDYzYzIxMWYwYTg3MGI2MGZjY2M0YzRkYg=="
    ],
    category: [7],
    rating: 0,
    stockLevel: [
      { size: "XS", quantity: 10 },
      { size: "S", quantity: 18 },
      { size: "M", quantity: 25 },
      { size: "L", quantity: 15 },
      { size: "XL", quantity: 7 }
    ],
    featured: true,
    recommended: true
  },

  {
    id: 205,
    name: "The Savannah Siren Gown",
    description: "Unleash your inner wild elegance with The Savannah Siren Gown, a bridal masterpiece that redefines traditional beauty with a daring twist. This captivating gown features an exquisite tiger stripe meshing that gracefully adorns the entire garment, creating a mesmerizing interplay of texture and pattern. The intricate meshing, subtly integrated into the design, offers a unique blend of sophistication and untamed allure, ensuring you stand out with unparalleled confidence. Crafted with meticulous attention to detail and from the finest materials, this gown flows with a luxurious drape, accentuating your silhouette with every step. The Savannah Siren Gown is more than just a dress; it is a bold statement of individuality, a celebration of fierce beauty, and a testament to the innovative spirit of haute couture, perfect for the bride who dares to be unforgettable.",
    originalPrice: 28000.00,
    slug: "The-Savannah-Siren-Gown",
    price: 25000.00,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Savannah+Siren/Zz0yZWVmMzY3YTYzYzIxMWYwOTUzYzU2YjFjNmFiYjBhZQ==",
    carouselImage: "https://images3.cmp.optimizely.com/assets/The+Savannah+Siren/Zz0yZWVmMzY3YTYzYzIxMWYwOTUzYzU2YjFjNmFiYjBhZQ==",
    heroImage: "https://images3.cmp.optimizely.com/assets/The+Savannah+Siren/Zz0yZWVmMzY3YTYzYzIxMWYwOTUzYzU2YjFjNmFiYjBhZQ==",
    productImages: [
      "https://images1.cmp.optimizely.com/assets/The+Savannah+Siren/Zz0yZmJmOTczZTYzYzIxMWYwYThlZDdlYTA3MmQzNzM3OA==",
      "https://images3.cmp.optimizely.com/assets/The+Savannah+Siren/Zz0zNTM0ZDFiNjYzYzIxMWYwYmExZjJhOGEyNjk4MTA1YQ==",
      "https://images4.cmp.optimizely.com/assets/The+Savannah+Siren/Zz0zZjBhMmUzZTYzYzIxMWYwYWFjMWRlN2RkYTcwN2I5Mw==",
      "https://images4.cmp.optimizely.com/assets/The+Savannah+Siren/Zz0zZjZkYTcwYzYzYzIxMWYwYjlkZmI2MGZjY2M0YzRkYg==",
      "https://images4.cmp.optimizely.com/assets/The+Savannah+Siren/Zz00NjFlNzZlNDYzYzIxMWYwOWUxOWNhNTcyNzI3ZTIxYg=="
    ],
    category: [7,9],
    rating: 0,
    stockLevel: [
      { size: "XS", quantity: 6 },
      { size: "S", quantity: 10 },
      { size: "M", quantity: 14 },
      { size: "L", quantity: 9 },
      { size: "XL", quantity: 4 }
    ],
    featured: false
  },

    {
      id: 200101,
      name: "The Executive Aura Suit",
      description: "Embrace unparalleled sophistication and commanding presence with The Executive Aura Suit. Tailored for the modern woman who navigates the corporate landscape with grace and authority, this single-breasted masterpiece redefines professional elegance. Crafted from the finest fabrics, its sleek silhouette and impeccable cut ensure a powerful yet feminine statement. Perfect for boardroom meetings, high-stakes presentations, or any occasion where impact is paramount, The Executive Aura Suit is more than attire—it's an extension of your ambition and an embodiment of refined power. Experience the fusion of timeless design and contemporary flair, designed to inspire confidence and command respect.",
      smallDescription: "The Executive Aura Suit redefines professional elegance for the modern woman. This single-breasted masterpiece, crafted from the finest fabrics, offers a sleek silhouette and impeccable cut. Designed to inspire confidence and command respect, it's perfect for high-stakes professional settings, embodying refined power and timeless style.",
      originalPrice: 1850.00,
      slug: "the-executive-aura-suit",
      price: 1550.00,
      brand: 2,
      image: "https://images1.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MWM0ZjNlYzcyY2YxMWYwYTZkMGZlYTY0OTU0NGZmOA==",
      carouselImage: "https://images1.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MWM0ZjNlYzcyY2YxMWYwYTZkMGZlYTY0OTU0NGZmOA==",
      heroImage: "https://images1.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MWM0ZjNlYzcyY2YxMWYwYTZkMGZlYTY0OTU0NGZmOA==",
      productImages: [
        "https://images2.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MjI2MTU5NjcyY2YxMWYwOWUxYzZhMjE1NzUxOGEzMQ==",
        "https://images1.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MmU3OGZlNjcyY2YxMWYwYjE4OGZlYTY0OTU0NGZmOA==",
        "https://images4.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MThjZmVjNDcyY2YxMWYwOWVhYTcyMGI4Y2U1YzYyMw==",
        "https://images4.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MTc3ZTBhYzcyY2YxMWYwYTVkODcyMGI4Y2U1YzYyMw==", 
        "https://images3.cmp.optimizely.com/assets/The+Executive+Aura/Zz03MTY5YmI0ZTcyY2YxMWYwYTM4NTEyYThmZjIyYzcxYQ==", 
      ],
      category: [2,9],
      rating: 0,
      stockLevel: [
        { size: "XS", quantity: 12 },
        { size: "S", quantity: 20 },
        { size: "M", quantity: 25 },
        { size: "L", quantity: 18 },
        { size: "XL", quantity: 10 },
        { size: "XXL", quantity: 5 }
      ],
      featured: true
    },

  {
    id: 200102,
    name: "The Boss Ensemble",
    description: "Step into the spotlight with The Executive Ensemble, a meticulously crafted business dress paired with a matching jacket, designed for the discerning professional. This sophisticated duo embodies power and grace, offering a seamless transition from critical meetings to high-profile events. The dress, tailored for a flattering silhouette, provides comfort without compromising on style, while the coordinating jacket adds a layer of authority and polish. Made from premium, breathable fabrics, The Executive Ensemble ensures you look and feel your best throughout your demanding day. Elevate your professional wardrobe with this timeless and versatile statement of confidence and impeccable taste.",
    smallDescription: "The Executive Ensemble is a sophisticated business dress with a matching jacket, designed for the discerning professional. It offers a flattering silhouette and adds a layer of authority and polish, ensuring comfort and style for demanding days. Elevate your professional wardrobe with this timeless and versatile statement of confidence.",
    originalPrice: 1600.00,
    slug: "the-boss-ensemble",
    price: 1600.00,
    brand: 2,
    image: "https://images1.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZGY5OTAwYzcyY2YxMWYwOGMxYzUyNWFlZTU2ZTliNA==",
    carouselImage: "https://images1.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZGY5OTAwYzcyY2YxMWYwOGMxYzUyNWFlZTU2ZTliNA==",
    heroImage: "https://images1.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZGY5OTAwYzcyY2YxMWYwOGMxYzUyNWFlZTU2ZTliNA==",
    productImages: [
      "https://images1.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZTUxYmY5ODcyY2YxMWYwODY1NzUyNWFlZTU2ZTliNA==",
      "https://images3.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZmE1NmYwMjcyY2YxMWYwYTM4NTEyYThmZjIyYzcxYQ==",
      "https://images4.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZGE3YzE4YzcyY2YxMWYwODNjNzE2ZmQ4MjU3YTQ0Yg==",
      "https://images1.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZjUzNGQwODcyY2YxMWYwOGMxYzUyNWFlZTU2ZTliNA==",
      "https://images4.cmp.optimizely.com/assets/The+Boss+Ensemble/Zz0wZGE0NmI0YTcyY2YxMWYwOWVhYTcyMGI4Y2U1YzYyMw=="
    ],
    category: [2],
    rating: 0,
    stockLevel: [
      { size: "XS", quantity: 8 },
      { size: "S", quantity: 15 },
      { size: "M", quantity: 22 },
      { size: "L", quantity: 16 },
      { size: "XL", quantity: 12 },
      { size: "XXL", quantity: 7 }
    ],
    featured: false,
    recommended: true
  },    

  {
    id: 200103,
    name: "The Power Suit",
    description: "Command attention with The Modern Executive Skirt Suit, a sophisticated pairing of a professional long pencil skirt and a chic matching cropped jacket. This ensemble is meticulously designed for the contemporary woman who values both style and substance in her professional attire. The sleek lines of the pencil skirt offer a refined silhouette, while the cropped jacket adds a touch of modern flair, perfectly balancing tradition with trend. Crafted from luxurious, high-quality fabrics, this suit ensures comfort and confidence through long workdays and important engagements. Elevate your presence and embody effortless authority with this essential addition to your executive wardrobe.",
    smallDescription: "The Modern Executive Skirt Suit features a professional long pencil skirt and a chic matching cropped jacket. Designed for the contemporary woman, this ensemble balances tradition with trend, offering a refined silhouette and modern flair. Crafted from luxurious fabrics, it ensures comfort and confidence for professional engagements.",
    originalPrice: 1550.00,
    slug: "the-power-suit",
    price: 1550.00,
    brand: 2,
    image: "https://images1.cmp.optimizely.com/assets/The+Power+Suit/Zz0zYzZiNDMyMjcyY2YxMWYwODMzNjFlMzNhZWY3MTY5NA==",
    carouselImage: "https://images1.cmp.optimizely.com/assets/The+Power+Suit/Zz0zYzZiNDMyMjcyY2YxMWYwODMzNjFlMzNhZWY3MTY5NA==",
    heroImage: "https://images1.cmp.optimizely.com/assets/The+Power+Suit/Zz0zYzZiNDMyMjcyY2YxMWYwODMzNjFlMzNhZWY3MTY5NA==",
    productImages: [
      "https://images4.cmp.optimizely.com/assets/The+Power+Suit/Zz0zY2FiY2FhMDcyY2YxMWYwYTVkODcyMGI4Y2U1YzYyMw==",
      "https://images1.cmp.optimizely.com/assets/The+Power+Suit/Zz0zYzBiNmEzODcyY2YxMWYwODgwZjJhOWI0ZjIwMWYxYw==",
      "https://images4.cmp.optimizely.com/assets/The+Power+Suit/Zz0zYmY1NjFjMDcyY2YxMWYwOWVhYTcyMGI4Y2U1YzYyMw==",
      "https://images1.cmp.optimizely.com/assets/The+Power+Suit/Zz0zZGNkZWJmYzcyY2YxMWYwYTZkMGZlYTY0OTU0NGZmOA==",
      "https://images4.cmp.optimizely.com/assets/The+Power+Suit/Zz0zZGM1OGMwYTcyY2YxMWYwOTJhZWNhZjgxMDAzNTYyNw=="

    ],
    category: [2],
    rating: 0,
    stockLevel: [
      { size: "XS", quantity: 10 },
      { size: "S", quantity: 18 },
      { size: "M", quantity: 24 },
      { size: "L", quantity: 20 },
      { size: "XL", quantity: 14 },
      { size: "XXL", quantity: 8 }
    ],
    featured: true
  },
  {
    id: 200104,
    name: "The Floral Executive Suit",
    description: "Introducing The Floral Executive Suit, a sophisticated and subtly enchanting ensemble designed for the professional woman who desires to blend classic elegance with a touch of unique charm. This exquisite skirt suit features a perfectly tailored silhouette, complemented by a delicate floral twist—a subtle detail that adds personality and grace without compromising professionalism. Crafted from premium, breathable fabrics, it ensures comfort and a polished look throughout your busiest days. Ideal for business meetings, networking events, or any occasion where you want to make a memorable impression, The Floral Executive Suit is a testament to refined style and understated individuality.",
    smallDescription: "The Floral Executive Suit is a sophisticated skirt suit with a delicate floral twist, blending classic elegance with unique charm. Tailored from premium fabrics, it offers comfort and a polished look for professional settings, making a memorable impression with refined style and understated individuality.",
    originalPrice: 1700.00,
    slug: "the-floral-executive-suit",
    price: 1700.00,
    brand: 2,
    image: "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1kMGI2NTIwNjcyY2YxMWYwODMzNjFlMzNhZWY3MTY5NA==",
    carouselImage: "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1kMGI2NTIwNjcyY2YxMWYwODMzNjFlMzNhZWY3MTY5NA==",
    heroImage: "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1kMGI2NTIwNjcyY2YxMWYwODMzNjFlMzNhZWY3MTY5NA==",
    productImages: [
      "https://images3.cmp.optimizely.com/assets/The+Flower+Power/Zz1jZjY4ZWY5ZTcyY2YxMWYwYTM4NTEyYThmZjIyYzcxYQ==",
      "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1jZmZhZGMzODcyY2YxMWYwODY1NzUyNWFlZTU2ZTliNA==",
      "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1kMDMwNTRkMDcyY2YxMWYwYTZkMGZlYTY0OTU0NGZmOA==",
      "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1kMDExZDhiNjcyY2YxMWYwYTAzZjFlMzNhZWY3MTY5NA==",
      "https://images1.cmp.optimizely.com/assets/The+Flower+Power/Zz1jZWE3YWZiNDcyY2YxMWYwYTZkMGZlYTY0OTU0NGZmOA=="
    ],
    category: [2],
    rating: 0,
    stockLevel: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 22 },
      { size: "M", quantity: 28 },
      { size: "L", quantity: 19 },
      { size: "XL", quantity: 11 },
      { size: "XXL", quantity: 6 }
    ],
    featured: true
  },
  {
    id: 100600,
    name: "The Business Casual",
    description: "The Business Casual is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    smallDescription: "The Business Casual is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    originalPrice: 500.00,
    slug: "the-business-casual",
    price: 400,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Business+Casual/Zz1lZjVlZTA3NjgzMjExMWYwYTgzMjE2OTFjNTc2MjhkYQ==",
    carouselImage: "",
    heroImage: "",
    productImages: [
      "https://images4.cmp.optimizely.com/assets/The+Business+Casual/Zz1mNTFiYWFiMjgzMjExMWYwOThlYzcyNGQ2YmJhMThhZg==",
      "https://images3.cmp.optimizely.com/assets/The+Business+Casual/Zz1mN2UyMTQ4NDgzMjExMWYwYTk4YjE2OTFjNTc2MjhkYQ==",
      "https://images3.cmp.optimizely.com/assets/The+Business+Casual/Zz1mN2UyMWUwYzgzMjExMWYwYjMwNjllNmYyMDU0N2U4YQ==",
      "https://images3.cmp.optimizely.com/assets/The+Business+Casual/Zz1lZjkyZGIyZTgzMjExMWYwYTk4YjE2OTFjNTc2MjhkYQ==",
      "https://images1.cmp.optimizely.com/assets/The+Business+Casual/Zz1mMzYwZGE1ODgzMjExMWYwYjM1YzRhMGJhODQ3N2Q5MA=="
    ],
    category: [6,9],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 15 },
      { size: "38", quantity: 25 },
      { size: "40", quantity: 30 },
      { size: "42", quantity: 20 },
      { size: "44", quantity: 10 }
    ],
    featured: false
  },
  {
    id: 100601,
    name: "The Start Up Suit",
    description: "The Start Up Suit is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    smallDescription: "The Start Up Suit is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    originalPrice: 500.00,
    slug: "the-start-up-suit",
    price: 100,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jMjNiODRmYTgzMjExMWYwODM3YjllNmYyMDU0N2U4YQ==",
    carouselImage: "https://images3.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jMjNiODRmYTgzMjExMWYwODM3YjllNmYyMDU0N2U4YQ==",
    heroImage: "https://images3.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jMjNiODRmYTgzMjExMWYwODM3YjllNmYyMDU0N2U4YQ==",
    productImages: [
      "https://images3.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jM2U5YWM2NDgzMjExMWYwYWY4NjllNmYyMDU0N2U4YQ==",
      "https://images3.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jNTIzMGYxMjgzMjExMWYwYTgzMjE2OTFjNTc2MjhkYQ==",
      "https://images1.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jNzFmYjhiYTgzMjExMWYwOTkwZmQ2MjIwN2IyOWNlNA==",
      "https://images3.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jM2ZjYmYzZTgzMjExMWYwYmJmMzhlNTVlNWI0MTE5ZQ==",
      "https://images3.cmp.optimizely.com/assets/The+Start+Up+Suit/Zz1jNzNjYjhmYzgzMjExMWYwOGVlNzE2OTFjNTc2MjhkYQ=="
    ],
    category: [6,9],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 15 },
      { size: "38", quantity: 25 },
      { size: "40", quantity: 30 },
      { size: "42", quantity: 20 },
      { size: "44", quantity: 10 }
    ],
    featured: false
  },  
  {
    id: 100602,
    name: "The Everyday Ensemble",
    description: "The Everyday Ensemble is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    smallDescription: "The Everyday Ensemble is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    originalPrice: 500.00,
    slug: "the-everyday-ensemble",
    price: 200,
    brand: 2,
    image: "https://images1.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03NGZjMmViMDgzMjExMWYwOGY3OWQ2MjIwN2IyOWNlNA==",
    carouselImage: "https://images1.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03NGZjMmViMDgzMjExMWYwOGY3OWQ2MjIwN2IyOWNlNA==",
    heroImage: "https://images1.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03NGZjMmViMDgzMjExMWYwOGY3OWQ2MjIwN2IyOWNlNA==",
    productImages: [
      "https://images1.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03OTc5MmYzODgzMjExMWYwYjM1YzRhMGJhODQ3N2Q5MA==",
      "https://images3.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03NmEwY2FlNjgzMjExMWYwOGQwMThlNTVlNWI0MTE5ZQ==",
      "https://images1.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03OGJjNjdhZTgzMjExMWYwOWQxMjRhMGJhODQ3N2Q5MA==",
      "https://images3.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03OTYwZjUzMDgzMjExMWYwYjMwNjllNmYyMDU0N2U4YQ==",
      "https://images1.cmp.optimizely.com/assets/The+Everyday+Ensemble/Zz03NGZmMTY3YTgzMjExMWYwOWQxMjRhMGJhODQ3N2Q5MA=="
     ],
    category: [6,9],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 15 },
      { size: "38", quantity: 25 },
      { size: "40", quantity: 30 },
      { size: "42", quantity: 20 },
      { size: "44", quantity: 10 }
    ],
    featured: false
  },  {
    id: 100603,
    name: "The Jean Collection",
    description: "The Jean Collection is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    smallDescription: "The Jean Collection is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    originalPrice: 500.00,
    slug: "the-jean-collection",
    price: 300,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yNzBhNWNjYzgzMjExMWYwYWY4NjllNmYyMDU0N2U4YQ==",
    carouselImage: "https://images3.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yNzBhNWNjYzgzMjExMWYwYWY4NjllNmYyMDU0N2U4YQ==",
    heroImage: "https://images3.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yNzBhNWNjYzgzMjExMWYwYWY4NjllNmYyMDU0N2U4YQ==",
    productImages: [
      "https://images3.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yNDQyOGYwYTgzMjExMWYwODM3YjllNmYyMDU0N2U4YQ==",
      "https://images4.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yNmQxZmFlZTgzMjExMWYwYjU2NjcyNGQ2YmJhMThhZg==",
      "https://images3.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yNTk5YzJkODgzMjExMWYwYjMwNjllNmYyMDU0N2U4YQ==",
      "https://images3.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yMmZlZWFlNDgzMjExMWYwYTk4YjE2OTFjNTc2MjhkYQ==",
      "https://images1.cmp.optimizely.com/assets/The+Jean+Collection/Zz0yODgzMjk0ZTgzMjExMWYwOGY3OWQ2MjIwN2IyOWNlNA=="
     ],
    category: [6,9],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 15 },
      { size: "38", quantity: 25 },
      { size: "40", quantity: 30 },
      { size: "42", quantity: 20 },
      { size: "44", quantity: 10 }
    ],
    featured: false
  },  {
    id: 100604,
    name: "The Timepiece Collection",
    description: "The Timepiece Collection is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    smallDescription: "The Timepiece Collection is a sophisticated and versatile ensemble designed for the modern professional. This tailored suit combines a classic blazer with a relaxed trouser, offering a perfect balance of comfort and style. Crafted from premium fabrics, it ensures both comfort and a polished appearance, making it ideal for both professional and casual settings. The tailored design and premium materials make it a must-have for any professional wardrobe.",
    originalPrice: 500.00,
    slug: "the-timepiece-collection",
    price: 500,
    brand: 2,
    image: "https://images3.cmp.optimizely.com/assets/The+Time+Collection/Zz1hZWZlNWUwZTgzMjAxMWYwYTgzMjE2OTFjNTc2MjhkYQ==",
    carouselImage: "https://images3.cmp.optimizely.com/assets/The+Time+Collection/Zz1hZWZlNWUwZTgzMjAxMWYwYTgzMjE2OTFjNTc2MjhkYQ==",
    heroImage: "https://images3.cmp.optimizely.com/assets/The+Time+Collection/Zz1hZWZlNWUwZTgzMjAxMWYwYTgzMjE2OTFjNTc2MjhkYQ==",
    productImages: [
      "https://images3.cmp.optimizely.com/assets/The+Time+Collection/Zz1iMTE4ZjA1YTgzMjAxMWYwOTkwNTZlZmM5YzE0OTI0ZQ==",
      "https://images1.cmp.optimizely.com/assets/The+Time+Collection/Zz1iMjI0MzAzNjgzMjAxMWYwOGY3OWQ2MjIwN2IyOWNlNA==",
      "https://images3.cmp.optimizely.com/assets/The+Time+Collection/Zz1hZTkxZGIwODgzMjAxMWYwOTkwNTZlZmM5YzE0OTI0ZQ==",
      "https://images1.cmp.optimizely.com/assets/The+Time+Collection/Zz1iMTQ2ZTk2YTgzMjAxMWYwYTQ2YzRhMGJhODQ3N2Q5MA==",
      "https://images1.cmp.optimizely.com/assets/The+Time+Collection/Zz1iMWU5NTYzYzgzMjAxMWYwYjM1YzRhMGJhODQ3N2Q5MA=="
     ],
    category: [6],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 15 },
      { size: "38", quantity: 25 },
      { size: "40", quantity: 30 },
      { size: "42", quantity: 20 },
      { size: "44", quantity: 10 }
    ],
    featured: false
  }/*,  
  {
    id: 100601,
    name: "The ",
    description: "",
    smallDescription: "",
    originalPrice: 500.00,
    slug: "",
    price: 2500,
    brand: 2,
    image: "",
    carouselImage: "",
    heroImage: "",
    productImages: [
      "",
     ],
    category: [6],
    rating: 0,
    stockLevel: [
      { size: "36", quantity: 15 },
      { size: "38", quantity: 25 },
      { size: "40", quantity: 30 },
      { size: "42", quantity: 20 },
      { size: "44", quantity: 10 }
    ],
    featured: false
  },*/
  
  /*{
    id: 206,
    name: "The Chronos Executive Suit",
    description: "Step into a realm where classic sophistication meets visionary innovation with The Chronos Executive Suit. This meticulously tailored men's business suit is reimagined with a distinctive steampunk twist, blending the timeless elegance of traditional formal wear with the intricate charm of Victorian-era industrial design. Featuring subtle brass accents, intricate gear-inspired stitching, and perhaps a hint of rich, distressed leather, this suit is a testament to the discerning gentleman who appreciates both heritage and ingenuity. The fabric, a luxurious blend of wool and fine synthetics, ensures both comfort and a commanding presence. The Chronos Executive Suit is more than just attire; it's a statement of intellectual curiosity and refined taste, perfect for the modern visionary who navigates the complexities of business with an air of adventurous distinction.",
    originalPrice: 8500.00,
    slug: "The-Chronos-Executive-Suit",
    price: 8500.00,
    brand: 2,
    image: "",
    carouselImage: "",
    heroImage: "",
    productImages: [""],
    category: [2],
    rating: 0,
    stockLevel: 100,
    featured: false
  },

  {
    id: 207,
    name: "The Gearsmith Ensemble",
    description: "Unleash your inner inventor with The Gearsmith Ensemble, a casual yet sophisticated pairing that seamlessly blends comfort with the intricate artistry of steampunk design. This unique set features a relaxed-fit shirt and tailored trousers, both adorned with captivating prints of vintage cogs, clockwork mechanisms, and subtle gears, creating a narrative of mechanical marvel and timeless innovation. Crafted from breathable, high-quality fabrics, this ensemble ensures effortless style and comfort for any casual outing or creative endeavor. The detailed designs are thoughtfully integrated, offering a distinctive aesthetic that is both eye-catching and refined. The Gearsmith Ensemble is more than just clothing; it's a wearable work of art, perfect for the individual who appreciates the beauty of intricate design and the spirit of imaginative exploration.",
    originalPrice: 3200.00,
    slug: "The-Gearsmith-Ensemble",
    price: 3200.00,
    brand: 2,
    image: "",
    carouselImage: "",
    heroImage: "",
    productImages: [""],
    category: [2],
    rating: 0,
    stockLevel: 100,
    featured: false
  },

  {
    id: 208,
    name: "The Koi Regent Suit",
    description: "Dive into a world of sophisticated artistry with The Koi Regent Suit, a striking black suit elevated by vibrant, colourful carp fish designs. This exquisite garment is a testament to bold elegance, where traditional tailoring meets the dynamic beauty of nature. The meticulously integrated carp motifs, rendered in a spectrum of rich hues, flow gracefully across the fabric, creating a captivating visual narrative. Crafted from premium, luxurious materials, this suit offers an impeccable fit and a distinguished silhouette, ensuring you command attention with every stride. The Koi Regent Suit is more than just formal wear; it is a wearable canvas, a symbol of prosperity and perseverance, perfect for the modern gentleman who dares to express his unique style and appreciation for profound beauty.",
    originalPrice: 9500.00,
    slug: "The-Koi-Regent-Suit",
    price: 9500.00,
    brand: 2,
    image: "",
    carouselImage: "",
    heroImage: "",
    productImages: [""],
    category: [2],
    rating: 0,
    stockLevel: 100,
    featured: false
  },

  {
    id: 209,
    name: "The Enigma Vestment",
    description: "Dare to defy convention with The Enigma Vestment, a groundbreaking men's suit that redefines modern tailoring with an audacious edge. This armless masterpiece features a striking barbed wire design meticulously integrated across the garment, symbolizing strength, resilience, and an unbreakable spirit. Crafted from the finest, supple fabrics, the suit offers a sleek, commanding silhouette that accentuates the wearer's form while providing unparalleled comfort. The intricate barbed wire motif, rendered with subtle artistry, adds a layer of intriguing complexity and rebellious elegance, making this suit a true statement piece. The Enigma Vestment is more than just attire; it's an emblem of individuality, a fusion of high fashion and defiant self-expression, perfect for the man who walks his own path and leaves an unforgettable impression.",
    originalPrice: 7800.00,
    slug: "The-Enigma-Vestment",
    price: 7800.00,
    brand: 2,
    image: "",
    carouselImage: "",
    heroImage: "",
    productImages: [""],
    category: [2],
    rating: 0,
    stockLevel: 100,
    featured: false
  }*/
];