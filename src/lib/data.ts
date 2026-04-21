export interface Education {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  relevantCoursework?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface ResearchProject {
  title: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  description: string[];
  highlights?: string[];
}

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface TechnicalSkill {
  category: string;
  skills: string[];
}

export interface CurrentWorkItem {
  title: string;
  type: string;
  description: string;
  techStack: string[];
  building: string[];
}

export interface AdditionalResumeInfo {
  awards: string[];
  interestsAndActivities: string[];
  funFact: string;
}

export const personalInfo: PersonalInfo = {
  name: "Emmanuel Hernandez",
  phone: "949-910-8604",
  email: "eahernandez1@ucla.edu",
  linkedin: "linkedin.com/in/05manny/",
  github: "github.com/EmmanuelH05",
};

export const education: Education[] = [
  {
    institution: "University of California, Los Angeles",
    degree: "B.A. Computer Science & Linguistics",
    location: "Los Angeles, CA",
    startDate: "",
    endDate: "Expected Graduation: June 2027",
    gpa: "3.6/4.0",
    relevantCoursework:
      "Data Structures & Algorithms, Software Construction & Tools, Operating Systems, Computer Organization, Database Systems, Linear Algebra, Probability & Statistics, Discrete Mathematics, Multi-Variable Calculus",
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: "Full Stack Mobile Developer",
    company: "We Explore Earth",
    location: "Los Angeles, CA",
    startDate: "December 2025",
    endDate: "Present",
    responsibilities: [
      "Built 20+ modular React Native components (e.g., event cards, forms, navigation flows) that standardized props and improved UI.",
      "Designed and implemented 10+ RESTful APIs for authentication, event creation, and RSVP workflows, reducing redundant queries by 30%.",
      "Collaborated with 5 designers using Figma hi-fis and coordinated development through GitHub as part of an agile 12-member team.",
      "Integrated CRUD functionality with FireBase to support real-time event management and volunteer tracking for 20,000+ users.",
    ],
  },
  {
    title: "Co-Founder",
    company: "Rise the Fenua",
    location: "Los Angeles, CA",
    startDate: "Feb 2024",
    endDate: "Present",
    responsibilities: [
      "Built an admin dashboard (Next.js 16, TypeScript, Supabase) with auth-protected routes, collab CRUD, and a production tracker.",
      "Wrote 6+ SQL migrations across 4 core tables to manage schema evolution and maintain data integrity.",
      "Designed and automated inventory and donation tracking systems using Google Apps Script, reducing manual processing time by 40% for international shipment operations.",
      "Coordinated fundraising campaigns generating $17,000 in donations and distributing 50+ educational supply units.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "BID",
    location: "Los Angeles, CA",
    startDate: "May 2025",
    endDate: "Aug 2025",
    responsibilities: [
      "Assisted in developing backend services for authentication and session handling, supporting a platform used by 500+ active users.",
      "Maintained and debugged 5+ RESTful APIs, improving reliability and reducing response errors across backend–frontend communication.",
      "Supported product updates during a platform pivot, helping improve system usability and feature stability across multiple core modules.",
    ],
  },
  {
    title: "Intern",
    company: "Vectorly",
    location: "Los Angeles, CA",
    startDate: "May 2024",
    endDate: "Aug 2024",
    responsibilities: [
      "Assisted in implementing AI-driven features by testing outputs and refining prompts, contributing to the generation of 100+ structured interview questions.",
      "Analyzed AI-generated outputs to identify inconsistencies and improve accuracy, helping increase response quality and reliability across workflows.",
    ],
  },
];

export const clubExperience: WorkExperience[] = [
  {
    title: "Developer",
    company: "LA Blueprint",
    location: "Los Angeles, CA",
    startDate: "Sep 2025",
    endDate: "Present",
    responsibilities: [
      "Selected through a 4% acceptance rate for a student-led organization that develops full-stack products for nonprofits across LA.",
      "Built and maintained React, Express, Node.js, and Firebase features through GitHub PRs, sprint planning, and design reviews.",
      "Presented technical deliverables and architecture proposals to peers improving collaboration and software adoption.",
      "Contributed to open-source civic-tech products that empower Los Angeles nonprofits to modernize community operations.",
    ],
  },
];

export const researchProjects: ResearchProject[] = [
  {
    title: "SwipeBite",
    technologies: [
      "Next.js",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Google Places API",
    ],
    startDate: "Feb 2026",
    endDate: "Present",
    description: [
      "Built a full-stack restaurant discovery app with Next.js, Node/Express, Prisma/PostgreSQL, JWT auth, and Google Places API for real-time location-based feeds.",
      "Implemented a rule-based personalization engine with weighted signals and real-time preference updates per swipe.",
      "Designed a swipe-based feed UI with touch/drag gesture handling, ~80px commit thresholds, and gesture locking to separate card swipes from photo scrolling across 15+ React components (card stack, matches list, visit/review modal).",
    ],
  },
  {
    title: "Physics-Based Remeshing Engine",
    technologies: ["C++"],
    startDate: "Jan 2024",
    endDate: "April 2024",
    description: [
      "Built a C++ physics-based remeshing engine modeling 100+ interior points as spring-mass systems, solving ODEs via Euler's method.",
      "Implemented electrostatic boundary constraints across 4+ geometries maintaining 95%+ point containment.",
      "Built a visualization pipeline processing 10+ mesh snapshots per run to demonstrate convergence across dynamic shape simulations.",
      "Selected to present results at Bay Honors Symposium at UC Berkeley (10% acceptance rate).",
    ],
  },
];

export const technicalSkills: TechnicalSkill[] = [
  {
    category: "Languages",
    skills: ["C/C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Frontend",
    skills: ["React Native", "React", "Next.js", "HTML/CSS", "Expo"],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Firebase",
      "Firestore",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "Supabase",
    ],
  },
  {
    category: "Tools",
    skills: [
      "Git",
      "Linux/Unix",
      "AWS (S3)",
      "CI/CD",
      "Google Apps Script",
      "Postman",
    ],
  },
];

export const currentWork: CurrentWorkItem[] = [
  {
    title: "We Explore Earth",
    type: "Full Stack Mobile Developer",
    description:
      "Building modular React Native UI, REST APIs, and Firebase-backed event and volunteer workflows for a large community platform.",
    techStack: [
      "React Native",
      "TypeScript",
      "REST APIs",
      "Firebase",
      "Firestore",
      "Figma",
      "GitHub",
    ],
    building: [
      "20+ modular React Native components (event cards, forms, navigation flows) with standardized props.",
      "10+ RESTful APIs for authentication, event creation, and RSVP workflows.",
      "Real-time event management and volunteer tracking for 20,000+ users.",
    ],
  },
  {
    title: "SwipeBite",
    type: "Full-Stack Restaurant Discovery",
    description:
      "Swipe-based restaurant discovery with personalization, JWT auth, and Google Places–powered location feeds.",
    techStack: [
      "Next.js",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Google Places API",
    ],
    building: [
      "Rule-based personalization engine with weighted signals and real-time preference updates per swipe.",
      "Swipe feed UI with touch/drag gestures, ~80px commit thresholds, and gesture locking across 15+ React components.",
    ],
  },
];

export const additionalResumeInfo: AdditionalResumeInfo = {
  awards: [
    "Dean's List",
    "Southern California Research Symposium",
    "Bay Area Honor's Undergraduate Research Conference",
  ],
  interestsAndActivities: [
    "Double Bass (Music Theory & Performance)",
    "School on Wheels Tutor",
  ],
  funFact: "I love to make music in my free time!",
};
