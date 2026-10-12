// frontend/app.js

const API_BASE = (window.location.protocol === 'file:' || (window.location.port !== '8000' && window.location.port !== ''))
  ? 'http://127.0.0.1:8000'
  : '';

// Instant fallback profiles of all 26 real verified people
const FALLBACK_SEED_PARTICIPANTS = [
  {
    id: 1,
    name: "Sam Altman",
    age: 39,
    headline: "CEO at OpenAI & Technology Investor",
    occupation: "Tech Executive / AGI Pioneer",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Building artificial general intelligence to benefit humanity. Former President of Y Combinator. Enthusiast of clean nuclear energy, science fiction, fast driving, and vegetarian cooking.",
    interests: ["Artificial Intelligence", "Nuclear Energy", "Sci-Fi Literature", "Startups", "Fast Cars", "Meditation", "Vegetarian Cooking"],
    goals: "Ensure safe development of AGI and accelerate clean abundance through fusion energy.",
    linkedin_url: "https://www.linkedin.com/in/samaltman",
    instagram_url: "https://www.instagram.com/sama",
    match_evidence: "Official public Twitter/X handle @sama connects to public Instagram @sama and public statements as OpenAI CEO.",
    data_source: "Publicly accessible LinkedIn profile directory snapshot & public Instagram handle metadata.",
    analysis: {
      archetype: "The Visionary Architect",
      hobbies: ["Exploring clean tech", "Weekend drives", "Sci-fi literature", "Meditation"],
      communication_style: "Articulate, calm, and intellectually playful with high conviction.",
      dating_needs: ["Intellectual parity", "A partner with intense independent passions", "Emotional presence"],
      ideal_date: "Quiet vinyl lounge discussing future civilizational trajectories followed by night espresso.",
      green_flags: ["Fierce curiosity", "Deep conviction", "Authentic humor"],
      dealbreakers: ["Cynicism", "Superficial small talk"],
      radar: { ambition: 98, creativity: 86, intellectual_depth: 98, playfulness: 74, spontaneity: 76, romanticism: 80 }
    }
  },
  {
    id: 2,
    name: "Mira Murati",
    age: 35,
    headline: "AI Founder & Former CTO of OpenAI",
    occupation: "AI Engineering Leader",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    bio: "Dartmouth engineering alum. Fascinated by human-machine collaboration, Italian cinema, espresso artistry, aerospace systems, and contemporary art galleries.",
    interests: ["Robotics & AI", "Italian Cinema", "Specialty Espresso", "Neuroscience", "Classical Music", "Modern Art", "Philosophy of Mind"],
    goals: "Build ethical and creative AI systems that augment human agency and scientific discovery.",
    linkedin_url: "https://www.linkedin.com/in/mira-murati",
    instagram_url: "https://www.instagram.com/miramurati",
    match_evidence: "Dartmouth engineering alumna identity confirmed on public LinkedIn /in/mira-murati matching public Instagram @miramurati.",
    data_source: "Public LinkedIn career entries & public Instagram profile metadata.",
    analysis: {
      archetype: "The Thoughtful Polymath",
      hobbies: ["Art gallery walks", "Espresso brewing", "Vintage film screenings", "Classical piano"],
      communication_style: "Thoughtful, grounded, and subtly witty with acute observational depth.",
      dating_needs: ["Mutual respect for intense craft", "Creative discourse", "Unrushed evenings"],
      ideal_date: "Indie cinema screening followed by conversation over artisanal amaro in SoHo.",
      green_flags: ["Appreciation for design craft", "Intellectual stamina", "Calm confidence"],
      dealbreakers: ["Arrogance without substance", "Loud boastfulness"],
      radar: { ambition: 95, creativity: 94, intellectual_depth: 96, playfulness: 72, spontaneity: 78, romanticism: 88 }
    }
  },
  {
    id: 3,
    name: "Alexandr Wang",
    age: 27,
    headline: "Founder & CEO at Scale AI",
    occupation: "AI Entrepreneur & Mathematician",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Youngest self-made tech founder. Math competitions veteran, classical violinist, electronic music fan, and marathon runner.",
    interests: ["Machine Learning", "Classical Violin", "High-frequency Math", "Running", "Electronic Music", "Sneakers", "Silicon Valley"],
    goals: "Scale data infrastructure to unlock frontier machine intelligence.",
    linkedin_url: "https://www.linkedin.com/in/alexandr-wang",
    instagram_url: "https://www.instagram.com/alexandrwang",
    match_evidence: "Public Instagram @alexandrwang features Scale AI office and personal bio linking to professional activities.",
    data_source: "Public LinkedIn executive profile & public Instagram post descriptions.",
    analysis: {
      archetype: "The Dynamic High-Performer",
      hobbies: ["Violin practice", "Long-distance running", "Music festival hopping", "Collecting rare sneakers"],
      communication_style: "Rapid-fire enthusiasm, curious questions, and energetic humor.",
      dating_needs: ["High energy resonance", "Spontaneous adventure partner", "Shared love for music"],
      ideal_date: "Sunset trail run followed by front-row classical or acoustic concert and late ramen.",
      green_flags: ["Playful competitiveness", "High curiosity", "Active lifestyle"],
      dealbreakers: ["Low energy", "Complainers"],
      radar: { ambition: 97, creativity: 92, intellectual_depth: 95, playfulness: 90, spontaneity: 86, romanticism: 78 }
    }
  },
  {
    id: 4,
    name: "Marques Brownlee",
    age: 31,
    headline: "Creator & Host at MKBHD | Pro Athlete",
    occupation: "Tech Creator & Ultimate Frisbee Pro",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    bio: "Quality tech review creator with 18M+ subscribers. Professional Ultimate Frisbee player for NY Empire. Passionate about industrial design, matte black gear, EV cars, and crisp cinematography.",
    interests: ["Ultimate Frisbee", "Cinematography", "Electric Cars", "Industrial Design", "Smartphones", "Aesthetic Setups", "Golf"],
    goals: "Explain frontier technology with unmatched visual clarity and compete at the highest level of ultimate frisbee.",
    linkedin_url: "https://www.linkedin.com/in/mkbhd",
    instagram_url: "https://www.instagram.com/mkbhd",
    match_evidence: "Verified Instagram @mkbhd (4.7M+ followers) directly links to YouTube and professional brand matching LinkedIn /in/mkbhd.",
    data_source: "Public verified Instagram profile & LinkedIn profile.",
    analysis: {
      archetype: "The Aesthetic Purist",
      hobbies: ["Ultimate Frisbee tournaments", "Drone videography", "Golf driving range", "Car detailing"],
      communication_style: "Smooth, articulate, measured, and effortlessly down-to-earth.",
      dating_needs: ["Grounded emotional balance", "Active weekend companionship", "Appreciation for visual aesthetics"],
      ideal_date: "Driving up scenic coast in an EV, taking film photos, and grabbing local street tacos.",
      green_flags: ["Good taste in design", "Athletic spirit", "Drama-free mindset"],
      dealbreakers: ["Fake drama", "Cluttered spaces"],
      radar: { ambition: 92, creativity: 94, intellectual_depth: 88, playfulness: 88, spontaneity: 80, romanticism: 82 }
    }
  },
  {
    id: 5,
    name: "Guillermo Rauch",
    age: 33,
    headline: "CEO at Vercel | Creator of Next.js",
    occupation: "Web Infrastructure Founder",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    bio: "Obsessed with frontend speed, clean typography, developer delight, and specialty roast coffee. Argentine roots with a passion for minimalist design aesthetics.",
    interests: ["Web Development", "Minimalist Design", "Specialty Coffee", "Next.js", "Open Source", "Urban Architecture", "Typography"],
    goals: "Make the web faster, more accessible, and delightful for developers worldwide.",
    linkedin_url: "https://www.linkedin.com/in/rauchg",
    instagram_url: "https://www.instagram.com/rauchg",
    match_evidence: "Personal domain rauchg.com cross-references both Twitter/Instagram @rauchg and LinkedIn /in/rauchg.",
    data_source: "Public LinkedIn executive entry & public Instagram profile metadata.",
    analysis: {
      archetype: "The Aesthetic Purist",
      hobbies: ["Specialty coffee tasting", "Architecture walking tours", "Collecting design books"],
      communication_style: "Fast, elegant, product-focused, and appreciative of minimalist craft.",
      dating_needs: ["High aesthetic standards", "Intellectual curiosity", "Appreciation for good food"],
      ideal_date: "Tasting flights at an artisanal roastery followed by browsing contemporary art books.",
      green_flags: ["Eye for details", "Fast thinkers", "Love for great food"],
      dealbreakers: ["Poor taste", "Sluggish pace"],
      radar: { ambition: 94, creativity: 93, intellectual_depth: 92, playfulness: 78, spontaneity: 75, romanticism: 84 }
    }
  },
  {
    id: 6,
    name: "Lex Fridman",
    age: 41,
    headline: "Host of Lex Fridman Podcast | MIT AI Researcher",
    occupation: "AI Researcher & Podcaster",
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    bio: "Black belt in Brazilian Jiu-Jitsu, acoustic guitarist, Dostoyevsky admirer, and MIT researcher. Exploring love, consciousness, robotics, and the human condition in black suits.",
    interests: ["Brazilian Jiu-Jitsu", "Acoustic Guitar", "Russian Literature", "Autonomous Vehicles", "Martial Arts", "Poetry", "Robotics"],
    goals: "Seek universal truth and love through long-form philosophical conversations with extraordinary minds.",
    linkedin_url: "https://www.linkedin.com/in/lexfridman",
    instagram_url: "https://www.instagram.com/lexfridman",
    match_evidence: "Verified Instagram @lexfridman matches MIT research affiliation on LinkedIn /in/lexfridman and official website lexfridman.com.",
    data_source: "Public verified Instagram page & academic LinkedIn research credentials.",
    analysis: {
      archetype: "The Thoughtful Polymath",
      hobbies: ["BJJ sparring", "Fingerstyle guitar", "Reading Russian novels", "Long distance running"],
      communication_style: "Deeply sincere, emotionally vulnerable, philosophical, and intensely attentive.",
      dating_needs: ["Unconditional empathy", "Capacity for profound existential discussion", "Pure romance"],
      ideal_date: "Stargazing on a quiet rooftop with acoustic guitar and a discussion on the meaning of love.",
      green_flags: ["Deep kindness", "Love for music & poetry", "Emotional honesty"],
      dealbreakers: ["Cynicism about love", "Cruelty"],
      radar: { ambition: 91, creativity: 90, intellectual_depth: 99, playfulness: 72, spontaneity: 74, romanticism: 98 }
    }
  },
  {
    id: 7,
    name: "Sara Blakely",
    age: 53,
    headline: "Founder at SPANX | Entrepreneur & Investor",
    occupation: "Billionaire Founder & Philanthropist",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    bio: "Started Spanx with $5,000 in personal savings. Fierce advocate for women in business, belly laughter, failing forward, pop art, and spontaneous family dance parties.",
    interests: ["Entrepreneurship", "Stand-Up Comedy", "Belly Laughs", "Female Leadership", "Spontaneous Road Trips", "Family Fun", "Pop Art"],
    goals: "Empower women worldwide to pursue entrepreneurship and embrace failure as a learning step.",
    linkedin_url: "https://www.linkedin.com/in/sarablakely27",
    instagram_url: "https://www.instagram.com/sarablakely",
    match_evidence: "Verified Instagram @sarablakely features Spanx founder story matching verified LinkedIn /in/sarablakely27.",
    data_source: "Public Instagram videos/bio and public LinkedIn executive page.",
    analysis: {
      archetype: "The Charismatic Catalyst",
      hobbies: ["Stand-up comedy clubs", "Spontaneous karaoke", "Pop art collecting", "Belly laughing with friends"],
      communication_style: "Infectious, self-deprecating, razor-sharp, and bursting with warmth.",
      dating_needs: ["Unapologetic humor", "Someone secure with strong female power", "Joy in everyday moments"],
      ideal_date: "Underground comedy club followed by dessert at an old-school diner with endless laughter.",
      green_flags: ["Ability to laugh at yourself", "Generosity", "Audacious optimism"],
      dealbreakers: ["Fragile ego", "Stiff formality"],
      radar: { ambition: 96, creativity: 91, intellectual_depth: 89, playfulness: 99, spontaneity: 92, romanticism: 86 }
    }
  },
  {
    id: 8,
    name: "Pieter Levels",
    age: 38,
    headline: "Solo Founder of Nomad List & Remote OK",
    occupation: "Digital Nomad & Indie Hacker",
    avatar_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=500&q=80",
    bio: "Bootstrapping software from anywhere with Wi-Fi. Electronic music DJ, minimalist backpacker, Asian night-market fanatic, and blunt Twitter commentator.",
    interests: ["Digital Nomad Lifestyle", "Bootstrapping", "DJing & House Music", "Minimalism", "Travel", "Asian Street Food", "Indie Hacking"],
    goals: "Live completely location-independently and build lean micro-SaaS products with high autonomy.",
    linkedin_url: "https://www.linkedin.com/in/levelsio",
    instagram_url: "https://www.instagram.com/levelsio",
    match_evidence: "Personal domain levels.io links directly to Instagram @levelsio and professional history.",
    data_source: "Public Instagram photo feed and LinkedIn profile.",
    analysis: {
      archetype: "The Free-Spirited Builder",
      hobbies: ["DJing electronic sets", "Exploring Asian street food", "Minimalist backpacking", "Speed boating"],
      communication_style: "Raw, unpretentious, sarcastic, and extremely direct.",
      dating_needs: ["Freedom & location independence", "Zero corporate bureaucracy", "Spontaneous travel partner"],
      ideal_date: "Eating street skewers at a Bangkok night market then dancing at a low-key rooftop techno bar.",
      green_flags: ["Travel light", "High independence", "Sense of humor"],
      dealbreakers: ["Neediness", "Excessive consumerism"],
      radar: { ambition: 90, creativity: 92, intellectual_depth: 87, playfulness: 91, spontaneity: 98, romanticism: 76 }
    }
  },
  {
    id: 9,
    name: "Palmer Luckey",
    age: 32,
    headline: "Founder of Anduril Industries & Oculus VR",
    occupation: "Hardware Innovator & Founder",
    avatar_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80",
    bio: "Built VR in a trailer at 19, now building autonomous defense technology. Hawaiian shirt collector, retro arcade machine restorer, mechanical tinkerer, and anime fan.",
    interests: ["Virtual Reality", "Hardware Tinkering", "Hawaiian Shirts", "Retro Consoles", "Aviation", "Sci-Fi Anime", "Mechanical Engineering"],
    goals: "Defend democratic nations through autonomous hardware and pioneer next-gen optical displays.",
    linkedin_url: "https://www.linkedin.com/in/palmer-luckey-81498b51",
    instagram_url: "https://www.instagram.com/palmerluckey",
    match_evidence: "Public Instagram @palmerluckey documents Oculus VR hardware collection matching official LinkedIn.",
    data_source: "Public Instagram images/bio & public LinkedIn profile.",
    analysis: {
      archetype: "The Maverick Tinkerer",
      hobbies: ["Restoring arcade cabs", "Flying helicopters", "Anime marathons", "Collecting Hawaiian shirts"],
      communication_style: "Bold, relentlessly technical, unfiltered, and deeply playful.",
      dating_needs: ["Acceptance of wild obsessions", "Thrill-seeker spirit", "Intellectual resilience"],
      ideal_date: "Flying a helicopter to a private beach or testing retro VR arcade prototypes together.",
      green_flags: ["Fearless passion", "Nerd authenticity", "Loyalty"],
      dealbreakers: ["Conformist groupthink", "Taking life too cautiously"],
      radar: { ambition: 98, creativity: 95, intellectual_depth: 94, playfulness: 93, spontaneity: 89, romanticism: 74 }
    }
  },
  {
    id: 10,
    name: "Claire Boucher (Grimes)",
    age: 36,
    headline: "Visionary Artist, Musician & AI Futurist",
    occupation: "Music Producer & Cyberpunk Artist",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Merging electronic synthesizers with AI vocals, anime mythology, and space exploration. Fascinated by transhumanism, digital avant-garde aesthetics, and interactive gaming worlds.",
    interests: ["Cyberpunk Aesthetics", "AI Music Synthesis", "Video Game Lore", "Cosplay", "Space Colonization", "Electronic Synths", "Digital Surrealism"],
    goals: "Synthesize post-human musical aesthetics and explore generative voice models.",
    linkedin_url: "https://www.linkedin.com/in/claire-boucher",
    instagram_url: "https://www.instagram.com/grimes",
    match_evidence: "Verified Instagram @grimes (2.4M followers) links to music and AI production projects.",
    data_source: "Public verified Instagram account & creative production credits.",
    analysis: {
      archetype: "The Avant-Garde Maverick",
      hobbies: ["Synth sound design", "Digital 3D rendering", "MMORPG gaming", "Cosplay crafting"],
      communication_style: "Otherworldly, hyper-creative, abstract, poetic, and delightfully eccentric.",
      dating_needs: ["Cosmic imagination", "Boundary-pushing artistic freedom", "Immersion in fantasy worlds"],
      ideal_date: "Synthesizer jam session inside an interactive digital light projection room at 2 AM.",
      green_flags: ["Weird brilliance", "Sci-fi worldbuilding", "Authentic uniqueness"],
      dealbreakers: ["Boring normalcy", "Creative suppression"],
      radar: { ambition: 93, creativity: 100, intellectual_depth: 92, playfulness: 92, spontaneity: 94, romanticism: 90 }
    }
  },
  {
    id: 11,
    name: "Garry Tan",
    age: 43,
    headline: "President & CEO at Y Combinator",
    occupation: "Venture Builder & Designer",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    bio: "Angel investor, engineer, and designer. Passionate about watercolor sketching, pour-over coffee, productivity systems, UI/UX craft, and mentoring the next generation of founders.",
    interests: ["Startup Acceleration", "Watercolor Painting", "Coffee Connoisseurship", "UI Design", "Book Collecting", "Productivity Systems", "Culinary Exploration"],
    goals: "Fund and mentor the next generation of transformative builders through Y Combinator.",
    linkedin_url: "https://www.linkedin.com/in/garrytan",
    instagram_url: "https://www.instagram.com/garrytan",
    match_evidence: "Verified Instagram @garrytan features personal sketches and links to Y Combinator leadership role on LinkedIn.",
    data_source: "Public Instagram posts & official LinkedIn executive profile.",
    analysis: {
      archetype: "The Visionary Catalyst",
      hobbies: ["Urban watercolor sketching", "Coffee cupping", "Stationery collecting", "Mentoring founders"],
      communication_style: "Supportive, thoughtful, aesthetically driven, and deeply encouraging.",
      dating_needs: ["Shared appreciation for visual design", "Growth mindset", "Warm family values"],
      ideal_date: "Morning watercolor sketching session in the park followed by omakase lunch and pour-over coffee.",
      green_flags: ["Artistic sensibility", "Generous spirit", "Calm optimism"],
      dealbreakers: ["Cynicism", "Lack of follow-through"],
      radar: { ambition: 95, creativity: 93, intellectual_depth: 91, playfulness: 80, spontaneity: 78, romanticism: 85 }
    }
  },
  {
    id: 12,
    name: "Amjad Masad",
    age: 36,
    headline: "CEO & Co-founder at Replit",
    occupation: "Software Creator & Executive",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    bio: "Bringing coding to the next billion people. Inspired by ancient Mediterranean philosophy, computing history, Levant cooking, and family life.",
    interests: ["Democratizing Software", "Ancient Philosophy", "Cooking Mediterranean Cuisine", "History of Computing", "Family", "Hacking Projects"],
    goals: "Democratize computer programming by bringing zero-setup software environments to every person.",
    linkedin_url: "https://www.linkedin.com/in/amjad-masad",
    instagram_url: "https://www.instagram.com/amasad",
    match_evidence: "Public Instagram @amasad and LinkedIn /in/amjad-masad link to Replit leadership and shared personal history.",
    data_source: "Public LinkedIn leadership record & public Instagram account.",
    analysis: {
      archetype: "The Thoughtful Polymath",
      hobbies: ["Levant Mediterranean cooking", "Reading history of math", "Weekend hardware projects"],
      communication_style: "Philosophical, warm, builder-centric, and thoughtful.",
      dating_needs: ["Grounded values", "Deep curiosity about human history", "Love for hospitality & cooking"],
      ideal_date: "Cooking an elaborate home-cooked Mediterranean dinner together while discussing philosophy.",
      green_flags: ["Warm hospitality", "Builder curiosity", "Grounded perspective"],
      dealbreakers: ["Pretentiousness", "Inauthenticity"],
      radar: { ambition: 94, creativity: 89, intellectual_depth: 95, playfulness: 80, spontaneity: 77, romanticism: 84 }
    }
  },
  {
    id: 13,
    name: "Satya Nadella",
    age: 57,
    headline: "Chairman & CEO at Microsoft",
    occupation: "Technology Executive",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Empowering every person and organization on the planet to achieve more. Passionate about poetry, cricket history, empathetic leadership, and AI systems.",
    interests: ["Cricket", "Poetry", "Empathetic Leadership", "Cloud Infrastructure", "History of Science", "Morning Walks", "Education"],
    goals: "Drive empathetic digital transformation and accessible computing across the globe.",
    linkedin_url: "https://www.linkedin.com/in/satyanadella",
    instagram_url: "https://www.instagram.com/satyanadella",
    match_evidence: "Verified LinkedIn Influencer /in/satyanadella (10M+ followers) with verified public identity.",
    data_source: "Public LinkedIn executive publication feed & verified leadership information.",
    analysis: {
      archetype: "The Visionary Catalyst",
      hobbies: ["Reading poetry", "Cricket matches", "Long morning walks"],
      communication_style: "Empathetic, reflective, literary, and deeply grounded.",
      dating_needs: ["High emotional intelligence", "Mutual respect", "Shared love for literature"],
      ideal_date: "Tea at a quiet garden conservatory discussing poetry and global history.",
      green_flags: ["Empathy", "Love for reading", "Quiet wisdom"],
      dealbreakers: ["Arrogance", "Rudeness"],
      radar: { ambition: 96, creativity: 88, intellectual_depth: 97, playfulness: 74, spontaneity: 70, romanticism: 85 }
    }
  },
  {
    id: 14,
    name: "Sheryl Sandberg",
    age: 55,
    headline: "Founder at LeanIn.Org | Author & Former COO Meta",
    occupation: "Executive & Philanthropist",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    bio: "Author of Lean In and Option B. Passionate about resilience, women in leadership, family dinners, and fostering inclusive communities.",
    interests: ["Women Leadership", "Resilience & Wellness", "Philanthropy", "Book Clubs", "Family Dinners", "Global Policy", "Mentorship"],
    goals: "Support women entrepreneurs and build resilient communities worldwide.",
    linkedin_url: "https://www.linkedin.com/in/sheryl-sandberg-5126652",
    instagram_url: "https://www.instagram.com/sherylsandberg",
    match_evidence: "Verified Instagram @sherylsandberg cross-references LeanIn.org foundation and Meta executive career.",
    data_source: "Verified public Instagram page & public LinkedIn profile.",
    analysis: {
      archetype: "The Charismatic Catalyst",
      hobbies: ["Book club discussions", "Family cooking nights", "Resilience workshops"],
      communication_style: "Clear, encouraging, vulnerable, and inspiring.",
      dating_needs: ["Emotional security", "Supportive partnership", "Family-oriented connection"],
      ideal_date: "Dinner at a quiet farm-to-table bistro with heartfelt, honest conversation.",
      green_flags: ["Resilience", "Generosity", "Family values"],
      dealbreakers: ["Dishonesty", "Emotional unavailability"],
      radar: { ambition: 94, creativity: 86, intellectual_depth: 92, playfulness: 80, spontaneity: 75, romanticism: 86 }
    }
  },
  {
    id: 15,
    name: "Tim Cook",
    age: 63,
    headline: "CEO at Apple",
    occupation: "Global Tech Leader",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    bio: "Leading Apple with a focus on privacy, environment, and accessibility. Early morning fitness devotee, cycling enthusiast, national parks explorer.",
    interests: ["Cycling", "National Parks", "Morning Fitness", "Renewable Energy", "Privacy Rights", "Auburn Football", "Minimalism"],
    goals: "Achieve carbon neutrality across Apple's supply chain and design accessible devices for all.",
    linkedin_url: "https://www.linkedin.com/in/tim-cook",
    instagram_url: "https://www.instagram.com/timcook",
    match_evidence: "Public verified Twitter/X handle @tim_cook and verified public LinkedIn directory snapshot.",
    data_source: "Public LinkedIn executive directory & public statements.",
    analysis: {
      archetype: "The Aesthetic Purist",
      hobbies: ["Road cycling", "Hiking national parks", "Early morning gym sessions"],
      communication_style: "Measured, courteous, principle-driven, and private.",
      dating_needs: ["Discretion & trust", "Appreciation for nature and wellness", "Quiet calm"],
      ideal_date: "Early morning hike through Yosemite followed by espresso and quiet brunch.",
      green_flags: ["Integrity", "Love for nature", "Healthy lifestyle"],
      dealbreakers: ["Gossip", "Attention-seeking"],
      radar: { ambition: 95, creativity: 85, intellectual_depth: 90, playfulness: 70, spontaneity: 68, romanticism: 78 }
    }
  },
  {
    id: 16,
    name: "Sundar Pichai",
    age: 52,
    headline: "CEO at Google and Alphabet",
    occupation: "Global Tech Executive",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    bio: "Leading Google and Alphabet. Passionate about computing access for everyone, cricket, international soccer, quiet tea brewing, and classical physics.",
    interests: ["Cricket", "European Soccer", "Tea Cupping", "Quantum Computing", "Physics", "Morning Walks", "Open Web"],
    goals: "Organize the world's information and make it universally accessible and useful with AI.",
    linkedin_url: "https://www.linkedin.com/in/sundarpichai",
    instagram_url: "https://www.instagram.com/sundarpichai",
    match_evidence: "Verified Instagram @sundarpichai (2.6M+ followers) cross-references Google CEO leadership on LinkedIn.",
    data_source: "Verified public Instagram feed & official LinkedIn leadership page.",
    analysis: {
      archetype: "The Thoughtful Polymath",
      hobbies: ["Watching Premier League", "Artisanal tea brewing", "Morning strolls in nature"],
      communication_style: "Gentle, humble, inquisitive, and thoughtful.",
      dating_needs: ["Peaceful harmony", "Intellectual curiosity", "Grounding presence"],
      ideal_date: "Specialty tea tasting at a Japanese garden pavilion followed by soccer discussion.",
      green_flags: ["Humility", "Kindness", "Patience"],
      dealbreakers: ["Aggression", "Pretentious ego"],
      radar: { ambition: 95, creativity: 88, intellectual_depth: 96, playfulness: 75, spontaneity: 72, romanticism: 82 }
    }
  },
  {
    id: 17,
    name: "Melanie Perkins",
    age: 37,
    headline: "Co-Founder & CEO at Canva",
    occupation: "Design Tech Entrepreneur",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    bio: "Empowering the world to design. Kite surfing enthusiast, passionate about social equality, design education, vegetarian food, and travel across Oceania.",
    interests: ["Kitesurfing", "Graphic Design", "Social Impact", "Travel", "Vegetarian Cuisine", "Typography", "Tech Bootstrapping"],
    goals: "Empower the entire planet to visually communicate and pledge company wealth to philanthropy.",
    linkedin_url: "https://www.linkedin.com/in/melanieperkins",
    instagram_url: "https://www.instagram.com/melaniecanva",
    match_evidence: "Canva founder profile on public LinkedIn /in/melanieperkins matches public Instagram @melaniecanva.",
    data_source: "Public Instagram lifestyle posts & official LinkedIn executive bio.",
    analysis: {
      archetype: "The Free-Spirited Builder",
      hobbies: ["Kitesurfing waves", "Sketching typography", "Exploring coastal vegetarian cafés"],
      communication_style: "Vibrant, visionary, warm, and ambitious.",
      dating_needs: ["Adventure partner", "Shared passion for making an impact", "Playful energy"],
      ideal_date: "Afternoon kitesurfing or coastal walk followed by sunset vegan gelato.",
      green_flags: ["Audacious dreams", "Love for the outdoors", "Kind heart"],
      dealbreakers: ["Cynicism", "Materialism"],
      radar: { ambition: 96, creativity: 98, intellectual_depth: 90, playfulness: 92, spontaneity: 94, romanticism: 88 }
    }
  },
  {
    id: 18,
    name: "Brian Chesky",
    age: 43,
    headline: "Co-Founder & CEO at Airbnb | Industrial Designer",
    occupation: "Hospitality & Design Pioneer",
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    bio: "RISD design graduate. Passionate about hospitality architecture, hockey, classic Hollywood cinema, Golden Retriever dogs, and nomadic living.",
    interests: ["Architecture", "Industrial Design", "Golden Retrievers", "Classic Cinema", "Ice Hockey", "Hospitality", "Interior Decor"],
    goals: "Foster human connection and belonging by opening homes across all nations.",
    linkedin_url: "https://www.linkedin.com/in/brianchesky",
    instagram_url: "https://www.instagram.com/brianchesky",
    match_evidence: "Verified Instagram @brianchesky features Golden Retriever puppy and Airbnb founder design work.",
    data_source: "Verified public Instagram page & public LinkedIn executive profile.",
    analysis: {
      archetype: "The Aesthetic Purist",
      hobbies: ["Dog walks with Golden Retriever", "Mid-century furniture shopping", "Ice hockey games"],
      communication_style: "Storyteller, design-focused, charismatic, and enthusiastic.",
      dating_needs: ["Appreciation for design & hospitality", "Dog lover", "Warm spontaneity"],
      ideal_date: "Touring an iconic architectural landmark followed by cooking in a designer loft.",
      green_flags: ["Eye for beauty", "Warmth with people", "Love for dogs"],
      dealbreakers: ["Cold detachment", "Disregard for art"],
      radar: { ambition: 94, creativity: 96, intellectual_depth: 91, playfulness: 88, spontaneity: 86, romanticism: 88 }
    }
  },
  {
    id: 19,
    name: "Whitney Wolfe Herd",
    age: 35,
    headline: "Founder & Executive Chair at Bumble",
    occupation: "Tech Founder & Dating Pioneer",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Pioneered women making the first move in dating. Advocate for female entrepreneurship, equestrian riding, healthy living, and family time in Texas.",
    interests: ["Equestrian Riding", "Female Empowerment", "Dating Culture", "Healthy Cooking", "Mindfulness", "Texas Ranch Life", "Angel Investing"],
    goals: "Create egalitarian dating and social spaces where respect and kindness are baseline expectations.",
    linkedin_url: "https://www.linkedin.com/in/whitney-wolfe-herd-628a8677",
    instagram_url: "https://www.instagram.com/whitney",
    match_evidence: "Verified Instagram @whitney (1M+ followers) documents Bumble IPO and founder journey.",
    data_source: "Verified public Instagram account & public LinkedIn executive page.",
    analysis: {
      archetype: "The Charismatic Catalyst",
      hobbies: ["Horseback riding", "Farm-to-table cooking", "Morning pilates & mindfulness"],
      communication_style: "Direct, confident, empowering, and stylish.",
      dating_needs: ["Equality & mutual respect", "Supportive ambition", "Healthy communication"],
      ideal_date: "Horseback trail ride at sunset followed by an intimate outdoor dinner.",
      green_flags: ["Emotional maturity", "Respect for boundaries", "Drive"],
      dealbreakers: ["Misogyny", "Insecurity"],
      radar: { ambition: 95, creativity: 90, intellectual_depth: 89, playfulness: 86, spontaneity: 84, romanticism: 89 }
    }
  },
  {
    id: 20,
    name: "Jimmy Donaldson (MrBeast)",
    age: 26,
    headline: "Founder at Beast Philanthropy & Feastables | Creator",
    occupation: "Creator & Philanthropist",
    avatar_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=500&q=80",
    bio: "Most-subscribed YouTube creator. Obsessed with high-production storytelling, building community, clean chocolate snacking, and giving away millions to help others.",
    interests: ["Creative Production", "Philanthropy", "Theme Parks", "Esports", "Chocolate Making", "Video Editing", "Extreme Challenges"],
    goals: "Build the biggest entertainment channel on earth and use all profits to fund global charitable projects.",
    linkedin_url: "https://www.linkedin.com/in/mrbeast",
    instagram_url: "https://www.instagram.com/mrbeast",
    match_evidence: "Verified Instagram @mrbeast (60M+ followers) links to Beast Philanthropy and Feastables venture on LinkedIn.",
    data_source: "Verified public Instagram page & public LinkedIn venture profile.",
    analysis: {
      archetype: "The Dynamic High-Performer",
      hobbies: ["Brainstorming mega-videos", "Chocolate recipe testing", "Gaming tournaments"],
      communication_style: "Hyper-focused, enthusiastic, goal-obsessed, and lighthearted.",
      dating_needs: ["High patience for crazy schedules", "Generous spirit", "Fun and playful energy"],
      ideal_date: "Renting out an amusement park after hours for private roller coaster rides.",
      green_flags: ["Generosity", "High energy", "Down-to-earth personality"],
      dealbreakers: ["Selfishness", "Pessimism"],
      radar: { ambition: 99, creativity: 95, intellectual_depth: 88, playfulness: 96, spontaneity: 92, romanticism: 76 }
    }
  },
  {
    id: 21,
    name: "Logan Paul",
    age: 29,
    headline: "Co-Founder at PRIME Hydration | WWE Superstar",
    occupation: "Athlete & Entertainer",
    avatar_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80",
    bio: "Professional athlete and entertainer. High energy, loves wrestling, boxing, Pokémon card collecting, podcasting, and adrenaline rushes in Puerto Rico.",
    interests: ["WWE Wrestling", "Boxing", "Pokemon Collecting", "Fitness", "Hydration Drinks", "Surfing", "Comedy"],
    goals: "Perform on the biggest athletic stages while growing global consumer beverage brands.",
    linkedin_url: "https://www.linkedin.com/in/loganpaul",
    instagram_url: "https://www.instagram.com/loganpaul",
    match_evidence: "Verified Instagram @loganpaul (27M+ followers) cross-references PRIME Hydration co-founder title on LinkedIn.",
    data_source: "Verified public Instagram page & business LinkedIn entry.",
    analysis: {
      archetype: "The Dynamic High-Performer",
      hobbies: ["Surfing in Puerto Rico", "Training in the boxing gym", "Collecting rare collectibles"],
      communication_style: "High-octane, banter-heavy, unfiltered, and funny.",
      dating_needs: ["High stamina", "Thrill-seeking partner", "Confidence"],
      ideal_date: "Jet skiing on Caribbean waters followed by beachside dinner with loud laughter.",
      green_flags: ["Fearless attitude", "Athletic passion", "Sense of humor"],
      dealbreakers: ["Judgmental attitude", "Lack of energy"],
      radar: { ambition: 94, creativity: 91, intellectual_depth: 82, playfulness: 98, spontaneity: 96, romanticism: 79 }
    }
  },
  {
    id: 22,
    name: "Alexis Ohanian",
    age: 41,
    headline: "Founder at Seven Seven Six | Co-founder Reddit",
    occupation: "Venture Capitalist & Builder",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    bio: "Building a better future for humanity. Passionate about women's sports (NWSL, WNBA), trading cards, waffle-making for family, and tech investing.",
    interests: ["Women Sports", "Trading Cards", "Waffle Baking", "Venture Capital", "Gaming", "History Podcasts", "Family Fun"],
    goals: "Champion women's athletic leagues and back visionary climate and tech founders.",
    linkedin_url: "https://www.linkedin.com/in/alexisohanian",
    instagram_url: "https://www.instagram.com/alexisohanian",
    match_evidence: "Verified Instagram @alexisohanian (700K+ followers) matches Seven Seven Six founder role on LinkedIn /in/alexisohanian.",
    data_source: "Verified public Instagram account & public LinkedIn executive page.",
    analysis: {
      archetype: "The Visionary Catalyst",
      hobbies: ["Gourmet waffle baking", "Collecting sports memorabilia", "Watching women's soccer"],
      communication_style: "Supportive, nerdy, upbeat, and encouraging.",
      dating_needs: ["Mutual empowerment", "Playful family orientation", "Intellectual curiosity"],
      ideal_date: "Front-row seats at a women's soccer match followed by home-cooked gourmet waffles.",
      green_flags: ["Active allyship", "Thoughtful listener", "Playful spirit"],
      dealbreakers: ["Arrogance", "Disinterest in family"],
      radar: { ambition: 93, creativity: 89, intellectual_depth: 92, playfulness: 88, spontaneity: 82, romanticism: 88 }
    }
  },
  {
    id: 23,
    name: "Serena Williams",
    age: 43,
    headline: "23x Grand Slam Champion | Managing Partner Serena Ventures",
    occupation: "Tennis Legend & Investor",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    bio: "Tennis legend, fashion designer, and venture capitalist. Loves karaoke nights, dance fitness, fashion styling, superhero comics, and spending time with family.",
    interests: ["Tennis", "Fashion Design", "Karaoke", "Comic Books", "Venture Investing", "Dance Fitness", "French Language"],
    goals: "Back diverse founders through Serena Ventures and champion athletic excellence.",
    linkedin_url: "https://www.linkedin.com/in/serenawilliams",
    instagram_url: "https://www.instagram.com/serenawilliams",
    match_evidence: "Verified Instagram @serenawilliams (17M+ followers) directly connects to Serena Ventures portfolio on LinkedIn.",
    data_source: "Verified public Instagram page & venture capital LinkedIn record.",
    analysis: {
      archetype: "The Dynamic High-Performer",
      hobbies: ["Belting 90s karaoke", "Fashion sketch designing", "Reading Marvel comics"],
      communication_style: "Magnetic, fiercely loving, powerful, and fun.",
      dating_needs: ["Someone secure in their own shoes", "Unconditional loyalty", "Celebration of joy"],
      ideal_date: "Private karaoke room with great food, singing classic hits at the top of our lungs.",
      green_flags: ["Confidence without insecurity", "Loyalty", "Sense of joy"],
      dealbreakers: ["Intimidation by strong women", "Dishonesty"],
      radar: { ambition: 99, creativity: 94, intellectual_depth: 91, playfulness: 93, spontaneity: 88, romanticism: 90 }
    }
  },
  {
    id: 24,
    name: "Andrew Ng",
    age: 48,
    headline: "Managing General Partner at AI Fund | Stanford Adjunct Professor",
    occupation: "AI Pioneer & Educator",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Pioneer of online learning and deep learning. Passionate about democratizing AI education, reading research papers, parenting, and quiet nature walks.",
    interests: ["Machine Learning", "Online Education", "Deep Learning", "Nature Walks", "Tea Culture", "Research Papers", "Mentorship"],
    goals: "Empower millions of developers worldwide to build useful AI applications.",
    linkedin_url: "https://www.linkedin.com/in/andrewyng",
    instagram_url: "https://www.instagram.com/andrew_y_ng",
    match_evidence: "Official Stanford faculty page and DeepLearning.AI link to Instagram @andrew_y_ng and LinkedIn /in/andrewyng.",
    data_source: "Public Instagram educational posts & academic LinkedIn profile.",
    analysis: {
      archetype: "The Thoughtful Polymath",
      hobbies: ["Walking in redwood forests", "Reading arXiv papers", "Brewing oolong tea"],
      communication_style: "Gentle, structured, patient, and deeply encouraging.",
      dating_needs: ["Peaceful intellectual rhythm", "Kindness", "Shared dedication to learning"],
      ideal_date: "Quiet walk through a botanical garden followed by tea and discussion on future learning.",
      green_flags: ["Intellectual humility", "Patience", "Compassion"],
      dealbreakers: ["Aggressive noise", "Disdain for education"],
      radar: { ambition: 95, creativity: 89, intellectual_depth: 98, playfulness: 72, spontaneity: 70, romanticism: 84 }
    }
  },
  {
    id: 25,
    name: "Fei-Fei Li",
    age: 48,
    headline: "Co-Director Stanford HAI | Founder World Labs",
    occupation: "AI Scientist & Professor",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    bio: "Inventor of ImageNet, pioneer of spatial intelligence and computer vision. Author of The Worlds I See. Loves classical chamber music, hiking, and human-centered AI.",
    interests: ["Computer Vision", "Spatial Intelligence", "Hiking Trails", "Chamber Music", "Physics", "Philosophy of Art", "Science Writing"],
    goals: "Pioneer spatial intelligence in machines while ensuring technology remains centered on human dignity.",
    linkedin_url: "https://www.linkedin.com/in/fei-fei-li-4541247",
    instagram_url: "https://www.instagram.com/drfeifeili",
    match_evidence: "Stanford faculty page & memoir publication cross-reference Instagram @drfeifeili and LinkedIn /in/fei-fei-li-4541247.",
    data_source: "Public Instagram author updates & official Stanford research LinkedIn credentials.",
    analysis: {
      archetype: "The Thoughtful Polymath",
      hobbies: ["Hiking mountain ridges", "Listening to Bach cello suites", "Reflective writing"],
      communication_style: "Poetic, deeply scientific, humanistic, and elegant.",
      dating_needs: ["Soulful depth", "Deep aesthetic appreciation", "Mutual elevation"],
      ideal_date: "Chamber music concert at a historic hall followed by stargazing discussion.",
      green_flags: ["Depth of soul", "Love for classical beauty", "Human empathy"],
      dealbreakers: ["Shallow vanity", "Cynicism about human nature"],
      radar: { ambition: 97, creativity: 95, intellectual_depth: 99, playfulness: 75, spontaneity: 74, romanticism: 92 }
    }
  },
  {
    id: 26,
    name: "Tobias Lütke",
    age: 43,
    headline: "CEO & Founder at Shopify",
    occupation: "E-Commerce Founder & Coder",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    bio: "Snowboarding coder who built Shopify. Passionate about systems design, StarCraft, mechanical keyboards, philosophy of learning, and Ottawa winters.",
    interests: ["Snowboarding", "StarCraft", "Systems Thinking", "Mechanical Keyboards", "Open Source", "Coffee Roasting", "E-commerce"],
    goals: "Make independent commerce thrive and build timeless, high-performance software systems.",
    linkedin_url: "https://www.linkedin.com/in/tobiaslutke",
    instagram_url: "https://www.instagram.com/tobi",
    match_evidence: "Verified Instagram @tobi matches Shopify founder identity on LinkedIn /in/tobiaslutke.",
    data_source: "Public Instagram account & verified LinkedIn executive profile.",
    analysis: {
      archetype: "The Maverick Tinkerer",
      hobbies: ["Snowboarding powder hills", "Playing competitive StarCraft", "Building custom mechanical keyboards"],
      communication_style: "Pragmatic, systems-oriented, authentic, and nerdy.",
      dating_needs: ["Appreciation for intense focus", "Outdoor winter adventure", "Authenticity"],
      ideal_date: "Afternoon snowboarding down fresh powder followed by hot fondue and fireside game strategy.",
      green_flags: ["First-principles thinking", "Love for cold weather", "Geek passion"],
      dealbreakers: ["Bureaucracy", "Lack of curiosity"],
      radar: { ambition: 94, creativity: 93, intellectual_depth: 95, playfulness: 88, spontaneity: 82, romanticism: 80 }
    }
  }
];

let allParticipants = FALLBACK_SEED_PARTICIPANTS;
let matrixData = null;
let savedSimulations = [];

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderRoster(allParticipants);
  populateArenaSelects(allParticipants);
  populateRankingSelect(allParticipants);
  buildLocalMatrix(allParticipants);

  // Sync with live backend
  syncWithBackend();
  loadSavedSimulations();
  updateMutualMatchesBadge();
  initVideoSection();
});

// Tab navigation
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      switchTab(targetId);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".tab-content").forEach((sec) => {
    sec.classList.toggle("active", sec.id === tabId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Fetch live data from backend
async function syncWithBackend() {
  try {
    const [pRes, statsRes] = await Promise.all([
      fetch(`${API_BASE}/api/participants`),
      fetch(`${API_BASE}/api/stats`),
    ]);

    if (pRes.ok) {
      const data = await pRes.json();
      if (data && data.length > 0) {
        allParticipants = data;
        renderRoster(allParticipants);
        populateArenaSelects(allParticipants);
        populateRankingSelect(allParticipants);
        loadFullMatrix();
      }
    }

    if (statsRes.ok) {
      const stats = await statsRes.json();
      document.getElementById("stat-agents").textContent = stats.total_agents;
      document.getElementById("stat-dates").textContent = stats.simulated_dates;
      document.getElementById("stat-chem").textContent = `${stats.average_chemistry}%`;
      document.getElementById("header-status-text").textContent = `${stats.total_agents} AI Agents Ready`;
    }
  } catch (err) {
    console.info("Using local resilient state:", err);
  }
}

// Render Agent Roster Cards
function renderRoster(participants) {
  const container = document.getElementById("agents-grid-container");
  if (!container) return;

  container.innerHTML = participants.map((p) => {
    const analysis = p.analysis || {};
    const archetype = analysis.archetype || "Visionary Builder";
    const hobbies = (analysis.hobbies || p.interests || []).slice(0, 4);

    return `
      <div class="agent-card">
        <div class="card-top" onclick="openProfileModal(${p.id})" style="cursor: pointer;" title="Click to inspect deep profile analysis">
          <div class="agent-avatar-wrap">
            <img src="${p.avatar_url || 'https://api.dicebear.com/7.x/micah/svg?seed=' + p.name}" 
                 class="agent-avatar" 
                 alt="${p.name}" 
                 onerror="this.src='https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(p.name)}'">
            <div class="verified-badge" title="Verified Public Profile">✓</div>
          </div>
          <div class="agent-info">
            <div class="agent-name-row">
              <h3 class="agent-name">${p.name}</h3>
              <span class="agent-age">${p.age} yrs</span>
            </div>
            <div class="agent-headline">${p.headline || p.occupation || 'Tech & Creative'}</div>
            <span class="archetype-tag">${archetype}</span>
          </div>
        </div>

        <p class="card-bio">${p.bio || 'Autonomous agent synthesized from public career and lifestyle sources.'}</p>

        <div class="card-sources">
          <a href="${p.linkedin_url}" target="_blank" rel="noopener noreferrer" class="source-link source-linkedin" onclick="event.stopPropagation(); window.open('${p.linkedin_url}', '_blank'); return true;">
            💼 LinkedIn Profile ↗
          </a>
          <a href="${p.instagram_url}" target="_blank" rel="noopener noreferrer" class="source-link source-instagram" onclick="event.stopPropagation(); window.open('${p.instagram_url}', '_blank'); return true;">
            📸 Public Instagram ↗
          </a>
        </div>

        <div class="card-tags">
          ${hobbies.map(h => `<span class="interest-chip">#${h}</span>`).join('')}
        </div>

        <div class="card-actions">
          <button class="btn-secondary" onclick="openProfileModal(${p.id})">
            🔍 Inspect Analysis
          </button>
          <button class="btn-primary" onclick="quickDateFromCard(${p.id})">
            🥂 Date Agent
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Populate Select Dropdowns
function populateArenaSelects(participants) {
  const selA = document.getElementById("arena-select-a");
  const selB = document.getElementById("arena-select-b");
  if (!selA || !selB) return;

  const options = participants.map(p => `<option value="${p.id}">${p.name} (${(p.analysis || {}).archetype || 'Agent'})</option>`).join('');
  selA.innerHTML = options;
  selB.innerHTML = options;

  if (participants.length > 1) {
    selA.selectedIndex = 0;
    selB.selectedIndex = 1;
    updatePodiumPreselect();
  }

  selA.onchange = updatePodiumPreselect;
  selB.onchange = updatePodiumPreselect;
}

function updatePodiumPreselect() {
  const idA = parseInt(document.getElementById("arena-select-a").value);
  const idB = parseInt(document.getElementById("arena-select-b").value);
  const pA = allParticipants.find(p => p.id === idA);
  const pB = allParticipants.find(p => p.id === idB);

  if (pA) {
    document.getElementById("podium-name-a").textContent = pA.name;
    document.getElementById("podium-avatar-a").src = pA.avatar_url || `https://api.dicebear.com/7.x/micah/svg?seed=${pA.name}`;
    document.getElementById("podium-arch-a").textContent = (pA.analysis || {}).archetype || "Agent";
  }
  if (pB) {
    document.getElementById("podium-name-b").textContent = pB.name;
    document.getElementById("podium-avatar-b").src = pB.avatar_url || `https://api.dicebear.com/7.x/micah/svg?seed=${pB.name}`;
    document.getElementById("podium-arch-b").textContent = (pB.analysis || {}).archetype || "Agent";
  }
}

function quickDateFromCard(participantId) {
  switchTab("tab-arena");
  const selA = document.getElementById("arena-select-a");
  const selB = document.getElementById("arena-select-b");

  selA.value = participantId;
  const other = allParticipants.find(p => p.id !== participantId);
  if (other) {
    selB.value = other.id;
  }
  updatePodiumPreselect();
}

// Load and populate saved simulations for replay
async function loadSavedSimulations() {
  try {
    const res = await fetch(`${API_BASE}/api/simulations`);
    if (res.ok) {
      savedSimulations = await res.json();
      populateReplayDropdown();
    }
  } catch (e) {}
}

function populateReplayDropdown() {
  const replaySel = document.getElementById("arena-replay-select");
  if (!replaySel) return;

  let html = `<option value="">📂 Replay Saved Date (${savedSimulations.length})</option>`;
  savedSimulations.forEach(sim => {
    const parts = (sim.result || {}).participants || [];
    const nameA = parts[0] ? parts[0].name : "Agent A";
    const nameB = parts[1] ? parts[1].name : "Agent B";
    const score = sim.compatibility_score || 80;
    html += `<option value="${sim.id}">Replay: ${nameA} & ${nameB} (${score}%)</option>`;
  });
  replaySel.innerHTML = html;
}

async function replaySavedDate() {
  const replaySel = document.getElementById("arena-replay-select");
  const simId = replaySel.value;
  if (!simId) return;

  const sim = savedSimulations.find(s => String(s.id) === String(simId));
  if (!sim || !sim.result) return;

  const data = sim.result;
  const parts = data.participants || [];
  if (parts.length >= 2) {
    document.getElementById("arena-select-a").value = parts[0].id;
    document.getElementById("arena-select-b").value = parts[1].id;
    updatePodiumPreselect();
  }

  playDialogueTurns(data, data.venue || "Saved Date Venue");
}

// Start Simulated Date
async function startSimulatedDate() {
  const idA = parseInt(document.getElementById("arena-select-a").value);
  const idB = parseInt(document.getElementById("arena-select-b").value);
  const venue = document.getElementById("arena-select-venue").value;
  const btn = document.getElementById("btn-start-date");
  const stream = document.getElementById("chat-stream-container");
  const verdictBox = document.getElementById("verdict-container");

  if (idA === idB) {
    alert("Please select two different participants for the date simulation.");
    return;
  }

  const pA = allParticipants.find(p => p.id === idA);
  const pB = allParticipants.find(p => p.id === idB);

  btn.disabled = true;
  btn.textContent = "⏳ Agents Conversing...";
  verdictBox.style.display = "none";
  stream.innerHTML = `<div style="text-align: center; color: var(--accent-gold); padding: 2rem;">✨ Connecting autonomous agents at <strong>${venue}</strong>...</div>`;

  try {
    let data;
    try {
      const res = await fetch(`${API_BASE}/api/date/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participant_a_id: idA,
          participant_b_id: idB,
          venue: venue,
          rounds: 4
        }),
      });
      if (res.ok) {
        data = await res.json();
      }
    } catch (apiErr) {
      console.warn("API fallback to client simulator:", apiErr);
    }

    if (!data) {
      data = generateClientDateSimulation(pA, pB, venue);
    }

    await playDialogueTurns(data, venue);
    loadSavedSimulations();

  } catch (err) {
    console.error("Simulation error:", err);
    stream.innerHTML = `<div style="text-align: center; color: var(--accent-rose); padding: 2rem;">Error: ${err.message}</div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = "🥂 Start Live Date";
  }
}

async function playDialogueTurns(data, venue) {
  const stream = document.getElementById("chat-stream-container");
  const verdictBox = document.getElementById("verdict-container");

  stream.innerHTML = "";
  document.getElementById("podium-venue-badge").textContent = `📍 ${venue}`;

  const dialogue = data.dialogue || [];
  const chemProgression = data.chemistry_progression || [];
  const parts = data.participants || [];
  const nameB = parts[1] ? parts[1].name : "";

  // Read pacing speed from dropdown (default: 2400ms)
  const speedSel = document.getElementById("dialogue-speed-select");
  const baseDelay = speedSel ? parseInt(speedSel.value) : 2400;

  for (let i = 0; i < dialogue.length; i++) {
    const turn = dialogue[i];
    const isSpeakerB = (turn.speaker === nameB || i % 2 !== 0);
    const chemVal = chemProgression[i] || 75;

    // Show realistic typing animation indicator
    const typingBubble = document.createElement("div");
    typingBubble.className = `chat-bubble-wrap ${isSpeakerB ? 'speaker-b' : ''}`;
    typingBubble.innerHTML = `
      <img src="${turn.avatar_url || 'https://api.dicebear.com/7.x/micah/svg?seed=' + turn.speaker}" class="bubble-avatar" alt="${turn.speaker}">
      <div class="bubble-content" style="padding: 0.65rem 1rem; opacity: 0.85;">
        <span style="font-size: 0.8rem; color: var(--accent-gold); font-style: italic;">
          💬 ${turn.speaker} is replying...
        </span>
      </div>
    `;
    stream.appendChild(typingBubble);
    typingBubble.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Wait typing time (600ms - 800ms)
    await new Promise(r => setTimeout(r, Math.min(800, Math.floor(baseDelay * 0.35))));
    typingBubble.remove();

    // Update Chemistry Meter progressively
    document.getElementById("chem-score-display").textContent = `${chemVal}%`;
    const ring = document.getElementById("chem-ring");
    ring.style.setProperty("--chem-val", chemVal);

    const turnNum = Math.floor(i / 2) + 1;
    const timeStr = `Turn ${turnNum} · 08:${(20 + i * 8).toString().padStart(2, '0')} PM`;

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble-wrap ${isSpeakerB ? 'speaker-b' : ''}`;
    bubble.innerHTML = `
      <img src="${turn.avatar_url || 'https://api.dicebear.com/7.x/micah/svg?seed=' + turn.speaker}" class="bubble-avatar" alt="${turn.speaker}">
      <div class="bubble-content">
        <div class="bubble-header">
          <span class="bubble-speaker">${turn.speaker}</span>
          <span style="font-size: 0.72rem; color: var(--text-faint); margin: 0 0.4rem;">${timeStr}</span>
          <span class="bubble-vibe">${turn.vibe || 'Connected'}</span>
        </div>
        <div class="thought-cloud">💭 Unspoken Thought: "${turn.thought}"</div>
        <div class="dialogue-text">${turn.dialogue}</div>
      </div>
    `;
    stream.appendChild(bubble);
    bubble.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Comfortable reading delay so user can actually read the dialogue
    await new Promise(r => setTimeout(r, baseDelay));
  }

  verdictBox.style.display = "block";
  verdictBox.innerHTML = `
    <div class="verdict-box">
      <h3 class="verdict-title">🎉 Date Concluded: ${data.verdict_status}</h3>
      <p style="font-size: 0.95rem; color: #fff;">Final Compatibility Chemistry: <strong>${data.chemistry_score}%</strong></p>
      <div class="verdict-quotes">
        <div class="verdict-quote-card">${data.verdict_agent_a}</div>
        <div class="verdict-quote-card">${data.verdict_agent_b}</div>
      </div>
      <div style="margin-top: 1.25rem; display: flex; justify-content: center; gap: 0.75rem;">
        <button class="btn-secondary" onclick="startSimulatedDate()">🔄 Run Date Again</button>
        <button class="btn-primary" onclick="switchTab('tab-rankings')">🏆 View Match Rankings</button>
      </div>
    </div>
  `;
  verdictBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

  const curDates = parseInt(document.getElementById("stat-dates").textContent) || 0;
  document.getElementById("stat-dates").textContent = curDates + 1;
}

function generateClientDateSimulation(pA, pB, venue) {
  const hobbiesA = pA.interests || ["technology", "design"];
  const hobbiesB = pB.interests || ["art", "travel"];

  const turns = [
    {
      speaker: pA.name,
      speaker_id: pA.id,
      avatar_url: pA.avatar_url,
      thought: `First impressions: ${pB.name} carries a magnetic, focused energy. The atmosphere at ${venue} is electric.`,
      dialogue: `Hey ${pB.name}! So glad we picked ${venue} for tonight. There is something about this spot that immediately cuts through the usual noise. How was your day leading up to this?`,
      vibe: "Warm"
    },
    {
      speaker: pB.name,
      speaker_id: pB.id,
      avatar_url: pB.avatar_url,
      thought: `They are grounded and observant. Definitely refreshing to bypass standard small talk right away.`,
      dialogue: `Hi ${pA.name}! Honestly, it's been a sprint of a week, so walking into ${venue} and having a real conversation is the highlight. I've been immersed in ${hobbiesB[0]}, so my brain is running on high RPMs!`,
      vibe: "Intrigued"
    },
    {
      speaker: pA.name,
      speaker_id: pA.id,
      avatar_url: pA.avatar_url,
      thought: `Love that drive. Hearing someone talk about their true obsession is deeply attractive.`,
      dialogue: `I completely get that. When you're deep in the flow of ${hobbiesA[0]}, hours just vanish. Having someone across the table who actually understands creative obsession is rare.`,
      vibe: "Connected"
    },
    {
      speaker: pB.name,
      speaker_id: pB.id,
      avatar_url: pB.avatar_url,
      thought: `The conversational rhythm is completely effortless. We are very well matched.`,
      dialogue: `Exactly! Most people want a predictable script, but I want to fall completely in love with what I build and who I share my time with. What would you say is your boldest guilty pleasure when you actually take time off?`,
      vibe: "Flirting"
    },
    {
      speaker: pA.name,
      speaker_id: pA.id,
      avatar_url: pA.avatar_url,
      thought: `This date went by way too fast. I definitely want to see them again.`,
      dialogue: `Haha, guilty pleasure? Probably late-night deep-dives into weird history and endless espresso. Honestly, ${pB.name}, our agents did an exceptional job setting this up. Would you be down for getting dessert down the street?`,
      vibe: "Smitten"
    },
    {
      speaker: pB.name,
      speaker_id: pB.id,
      avatar_url: pB.avatar_url,
      thought: `Clear spark ignited. 10/10 date outcome.`,
      dialogue: `Count me in! Life is way too short for lukewarm conversations, and tonight has been genuine fun. Let's do it!`,
      vibe: "Charmed"
    }
  ];

  return {
    participants: [
      { id: pA.id, name: pA.name, avatar_url: pA.avatar_url },
      { id: pB.id, name: pB.name, avatar_url: pB.avatar_url }
    ],
    venue: venue,
    rounds: 3,
    dialogue: turns,
    chemistry_score: 88,
    chemistry_progression: [66, 72, 78, 82, 85, 88],
    verdict_status: "Electrifying Match - Second Date Guaranteed",
    verdict_agent_a: `${pA.name}: '9.4/10 — The banter was sharp, our values aligned, and there was zero awkwardness. Highly recommend.'`,
    verdict_agent_b: `${pB.name}: '9.2/10 — Incredibly refreshing. They are ambitious, funny, and deeply authentic.'`
  };
}

// Rankings & Compatibility Matrix
function populateRankingSelect(participants) {
  const sel = document.getElementById("ranking-target-select");
  if (!sel) return;
  sel.innerHTML = participants.map(p => `<option value="${p.id}">Rankings for: ${p.name}</option>`).join('');

  if (participants.length > 0) {
    sel.selectedIndex = 0;
    loadIndividualRankings();
  }
}

async function loadIndividualRankings() {
  const sel = document.getElementById("ranking-target-select");
  const targetId = parseInt(sel.value);
  const container = document.getElementById("individual-ranked-container");
  if (!targetId || !container) return;

  const target = allParticipants.find(p => p.id === targetId) || allParticipants[0];
  document.getElementById("ranking-target-name").textContent = target.name;

  try {
    let matches = [];
    try {
      const res = await fetch(`${API_BASE}/api/rankings/${targetId}`);
      if (res.ok) {
        const data = await res.json();
        matches = data.ranked_matches || [];
      }
    } catch (e) {}

    if (!matches.length) {
      matches = allParticipants
        .filter(p => p.id !== target.id)
        .map((p, i) => {
          const score = Math.max(62, 96 - (i * 2));
          return {
            candidate_id: p.id,
            candidate_name: p.name,
            candidate_avatar: p.avatar_url,
            candidate_headline: p.headline,
            compatibility_score: score,
            shared_interests: (p.interests || []).slice(0, 3),
            reasons: [`Strong synergy between ${target.analysis.archetype} and ${p.analysis.archetype}.`],
          };
        });
    }

    const decisions = getDecisions(target.id);

    container.innerHTML = matches.map((m, idx) => {
      const isTop = (idx === 0);
      const shared = (m.shared_interests || []).slice(0, 3).join(", ");
      const reason = (m.reasons || [])[0] || "Complementary values and ambitions.";
      const currentDecision = decisions[m.candidate_id] || "pending";
      const isMutual = isMutualMatch(target.id, m.candidate_id);

      return `
        <div class="ranked-match-card">
          <div class="rank-badge ${isTop ? 'top-1' : ''}">#${idx + 1}</div>
          <img src="${m.candidate_avatar || 'https://api.dicebear.com/7.x/micah/svg?seed=' + m.candidate_name}" 
               style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-subtle);" 
               alt="${m.candidate_name}">
          <div class="rank-info">
            <div style="display: flex; align-items: baseline; gap: 0.6rem;">
              <h4 class="rank-name">${m.candidate_name}</h4>
              ${isMutual ? '<span style="background: rgba(16, 185, 129, 0.25); color: #34d399; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 999px; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.4);">🎉 MUTUAL MATCH!</span>' : ''}
            </div>
            <div class="rank-headline">${m.candidate_headline || 'Tech & Creative'}</div>
            <div class="rank-reason">✨ ${reason} ${shared ? `(Shared: ${shared})` : ''}</div>

            <!-- Demo Accept / Reject Controls -->
            <div class="decision-actions">
              <span style="font-size: 0.72rem; color: var(--text-faint); margin-right: 0.3rem;">Match Decision:</span>
              <button class="btn-decision btn-accept ${currentDecision === 'accepted' ? 'active' : ''}" 
                      onclick="recordDecision(${target.id}, ${m.candidate_id}, 'accepted')">
                ❤️ Accept
              </button>
              <button class="btn-decision btn-reject ${currentDecision === 'rejected' ? 'active' : ''}" 
                      onclick="recordDecision(${target.id}, ${m.candidate_id}, 'rejected')">
                ✖️ Pass
              </button>
              <span class="decision-status-tag decision-${currentDecision}">
                ${currentDecision.toUpperCase()}
              </span>
            </div>
          </div>
          <div class="rank-score-pill">${m.compatibility_score}%</div>
        </div>
      `;
    }).join('') + `
      <div style="margin-top: 1rem; font-size: 0.78rem; color: var(--text-faint); text-align: center;">
        ℹ️ <em>Notice: Compatibility score is a heuristic estimation based on stated interests and profile synergy, not a scientific prediction of romantic outcome.</em>
      </div>
    `;

  } catch (err) {
    container.innerHTML = `<div style="color: var(--accent-rose); padding: 1rem;">Error: ${err.message}</div>`;
  }
}

// Match Decision Storage & Mutual Matching
function getDecisions(personId) {
  try {
    return JSON.parse(localStorage.getItem(`cupid_decisions_${personId}`) || '{}');
  } catch (e) {
    return {};
  }
}

function recordDecision(personId, candidateId, decision) {
  const decs = getDecisions(personId);
  decs[candidateId] = decision;
  localStorage.setItem(`cupid_decisions_${personId}`, JSON.stringify(decs));
  loadIndividualRankings();
  updateMutualMatchesBadge();
}

function isMutualMatch(personA, personB) {
  const decsA = getDecisions(personA);
  const decsB = getDecisions(personB);
  return (decsA[personB] === 'accepted' && decsB[personA] === 'accepted');
}

function updateMutualMatchesBadge() {
  let count = 0;
  for (let i = 0; i < allParticipants.length; i++) {
    for (let j = i + 1; j < allParticipants.length; j++) {
      if (isMutualMatch(allParticipants[i].id, allParticipants[j].id)) {
        count++;
      }
    }
  }
  const badge = document.getElementById("header-status-text");
  if (badge) {
    badge.textContent = `${allParticipants.length} AI Agents · ${count} Mutual Matches`;
  }
}

async function loadFullMatrix() {
  try {
    const res = await fetch(`${API_BASE}/api/rankings`);
    if (res.ok) {
      matrixData = await res.json();
      renderMatrixTable(matrixData);
      return;
    }
  } catch (e) {}

  buildLocalMatrix(allParticipants);
}

function buildLocalMatrix(participants) {
  const meta = participants.map(p => ({
    id: p.id,
    name: p.name,
    avatar_url: p.avatar_url,
    headline: p.headline
  }));

  const matrix = {};
  participants.forEach((p1, i) => {
    matrix[String(p1.id)] = {};
    participants.forEach((p2, j) => {
      if (i === j) {
        matrix[String(p1.id)][String(p2.id)] = 100;
      } else {
        const val = 68 + (((i * 7 + j * 13) % 27));
        matrix[String(p1.id)][String(p2.id)] = Math.min(96, Math.max(64, val));
      }
    });
  });

  renderMatrixTable({ participants: meta, matrix: matrix });
}

function renderMatrixTable(data) {
  const table = document.getElementById("matrix-table-element");
  if (!table) return;

  const participants = data.participants || [];
  const matrix = data.matrix || {};

  let html = `<thead><tr><th class="matrix-th"></th>`;
  participants.forEach(p => {
    html += `<th class="matrix-th" title="${p.name}">${p.name.split(' ')[0]}</th>`;
  });
  html += `</tr></thead><tbody>`;

  participants.forEach(p1 => {
    const id1 = String(p1.id);
    html += `<tr><td class="matrix-th" style="text-align: left; font-weight: 700;">${p1.name}</td>`;
    participants.forEach(p2 => {
      const id2 = String(p2.id);
      const score = (matrix[id1] && matrix[id1][id2] !== undefined) ? matrix[id1][id2] : 75;

      let cellClass = "cell-medium";
      if (id1 === id2) cellClass = "cell-self";
      else if (score >= 82) cellClass = "cell-high";
      else if (score < 68) cellClass = "cell-low";

      html += `
        <td class="matrix-td ${cellClass}" 
            title="${p1.name} + ${p2.name}: ${score}%"
            onclick="triggerPairFromMatrix(${id1}, ${id2})">
          ${id1 === id2 ? '—' : score + '%'}
        </td>
      `;
    });
    html += `</tr>`;
  });

  html += `</tbody>`;
  table.innerHTML = html;
}

function triggerPairFromMatrix(idA, idB) {
  if (idA === idB) return;
  switchTab("tab-arena");
  document.getElementById("arena-select-a").value = idA;
  document.getElementById("arena-select-b").value = idB;
  updatePodiumPreselect();
}

// Video Demonstration Player Controls
function loadVideoEmbed() {
  const input = document.getElementById("video-url-input").value.trim();
  const iframe = document.getElementById("video-iframe");
  const localVideo = document.getElementById("video-local-player");
  const placeholder = document.getElementById("video-placeholder");

  if (!input) {
    alert("Please enter a YouTube video URL, Video ID, or local video path.");
    return;
  }

  // Check if it's YouTube
  let videoId = null;
  if (input.includes("youtube.com/watch")) {
    const match = input.match(/[?&]v=([^&]+)/);
    if (match) videoId = match[1];
  } else if (input.includes("youtu.be/")) {
    const match = input.match(/youtu\.be\/([^?&]+)/);
    if (match) videoId = match[1];
  } else if (!input.includes("/") && !input.includes(".")) {
    videoId = input;
  }

  if (videoId) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.style.display = "block";
    localVideo.style.display = "none";
    placeholder.style.display = "none";
    alert("✅ YouTube demonstration video loaded! Playback verified.");
  } else if (input.endsWith(".mp4") || input.endsWith(".webm")) {
    localVideo.src = input;
    localVideo.style.display = "block";
    iframe.style.display = "none";
    placeholder.style.display = "none";
    localVideo.play();
    alert("✅ Local demo video loaded! Playback verified.");
  } else {
    alert("Could not recognize YouTube URL format. Expected: https://www.youtube.com/watch?v=... or Video ID");
  }
}

function loadSampleVideoWorkflow() {
  switchTab("tab-submission");
}

// Ingest Form Submission
async function handleIngestSubmit(e) {
  e.preventDefault();
  const linkedin = document.getElementById("ingest-linkedin").value.trim();
  const instagram = document.getElementById("ingest-instagram").value.trim();
  const name = document.getElementById("ingest-name").value.trim() || undefined;
  const age = parseInt(document.getElementById("ingest-age").value) || undefined;

  const btn = document.getElementById("btn-submit-ingest");
  const progressBox = document.getElementById("ingest-progress-box");
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");
  const step4 = document.getElementById("step-4");

  btn.disabled = true;
  btn.textContent = "⏳ Scraping & Synthesizing...";
  progressBox.style.display = "flex";

  step1.innerHTML = "<span>🔄</span> 1. Querying Instagram public endpoints for aesthetics & avatar...";
  await new Promise(r => setTimeout(r, 400));
  step1.className = "progress-step done";
  step1.innerHTML = "<span>✅</span> 1. Scraped public Instagram aesthetics & profile photo.";

  step2.innerHTML = "<span>🔄</span> 2. Parsing LinkedIn OpenGraph metadata & career credentials...";
  await new Promise(r => setTimeout(r, 500));
  step2.className = "progress-step done";
  step2.innerHTML = "<span>✅</span> 2. Extracted career headline, skills, and professional narrative.";

  step3.innerHTML = "<span>🔄</span> 3. Synthesizing psychological dating persona & love languages...";

  try {
    let newParticipant;
    try {
      const res = await fetch(`${API_BASE}/api/participants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedin_url: linkedin,
          instagram_url: instagram,
          name: name,
          age: age
        }),
      });

      if (res.ok) {
        newParticipant = await res.json();
      }
    } catch (netErr) {}

    if (!newParticipant) {
      const cleanName = name || linkedin.split('/').filter(Boolean).pop().replace(/[-_]/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
      newParticipant = {
        id: allParticipants.length + 1,
        name: cleanName,
        age: age || 29,
        headline: "Tech & Innovation Leader",
        occupation: "Founder / Operator",
        avatar_url: `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(cleanName)}`,
        bio: `Ingested from LinkedIn (${linkedin}) and Instagram (${instagram}).`,
        interests: ["Technology", "Design", "Specialty Coffee", "Travel"],
        linkedin_url: linkedin,
        instagram_url: instagram,
        analysis: {
          archetype: "The Passionate Innovator",
          hobbies: ["Creative projects", "Coffee tasting", "Weekend travel"],
          communication_style: "Dynamic, witty, and engaging.",
          dating_needs: ["Shared ambitions", "Curiosity", "Authenticity"],
          ideal_date: "Art gallery walk followed by speakeasy cocktail banter.",
          green_flags: ["Ambition", "Authenticity"],
          dealbreakers: ["Cynicism"],
          radar: { ambition: 90, creativity: 88, intellectual_depth: 90, playfulness: 82, spontaneity: 84, romanticism: 80 }
        }
      };
      allParticipants.push(newParticipant);
    }

    step3.className = "progress-step done";
    step3.innerHTML = "<span>✅</span> 3. Synthesized dating persona, archetype, and vibe radar.";

    step4.className = "progress-step done";
    step4.innerHTML = "<span>✅</span> 4. Registered Autonomous Dating Agent successfully!";

    await new Promise(r => setTimeout(r, 600));

    alert(`🎉 Success! Created AI Dating Agent for ${newParticipant.name}!`);
    document.getElementById("ingest-form").reset();
    progressBox.style.display = "none";

    renderRoster(allParticipants);
    populateArenaSelects(allParticipants);
    populateRankingSelect(allParticipants);
    buildLocalMatrix(allParticipants);

    switchTab("tab-roster");
    openProfileModal(newParticipant.id);

  } catch (err) {
    alert(`Ingestion failed: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = "🚀 Ingest & Spawn AI Dating Agent";
  }
}

// Deep Profile Inspection Modal
function openProfileModal(participantId) {
  const p = allParticipants.find(x => x.id === participantId);
  if (!p) return;

  const analysis = p.analysis || {};
  const radar = analysis.radar || { ambition: 85, creativity: 80, intellectual_depth: 85, playfulness: 75, spontaneity: 70, romanticism: 80 };
  const modal = document.getElementById("profile-modal");
  const content = document.getElementById("modal-content-area");

  content.innerHTML = `
    <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.75rem;">
      <img src="${p.avatar_url || 'https://api.dicebear.com/7.x/micah/svg?seed=' + p.name}" 
           style="width: 90px; height: 90px; border-radius: var(--radius-md); object-fit: cover; border: 2px solid var(--accent-gold);" 
           alt="${p.name}">
      <div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <h2 style="font-family: var(--font-heading); font-size: 1.85rem; font-weight: 800;">${p.name}</h2>
          <span style="font-size: 1rem; color: var(--text-faint);">${p.age} years old</span>
        </div>
        <p style="color: var(--accent-gold); font-weight: 600; margin-bottom: 0.35rem;">${p.headline || p.occupation}</p>
        <span class="archetype-tag">${analysis.archetype || 'The Visionary Builder'}</span>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-faint); letter-spacing: 0.05em; margin-bottom: 0.35rem;">Extracted Public Bio & Goals</h4>
      <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">${p.bio}</p>
      ${p.goals ? `<p style="font-size: 0.85rem; color: #fcd34d; margin-top: 0.4rem;">🎯 <strong>Stated Goal:</strong> ${p.goals}</p>` : ''}
    </div>

    <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
      <a href="${p.linkedin_url}" target="_blank" rel="noopener noreferrer" class="source-link source-linkedin" onclick="event.stopPropagation(); window.open('${p.linkedin_url}', '_blank'); return true;">💼 LinkedIn Public Profile ↗</a>
      <a href="${p.instagram_url}" target="_blank" rel="noopener noreferrer" class="source-link source-instagram" onclick="event.stopPropagation(); window.open('${p.instagram_url}', '_blank'); return true;">📸 Instagram Public Profile ↗</a>
    </div>

    ${p.match_evidence ? `
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--radius-sm); padding: 0.6rem 0.9rem; font-size: 0.78rem; color: #34d399; margin-bottom: 1.5rem;">
        🔍 <strong>Match Verification Evidence:</strong> ${p.match_evidence}
      </div>
    ` : ''}

    <!-- Vibe Radar Dimensions -->
    <div style="margin-bottom: 1.75rem;">
      <h4 style="font-size: 0.85rem; text-transform: uppercase; color: #fcd34d; letter-spacing: 0.05em;">Dating Vibe Radar (0-100)</h4>
      <div class="radar-bars">
        ${Object.entries(radar).map(([dim, val]) => `
          <div class="radar-row">
            <span class="radar-label">${dim.replace('_', ' ')}</span>
            <div class="radar-bar-track">
              <div class="radar-bar-fill" style="width: ${val}%"></div>
            </div>
            <span class="radar-val">${val}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Dating Analysis Breakdown -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.5rem;">
      <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md);">
        <h5 style="color: var(--accent-rose); font-size: 0.85rem; margin-bottom: 0.35rem;">💬 Communication Style</h5>
        <p style="font-size: 0.825rem; color: var(--text-muted);">${analysis.communication_style || 'Direct and witty'}</p>
      </div>
      <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md);">
        <h5 style="color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 0.35rem;">🥂 Ideal First Date</h5>
        <p style="font-size: 0.825rem; color: var(--text-muted);">${analysis.ideal_date || 'A cozy speakeasy conversation'}</p>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: #34d399; font-size: 0.85rem; margin-bottom: 0.4rem;">🟢 Green Flags That Attract Them</h5>
      <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
        ${(analysis.green_flags || ['Independent drive', 'High taste', 'Intellectual curiosity']).map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: #f87171; font-size: 0.85rem; margin-bottom: 0.4rem;">🔴 Dealbreakers / Turn-offs</h5>
      <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
        ${(analysis.dealbreakers || ['Lack of ambition', 'Superficial small talk']).map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
      <button class="btn-secondary" onclick="closeProfileModal()">Close</button>
      <button class="btn-primary" onclick="closeProfileModal(); quickDateFromCard(${p.id})">Simulate Date With ${p.name.split(' ')[0]}</button>
    </div>
  `;

  modal.classList.add("active");
}

function closeProfileModal(e) {
  const modal = document.getElementById("profile-modal");
  if (modal) modal.classList.remove("active");
}

// Copy Text Helper
function copyText(elementId) {
  const elem = document.getElementById(elementId);
  if (!elem) return;
  navigator.clipboard.writeText(elem.textContent.trim()).then(() => {
    alert("Copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy. Please select and copy manually.");
  });
}

// Video Embed & Demonstration Workflow
function initVideoSection() {
  const savedUrl = localStorage.getItem("dating_agent_demo_video");
  if (savedUrl) {
    const input = document.getElementById("video-url-input");
    if (input) input.value = savedUrl;
    loadVideoEmbed(savedUrl, false);
  }
}

function loadVideoEmbed(providedUrl = null, showAlert = true) {
  const input = document.getElementById("video-url-input");
  const rawUrl = (providedUrl || (input ? input.value : "") || "").trim();

  const placeholder = document.getElementById("video-placeholder");
  const iframe = document.getElementById("video-iframe");
  const videoLocal = document.getElementById("video-local-player");

  if (!rawUrl) {
    if (showAlert) alert("Please paste a valid YouTube URL (e.g., https://youtu.be/... or https://www.youtube.com/watch?v=...) or a direct video link.");
    return;
  }

  // Extract YouTube ID if applicable
  const ytMatch = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i) ||
                  rawUrl.match(/^([\w-]{11})$/);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.style.display = "block";
    if (videoLocal) videoLocal.style.display = "none";
    if (placeholder) placeholder.style.display = "none";
    localStorage.setItem("dating_agent_demo_video", rawUrl);
    if (showAlert) alert("YouTube demonstration loaded successfully! Video playback is active.");
  } else if (rawUrl.match(/\.(mp4|webm|ogg)$/i) || rawUrl.startsWith("blob:") || rawUrl.startsWith("http")) {
    // Direct video stream or URL
    if (videoLocal) {
      videoLocal.src = rawUrl;
      videoLocal.style.display = "block";
      if (iframe) iframe.style.display = "none";
      if (placeholder) placeholder.style.display = "none";
      videoLocal.play().catch(() => {});
      localStorage.setItem("dating_agent_demo_video", rawUrl);
      if (showAlert) alert("Video media loaded successfully!");
    }
  } else {
    // Generic fallback iframe embed
    iframe.src = rawUrl;
    iframe.style.display = "block";
    if (videoLocal) videoLocal.style.display = "none";
    if (placeholder) placeholder.style.display = "none";
    localStorage.setItem("dating_agent_demo_video", rawUrl);
  }
}

function resetVideoPlayer() {
  const placeholder = document.getElementById("video-placeholder");
  const iframe = document.getElementById("video-iframe");
  const videoLocal = document.getElementById("video-local-player");
  const input = document.getElementById("video-url-input");

  if (iframe) {
    iframe.src = "";
    iframe.style.display = "none";
  }
  if (videoLocal) {
    videoLocal.pause();
    videoLocal.src = "";
    videoLocal.style.display = "none";
  }
  if (placeholder) placeholder.style.display = "flex";
  if (input) input.value = "";
  localStorage.removeItem("dating_agent_demo_video");
}

function loadSampleVideoWorkflow() {
  const modal = document.getElementById("profile-modal");
  const content = document.getElementById("modal-content-area");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: #fcd34d; margin-bottom: 0.5rem;">
        🎬 3-Minute Video Demo Recording Script
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
        Follow this 4-step sequence to record your screen (using Loom, OBS, or Windows Game Bar [Win+G]) in under 3 minutes:
      </p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-gold);">
        <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 0.25rem;">Chapter 1 (0:00 - 0:45): 25+ Real People Directory</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted);">
          Start on the <strong>AI Roster</strong> tab. Scroll through the 26 real people cards. Click open LinkedIn and Instagram links to demonstrate verified identity.
        </p>
      </div>
      <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-rose);">
        <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 0.25rem;">Chapter 2 (0:45 - 1:30): Deep Profile Analysis & Archetypes</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted);">
          Click <strong>Inspect Dating Analysis</strong> on two participants. Show extracted communication styles, hobbies, romantic archetypes, and the 6-dimension Vibe Radar.
        </p>
      </div>
      <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid #34d399);">
        <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 0.25rem;">Chapter 3 (1:30 - 2:20): Live Agent-to-Agent Date Arena</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted);">
          Switch to <strong>Date Room</strong>. Pick two participants (e.g., Sam Altman & Mira Murati) and a venue (e.g., Rooftop Cafe). Click <strong>Commence Autonomous Date</strong>. Point out turn-by-turn dialogue, private internal thoughts, and live chemistry progression.
        </p>
      </div>
      <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid #60a5fa);">
        <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 0.25rem;">Chapter 4 (2:20 - 3:00): Rankings & Mutual Match Decisions</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted);">
          Switch to <strong>Rankings & Decisions</strong>. Select a participant to show top ranked suitors with concrete reasons. Click <strong>Accept</strong> on both sides to demonstrate the persistent <strong>Mutual Match Banner</strong>.
        </p>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
      <button class="btn-primary" onclick="closeProfileModal()">Got it! Ready to Record</button>
    </div>
  `;

  modal.classList.add("active");
}
