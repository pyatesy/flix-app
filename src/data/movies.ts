import { Movie, Genre, Actor } from '../types/movie';

export const genres: Genre[] = [
  {
    id: 1,
    name: "Action",
    description: "High-energy films with physical stunts and chases",
    icon: "fa-fire",
    color: "#0000",
    slug: "action",
    image: "https://images2.cmp.optimizely.com/baf9ffe84b8411f0ad4356c72d9e92b7"
  },
  {
    id: 2,
    name: "Horror",
    description: "Films designed to frighten and invoke fear",
    icon: "fa-ghost",
    color: "#000000",
    slug: "horror",
    image: "https://images1.cmp.optimizely.com/bb0c862c4b8411f0ad4356c72d9e92b7"
  }
  ,
  {
    id: 3,
    name: "Kids",
    description: "For the little ones",
    icon: "fa-child",
    color: "#000000",
    slug: "kids",
    image: "/assets/img/genres/kids.jpg"
  },
  {
    id: 4,
    name: "Adventure",
    description: "Films designed to get the adrenaline pumping",
    icon: "fa-compass",
    color: "#000000",
    slug: "adventure",
    image: "/assets/img/genres/adventure.jpg"
  },
  {
    id: 5,
    name: "Comedy",
    description: "Films designed to give you a good laugh",
    icon: "fa-laugh",
    color: "#000000",
    slug: "comedy",
    image: "https://images2.cmp.optimizely.com/8c4af4184b8411f0ad4356c72d9e92b7"
  },
    {
    id: 6,
    name: "Drama",
    description: "Films designed to make you feel something",
    icon: "fa-heart",
    color: "#000000",
    slug: "drama",
    image: "/assets/img/genres/drama.jpg"
  },
  {
    id: 7,
    name: "Sci-Fi",
    description: "Films designed to take you to a different world",
    icon: "fa-rocket",
    color: "#000000",
    slug: "sci-fi",
    image: "/assets/img/genres/sci-fi.jpg"
  },
  {
    id: 8,
    name: "Fantasy",
    description: "Films designed to take you to a different world",
    icon: "fa-magic",
    color: "#000000",
    slug: "fantasy",
    image: "/assets/img/genres/fantasy.jpg"
  },
  {
    id: 9,
    name: "Thriller",
    description: "Films designed to keep you on the edge of your seat",
    icon: "fa-bolt",
    color: "#000000",
    slug: "thriller",
    image: "/assets/img/genres/thriller.jpg"
  } 
  // ... more genres
]; 

export const actors: Actor[] = [
  {
    id: 1,
    name: "Benicio del Toro",
    image: "https://images4.cmp.optimizely.com/assets/benicio-del-toro-movies-and-films-and-filmography-u5.jpeg/9b9a8376486311f0bfef7e047c4dafe3"
  },
  {
    id: 2,
    name: "Mia Threapleton",
    image: "https://images3.cmp.optimizely.com/assets/Mia.jpg/9b7fe750486311f0bfef7e047c4dafe3"
  }
];



export const movieDatabase: Movie[] = [
  {
    id: 9,
    title: "The Phoenician Scheme",
    slug: "the-phoenician-scheme",
    image: "https://images1.cmp.optimizely.com/assets/TheScheme.webp/11a53a7445e511f0ab751a4a9907814d",
    largeImage: "https://images1.cmp.optimizely.com/assets/TheScheme.webp/11a53a7445e511f0ab751a4a9907814d",
    duration: "1h 55m",
    quality: "4K",
    genres: [2],
    rating: "3",
    year: "2023",
    number: "07",
    recentlyViewed: new Date(2025, 6, 10),
    director: ["John Doe"],
    production: ["John Doe"],
    linkToVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: [1,2],
    language: ["English", "French"],
    description: "The Phoenician Scheme is a movie about a Phoenician scheme."
  },
  {
    id: 6,
    title: "Karate Kid Legends",
    slug: "karate-kid-legends",
    image: "https://images1.cmp.optimizely.com/assets/KarateKid.jpg/12b8a6b245e511f0ab751a4a9907814d",
    duration: "2h 30m",
    quality: "HD",
    genres: [1,4],
    featured: true,
    rating: "4.5",
    year: "2023",
    number: "10",
    recentlyViewed: new Date(2025, 5, 3),
    director: ["John Doe"],
    production: ["John Doe"],
    linkToVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: [1,2],
    language: ["English", "French"],
    description: "The Karate Kid Legends is a movie about a Karate Kid Legends."
  
  },
  {
    id: 2,
    title: "Thunderbolts",
    slug: "thunderbolts",
    image: "https://images1.cmp.optimizely.com/assets/thunderbolts.jpg/1124c3e445e511f0ab751a4a9907814d",
    largeImage: "https://images1.cmp.optimizely.com/assets/thunderbolts2.jpg/Zz0wMWEwYmFjMjQ1ZTUxMWYwODA0YzhlY2RhNGRhMGY0NA==",
    duration: "1h 45m",
    quality: "4K",
    genres: [1,4],
    rating: "4.2",
    year: "2023",
    number: "04",
    trending: true,
    recentlyViewed: new Date(2025, 4, 2),
    featured: true,
    director: ["John Doe"],
    production: ["John Doe"],
    linkToVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: [1,2],
    language: ["English", "French"],
    description: "The Thunderbolts is a movie about a Thunderbolts."
  
  },
  {
    id: 3,
    title: "Mission: Impossible - Final Reckoning",
    slug: "mission-impossible-final-reckoning",
    image: "https://images4.cmp.optimizely.com/assets/mission2.jpg/1157bc6845e511f0bfef7e047c4dafe3",
    duration: "2h 15m",
    quality: "HD",
    genres: [1,4],
    rating: "4.8",
    year: "2023",
    number: "03",
    recentlyViewed: new Date(2025, 6, 3),
    featured: true,
    director: ["John Doe"],
    production: ["John Doe"],
    linkToVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: [1,2],
    language: ["English", "French"],
    description: "The Mission: Impossible - Final Reckoning is a movie about a Mission: Impossible - Final Reckoning."
  },
  {
    id: 1,
    title: "Sinners",
    slug: "sinners",
    image: "https://images4.cmp.optimizely.com/assets/sinners.jpg/13ec67f845e511f0ab751a4a9907814d",
    duration: "2h 30m",
    quality: "HD",
    genres: [1],
    rating: "4.5",
    featured: true,
    year: "2023",
    number: "05",
    recentlyViewed: new Date(2025, 6, 3),
    director: ["John Doe"],
    production: ["John Doe"],
    linkToVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: [1,2],
    language: ["English", "French"],
    description: "The Sinners is a movie about a Sinners."
  },
  {
    id: 4,
    title: "Lilo & Stitch",
    slug: "lilo-stitch",
    image: "https://images1.cmp.optimizely.com/assets/lio%26sticc22.jpg/12bc8f6645e511f0bfef7e047c4dafe3",
    duration: "1h 55m",
    quality: "4K",
    genres: [3],
    rating: "3",
    year: "2025",
    number: "02",
    featured: true,
    recentlyViewed: new Date(2025, 6, 3),
    director: ["John Doe"],
    production: ["John Doe"],
    linkToVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: [1,2],
    language: ["English", "French"],
    description: "The Lilo & Stitch is a movie about a Lilo & Stitch."
  },
  {
    id: 5,
    title: "Ballerina",
    slug: "ballerina",
    image: "https://images1.cmp.optimizely.com/assets/ballerina01.jpg/153988c045e511f0bfef7e047c4dafe3",
    duration: "1h 55m",
    quality: "4K",
    genres: [1,4],
    rating: "5",
    year: "2025",
    number: "01",
    recentlyViewed: new Date(2025, 6, 3),
    featured: true,
    director: ["John Doe"],
    production: ["John Doe"],
    linkToVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: [1,2],
    language: ["English", "French"],
    description: "The Ballerina is a movie about a Ballerina."
  },
  {
    id: 7,
    title: "Final Destination: Bloodline",
    slug: "final-destination-bloodline",
    image: "https://images1.cmp.optimizely.com/assets/Final-Destination-Bloodlines-1.jpg/12af896a45e511f0bfef7e047c4dafe3",
    largeImage: "https://images1.cmp.optimizely.com/assets/Final-Destination-Bloodlines-1.jpg/12af896a45e511f0bfef7e047c4dafe3",
    duration: "1h 45m",
    quality: "4K",
    trending: true,
    genres: [2],
    featured: true,
    rating: "4.2",
    year: "2023",
    number: "09"
  },
  {
    id: 8,
    title: "Bring Her Back",
    slug: "bring-her-back",
    image: "https://images4.cmp.optimizely.com/assets/BringHerBack-Poster2-Header.jpg/1512c10445e511f0bfef7e047c4dafe3",
    duration: "2h 15m",
    quality: "HD",
    genres: [2],
    rating: "4.8",
    year: "2023",
    number: "08"
  },
  {
    id: 10,
    title: "Dan Da Dan: Evil Eye",
    slug: "dan-da-dan-evil-eye",
    image: "https://images4.cmp.optimizely.com/assets/danda.webp/12cc540045e511f0bfef7e047c4dafe3",
    duration: "1h 55m",
    quality: "4K",
    genres: [2],
    rating: "4.3",
    year: "2023",
    number: "06"
  }
];
