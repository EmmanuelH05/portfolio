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
    title: "Full Stack Mobile Developer",
    company: "We Explore Earth",
    location: "Los Angeles, CA",
    startDate: "December 2025",
    endDate: "Present",
    responsibilities: [
      "Building mobile UI in React Native — event cards, forms, nav — with consistent prop shapes so teammates can reuse components without guessing at the API.",
      "Added REST endpoints for auth, event creation, and RSVPs; cut some redundant fetches while I was in there so the app stops asking the server for the same data twice.",
      "Wired Firebase for CRUD across events and volunteers, which is what tens of thousands of community members actually hit day to day.",
      "Working from Figma specs with designers in a larger agile team across GitHub PRs and sprint cycles.",
    ],
  },
  {
    title: "Co-Founder",
    company: "Rise the Fenua",
    location: "Los Angeles, CA",
    startDate: "Feb 2024",
    endDate: "Present",
    responsibilities: [
      "Built our internal admin dashboard in Next.js + TypeScript on Supabase: auth, inventory CRUD, shipment tracking, and row-level security so each collaborator only sees their own data.",
      "Kept the database evolving with small migrations as we learned what we actually needed, rather than trying to design everything up front.",
      "Replaced manual spreadsheet workflows with Google Apps Script automations for inventory tracking and donation logging.",
      "Helped run fundraising that brought in ~$17k and got educational supplies distributed internationally across active collabs.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "BID",
    location: "Los Angeles, CA",
    startDate: "May 2025",
    endDate: "Aug 2025",
    responsibilities: [
      "Worked on auth and session logic on the backend while the product was live with active users.",
      "Debugged and hardened several REST endpoints over the summer — error handling, edge cases, making sure mobile and web clients weren’t stepping on the same resources.",
      "Stayed through a product pivot and helped keep core features stable while the team reshuffled how deploys worked.",
    ],
  },
  {
    title: "Intern",
    company: "Vectorly",
    location: "Los Angeles, CA",
    startDate: "May 2024",
    endDate: "Aug 2024",
    responsibilities: [
      "Iterated on AI-generated interview questions: run output, evaluate quality, adjust prompt, repeat. Most of that work shipped as structured technical content for the platform.",
      "When responses came out wrong, figured out whether the issue was the prompt, model behavior, or post-processing — then fixed the actual root cause instead of patching the output.",
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
      "Personalization runs on lightweight rules that update as you swipe — no batch jobs, just preference weights shifting in real time.",
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
      "Spent most of my time on the backend — routes, data modeling, making sure the API actually matched what the app needed instead of over-fetching.",
      "Shipped a set of shared RN components so each screen didn’t reinvent the same buttons, cards, and form layouts.",
    ],
  },
  {
    title: "Physics-Based Remeshing Engine",
    technologies: ["C++", "VB.NET", "MATLAB"],
    startDate: "Jan 2024",
    endDate: "May 2024",
    description: [
      "Treat every interior mesh vertex like a mass on springs — spring tension pulls triangles toward equilateral, electrostatic boundary repulsion keeps points inside the region, damping stops it from oscillating forever.",
      "The differential equations come straight from Newton’s 2nd law and get stepped with Euler’s method. Implemented in C++/VB.NET, with a MATLAB pipeline for frame-by-frame visualization.",
      "Tested on 4 region geometries (rectangular, triangular, L-shaped, time-evolving). Accepted and presented at the Bay Honors Symposium at UC Berkeley.",
    ],
    highlights: [
      "Real-time mesh convergence across 4 region types",
      "Presented at Bay Honors Symposium (UC Berkeley)",
      "Also presented at ROCCT 2018",
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
