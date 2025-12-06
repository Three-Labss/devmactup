// Mock AI extraction - simulates profile extraction from PDF
// Returns mock data based on filename or rotates through predefined responses

export interface ExtractedProfile {
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
}

// Predefined mock extraction responses
const mockExtractions: ExtractedProfile[] = [
  {
    name: "Juan Pérez",
    headline: "Software Engineer & Tech Lead",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "AWS"],
    experience_years: 6,
    industry: "AI",
    bio: "Experienced software engineer with a passion for building scalable applications. Specialized in modern web technologies and cloud infrastructure.",
    contact: {
      email: "juan.perez@example.com",
      linkedin: "linkedin.com/in/juanperez",
    },
  },
  {
    name: "Ana Rodríguez",
    headline: "Product Designer & UX Strategist",
    skills: [
      "UI/UX Design",
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
    ],
    experience_years: 5,
    industry: "fintech",
    bio: "Creative product designer focused on creating intuitive user experiences. Passionate about fintech and financial inclusion.",
    contact: {
      email: "ana.rodriguez@example.com",
      linkedin: "linkedin.com/in/anarodriguez",
    },
  },
  {
    name: "Carlos Silva",
    headline: "Full-Stack Developer | Startup Founder",
    skills: ["Python", "Django", "React", "PostgreSQL", "Docker"],
    experience_years: 7,
    industry: "healthtech",
    bio: "Full-stack developer and entrepreneur. Building solutions to improve healthcare accessibility through technology.",
    contact: {
      email: "carlos.silva@example.com",
      linkedin: "linkedin.com/in/carlossilva",
    },
  },
  {
    name: "Laura Fernández",
    headline: "Data Scientist & ML Engineer",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Data Analysis",
      "SQL",
    ],
    experience_years: 4,
    industry: "AI",
    bio: "Data scientist passionate about machine learning and AI applications. Working on projects that make a real-world impact.",
    contact: {
      email: "laura.fernandez@example.com",
      linkedin: "linkedin.com/in/laurafernandez",
    },
  },
  {
    name: "Miguel Torres",
    headline: "DevOps Engineer & Cloud Architect",
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Monitoring"],
    experience_years: 8,
    industry: "fintech",
    bio: "DevOps engineer specializing in cloud infrastructure and automation. Helping companies scale their technical operations.",
    contact: {
      email: "miguel.torres@example.com",
      linkedin: "linkedin.com/in/migueltorres",
    },
  },
];

// Counter to rotate through mock extractions
let extractionCounter = 0;

/**
 * Simulates AI extraction from PDF
 * @param filename - Optional filename to influence extraction
 * @param fileContent - Optional file content (not actually used, just for simulation)
 * @returns Mock extracted profile data
 */
export async function extractProfileFromPDF(
  filename?: string,
  _fileContent?: Buffer | string
): Promise<ExtractedProfile> {
  // Simulate processing delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000)
  );

  // Rotate through mock extractions
  const extraction =
    mockExtractions[extractionCounter % mockExtractions.length];
  extractionCounter++;

  // Optionally modify based on filename if provided
  if (filename) {
    const nameMatch = filename.match(/([A-Z][a-z]+)\s+([A-Z][a-z]+)/);
    if (nameMatch) {
      extraction.name = `${nameMatch[1]} ${nameMatch[2]}`;
    }

    // Adjust industry based on filename keywords
    const lowerFilename = filename.toLowerCase();
    if (
      lowerFilename.includes("fintech") ||
      lowerFilename.includes("finance")
    ) {
      extraction.industry = "fintech";
    } else if (
      lowerFilename.includes("health") ||
      lowerFilename.includes("medical")
    ) {
      extraction.industry = "healthtech";
    } else if (lowerFilename.includes("ai") || lowerFilename.includes("ml")) {
      extraction.industry = "AI";
    }
  }

  return { ...extraction };
}
