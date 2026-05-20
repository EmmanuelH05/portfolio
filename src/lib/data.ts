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
  /** Profile path only, e.g. instagram.com/yourhandle */
  instagram: string;
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
  phone: "9499108004",
  email: "eahernandez1@ucla.edu",
  linkedin: "linkedin.com/in/05manny/",
  instagram: "instagram.com/05manny",
  github: "github.com/EmmanuelH05",
};

export const education: Education[] = [
  {
    institution: "University of California, Los Angeles",
    degree: "B.A. Computer Science & Linguistics",
    location: "Los Angeles, CA",
    startDate: "",
    endDate: "Expected Graduation: June 2028",
    gpa: "3.6/4.0",
    relevantCoursework:
      "Data Structures & Algorithms, Software Construction & Tools, Operating Systems, Computer Organization, Database Systems, Linear Algebra, Probability & Statistics, Discrete Mathematics, Multi-Variable Calculus",
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: "Full-Stack Developer",
    company: "LA Blueprint",
    location: "Los Angeles, CA",
    startDate: "Sep. 2025",
    endDate: "Present",
    responsibilities: [
      "Building We Explore Earth (WEE), a full-stack discovery platform for 20,000+ users using React Native (Expo), Node.js/Express, and TypeScript.",
      "Designed and implemented 10+ RESTful APIs and Firestore-backed schemas for authentication, event creation, and RSVP workflows, reducing redundant queries by 30%.",
      "Led backend migration to TypeScript, refactoring 15+ controllers and introducing shared type models to eliminate runtime type errors and reduce debugging time by ~25%.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "BID",
    location: "Los Angeles, CA",
    startDate: "Jun. 2025",
    endDate: "Aug. 2025",
    responsibilities: [
      "Architected and deployed 10+ RESTful API endpoints using Node.js, Express, and TypeScript to power a student job marketplace supporting 2,000+ users, reducing API response latency by 40%.",
      "Implemented real-time bid and job status updates using WebSockets, processing 500+ job listings per month and improving user engagement by 25% through live auction/bid pricing features.",
      "Optimized PostgreSQL query performance by 3x through targeted indexing and schema refactoring, and automated deployment workflows via CI/CD pipelines reducing release cycle time by 30%.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Vectorly",
    location: "Los Angeles, CA",
    startDate: "May 2025",
    endDate: "Aug. 2025",
    responsibilities: [
      "Engineered an LLM-powered question generation service using prompt engineering, structured output parsing, and multi-layer response validation to dynamically create and evaluate 100+ technical interview questions across configurable difficulty levels and topic domains.",
      "Designed 15+ backend API routes and database schemas to support user authentication, session tracking, and AI-generated problem storage across 3 core modules.",
    ],
  },
  {
    title: "Co-Founder",
    company: "Rise the Fenua",
    location: "Los Angeles, CA",
    startDate: "Feb. 2024",
    endDate: "Present",
    responsibilities: [
      "Built a full-stack inventory admin dashboard (Next.js 16, TypeScript, Supabase/Postgres) with collab-scoped CRUD, a 6-item default catalog with per-collab enable/disable, custom item support, and RLS-enforced data isolation across collections.",
      "Engineered real-time stock controls, live search, configurable low-stock threshold alerts, and sortable inventory tables tracking per-item and collab-wide value across 6+ product categories, replacing 100% manual tracking workflows.",
      "Deployed across 3+ active collabs generating $17,000+ in fundraising revenue, with inventory data spanning 50+ educational supply units distributed across international shipment operations.",
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
      "Got in through a competitive application; the org pairs student dev teams with nonprofits around LA that need real software, not mock projects.",
      "Day to day it’s React on the front, Node/Express and Firebase on the back, with the usual PRs, sprints, and design check-ins.",
      "Sometimes I’m the one walking the team through a feature or a schema change so everyone’s aligned before we merge.",
      "The work is very much “civic tech”: tools that help orgs run programs, not flashy landing pages.",
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
      "Full-stack restaurant discovery app: Next.js frontend, Node/Express + Prisma + Postgres in the middle, JWT for auth, and Google Places for real location data.",
      "Personalization runs on lightweight rules that update as you swipe. No batch jobs, just preference weights shifting in real time.",
      "Built the swipe stack from scratch, tuning gesture detection so card swipes and photo scrolls don’t conflict. Smaller React pieces (match view, visit log, review flow) wire into it.",
    ],
  },
  {
    title: "DIDUC",
    technologies: [
      "TypeScript",
      "React Native",
      "Express",
      "MongoDB",
      "Firebase",
    ],
    startDate: "Oct 2025",
    endDate: "Dec 2025",
    description: [
      "Team project: React Native app backed by Express + MongoDB, with some storage moved onto Firebase as deployment needs became clearer.",
      "Spent most of my time on the backend: routes, data modeling, and making sure the API matched what the app needed instead of over-fetching.",
      "Shipped a set of shared RN components so each screen didn’t reinvent the same buttons, cards, and form layouts.",
    ],
  },
  {
    title: "Physics-Based Remeshing Engine",
    technologies: ["C++", "MATLAB"],
    startDate: "Jan. 2024",
    endDate: "May 2024",
    description: [
      "Built a C++ physics-based remeshing engine modeling 100+ interior mesh points as spring-mass systems, solving Newton’s 2nd law ODEs via Euler’s method to reduce triangle distortion by 60%+ toward equilateral configurations in real time.",
      "Applied repulsive electrostatic boundary modeling to enforce mesh constraints across 4+ region geometries (rectangular, triangular, L-shaped), maintaining 95%+ interior point containment through time-evolving shape changes.",
      "Built MATLAB visualization pipeline processing 10+ mesh snapshots per run to demonstrate convergence across dynamic shape simulations.",
    ],
    highlights: [
      "Real-time mesh simulation",
      "Mathematical optimization",
      "Presented at 2 undergraduate research conferences",
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
      "React Native app for a community platform: events, volunteers, and the usual mobile polish, with Firebase doing a lot of the live data.",
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
      "Shared UI pieces (cards, forms, nav) so the product feels consistent phone to phone.",
      "REST endpoints for auth, creating events, and RSVPs, with an eye on not over-fetching.",
      "Flows for organizers and volunteers that a pretty large member base actually uses week to week.",
    ],
  },
  {
    title: "SwipeBite",
    type: "Full-Stack Restaurant Discovery",
    description:
      "Swipe-first restaurant finder with simple personalization, JWT logins, and location data from Google Places.",
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
      "Lightweight rules for “you liked this, try that” that update as you swipe.",
      "Gesture-heavy feed UI where swipes and photo scrolls don’t step on each other.",
    ],
  },
];

export const additionalResumeInfo: AdditionalResumeInfo = {
  awards: [
    "Dean's List",
    "Southern California Research Symposium",
    "Bay Honors Undergraduate Research Conference (UC Berkeley)",
  ],
  interestsAndActivities: ["Double Bass", "Tutoring (School on Wheels)"],
  funFact: "I love to make music in my free time!",
};
