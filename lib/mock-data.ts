// Mock data storage in server memory
// This data is lost when the server restarts

export interface Profile {
  id: string;
  name: string;
  headline: string;
  skills: string[];
  experience_years: number;
  industry: string;
  bio: string;
  contact?: {
    email?: string;
    linkedin?: string;
  };
  looking_for?: string[];
  offering?: string[];
  created_at: number;
}

export interface Swipe {
  swiper_id: string;
  swiped_id: string;
  direction: "left" | "right";
  timestamp: number;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: number;
}

// In-memory storage
const profiles = new Map<string, Profile>();
const swipes: Swipe[] = [];
const matches: Match[] = [];

// Predefined mock profiles (8-10 profiles)
const mockProfiles: Profile[] = [
  {
    id: "profile-1",
    name: "Alex Chen",
    headline: "Full-Stack Developer & AI Enthusiast",
    skills: ["React", "Node.js", "Python", "Machine Learning", "TypeScript"],
    experience_years: 5,
    industry: "AI",
    bio: "Passionate about building AI-powered applications. Looking for cofounders to build the next big thing in fintech.",
    contact: {
      email: "alex.chen@example.com",
      linkedin: "linkedin.com/in/alexchen",
    },
    looking_for: ["cofounder", "networking"],
    offering: ["tech", "development"],
    created_at: Date.now() - 86400000,
  },
  {
    id: "profile-2",
    name: "Sarah Martinez",
    headline: "Product Manager | Fintech Expert",
    skills: ["Product Management", "Strategy", "Fintech", "Agile", "UX"],
    experience_years: 7,
    industry: "fintech",
    bio: "Experienced PM with a track record of launching successful fintech products. Seeking technical cofounders for a new venture.",
    contact: {
      email: "sarah.m@example.com",
      linkedin: "linkedin.com/in/sarahmartinez",
    },
    looking_for: ["cofounder"],
    offering: ["business", "product"],
    created_at: Date.now() - 172800000,
  },
  {
    id: "profile-3",
    name: "David Kim",
    headline: "Blockchain Developer & Crypto Investor",
    skills: ["Solidity", "Web3", "Blockchain", "Smart Contracts", "DeFi"],
    experience_years: 4,
    industry: "fintech",
    bio: "Building the future of decentralized finance. Open to connecting with entrepreneurs and investors in the crypto space.",
    contact: {
      email: "david.kim@example.com",
      linkedin: "linkedin.com/in/davidkim",
    },
    looking_for: ["networking", "inversión"],
    offering: ["tech", "capital"],
    created_at: Date.now() - 259200000,
  },
  {
    id: "profile-4",
    name: "Emma Wilson",
    headline: "Healthcare Tech Entrepreneur",
    skills: [
      "Healthcare",
      "Healthtech",
      "Business Development",
      "Sales",
      "Strategy",
    ],
    experience_years: 6,
    industry: "healthtech",
    bio: "Focused on improving healthcare through technology. Looking for technical partners and mentors in the healthtech space.",
    contact: {
      email: "emma.w@example.com",
      linkedin: "linkedin.com/in/emmawilson",
    },
    looking_for: ["cofounder", "mentor"],
    offering: ["business", "conexiones"],
    created_at: Date.now() - 345600000,
  },
  {
    id: "profile-5",
    name: "Michael Brown",
    headline: "Senior Backend Engineer | System Architect",
    skills: ["Go", "Kubernetes", "AWS", "Microservices", "PostgreSQL"],
    experience_years: 8,
    industry: "AI",
    bio: "Building scalable systems for AI companies. Interested in joining or starting a startup in the AI/ML space.",
    contact: {
      email: "michael.b@example.com",
      linkedin: "linkedin.com/in/michaelbrown",
    },
    looking_for: ["cofounder", "networking"],
    offering: ["tech"],
    created_at: Date.now() - 432000000,
  },
  {
    id: "profile-6",
    name: "Lisa Anderson",
    headline: "UX Designer & Startup Advisor",
    skills: [
      "UI/UX Design",
      "Figma",
      "Design Systems",
      "User Research",
      "Prototyping",
    ],
    experience_years: 6,
    industry: "AI",
    bio: "Designing beautiful and functional products. Looking to connect with founders and developers working on innovative projects.",
    contact: {
      email: "lisa.a@example.com",
      linkedin: "linkedin.com/in/lisaanderson",
    },
    looking_for: ["networking", "mentor"],
    offering: ["tech", "conexiones"],
    created_at: Date.now() - 518400000,
  },
  {
    id: "profile-7",
    name: "James Taylor",
    headline: "Angel Investor & Serial Entrepreneur",
    skills: [
      "Investment",
      "Business Strategy",
      "Mentoring",
      "Fundraising",
      "Networking",
    ],
    experience_years: 12,
    industry: "fintech",
    bio: "Investing in early-stage startups and mentoring founders. Always looking for promising teams and innovative ideas.",
    contact: {
      email: "james.t@example.com",
      linkedin: "linkedin.com/in/jamestaylor",
    },
    looking_for: ["networking"],
    offering: ["capital", "conexiones", "mentor"],
    created_at: Date.now() - 604800000,
  },
  {
    id: "profile-8",
    name: "Maria Garcia",
    headline: "Data Scientist & ML Engineer",
    skills: ["Python", "TensorFlow", "Data Science", "MLOps", "NLP"],
    experience_years: 5,
    industry: "AI",
    bio: "Specialized in NLP and computer vision. Excited to collaborate on AI projects and connect with like-minded professionals.",
    contact: {
      email: "maria.g@example.com",
      linkedin: "linkedin.com/in/mariagarcia",
    },
    looking_for: ["cofounder", "networking"],
    offering: ["tech"],
    created_at: Date.now() - 691200000,
  },
  {
    id: "profile-9",
    name: "Robert Lee",
    headline: "Mobile Developer | iOS & Android Expert",
    skills: [
      "Swift",
      "Kotlin",
      "React Native",
      "Flutter",
      "Mobile Architecture",
    ],
    experience_years: 6,
    industry: "healthtech",
    bio: "Building mobile apps that make a difference. Looking for opportunities in healthtech and fintech mobile applications.",
    contact: {
      email: "robert.l@example.com",
      linkedin: "linkedin.com/in/robertlee",
    },
    looking_for: ["cofounder", "networking"],
    offering: ["tech"],
    created_at: Date.now() - 777600000,
  },
  {
    id: "profile-10",
    name: "Sophie Johnson",
    headline: "Marketing Director & Growth Hacker",
    skills: [
      "Digital Marketing",
      "Growth Hacking",
      "SEO",
      "Content Strategy",
      "Analytics",
    ],
    experience_years: 7,
    industry: "fintech",
    bio: "Helping startups grow through data-driven marketing. Interested in connecting with founders and technical teams.",
    contact: {
      email: "sophie.j@example.com",
      linkedin: "linkedin.com/in/sophiejohnson",
    },
    looking_for: ["networking", "cofounder"],
    offering: ["business", "conexiones"],
    created_at: Date.now() - 864000000,
  },
];

// Initialize with mock profiles
mockProfiles.forEach((profile) => {
  profiles.set(profile.id, profile);
});

// Helper functions
export function getProfiles(
  excludeUserId?: string,
  excludeSwipedIds?: string[]
): Profile[] {
  let result = Array.from(profiles.values());

  if (excludeUserId) {
    result = result.filter((p) => p.id !== excludeUserId);
  }

  if (excludeSwipedIds && excludeSwipedIds.length > 0) {
    result = result.filter((p) => !excludeSwipedIds.includes(p.id));
  }

  return result;
}

export function getProfile(userId: string): Profile | undefined {
  return profiles.get(userId);
}

export function addProfile(profile: Profile): void {
  profiles.set(profile.id, profile);
}

export function updateProfile(userId: string, updates: Partial<Profile>): void {
  const existing = profiles.get(userId);
  if (existing) {
    profiles.set(userId, { ...existing, ...updates });
  }
}

export function addSwipe(swipe: Swipe): void {
  swipes.push(swipe);
}

export function getSwipesByUser(userId: string): Swipe[] {
  return swipes.filter((s) => s.swiper_id === userId);
}

export function getSwipedIds(userId: string): string[] {
  return getSwipesByUser(userId).map((s) => s.swiped_id);
}

export function addMatch(match: Match): void {
  matches.push(match);
}

export function getMatches(userId: string): Match[] {
  return matches.filter((m) => m.user1_id === userId || m.user2_id === userId);
}

export function checkMutualSwipe(swiperId: string, swipedId: string): boolean {
  const swipe1 = swipes.find(
    (s) =>
      s.swiper_id === swiperId &&
      s.swiped_id === swipedId &&
      s.direction === "right"
  );
  const swipe2 = swipes.find(
    (s) =>
      s.swiper_id === swipedId &&
      s.swiped_id === swiperId &&
      s.direction === "right"
  );
  return !!swipe1 && !!swipe2;
}

export function createMatchIfMutual(
  user1Id: string,
  user2Id: string
): Match | null {
  if (checkMutualSwipe(user1Id, user2Id)) {
    // Check if match already exists
    const existingMatch = matches.find(
      (m) =>
        (m.user1_id === user1Id && m.user2_id === user2Id) ||
        (m.user1_id === user2Id && m.user2_id === user1Id)
    );

    if (!existingMatch) {
      const newMatch: Match = {
        id: `match-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        user1_id: user1Id,
        user2_id: user2Id,
        created_at: Date.now(),
      };
      addMatch(newMatch);
      return newMatch;
    }
  }
  return null;
}
