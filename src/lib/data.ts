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
    endDate: "Expected Graduation: June 2027",
    gpa: "3.5/4.0",
    relevantCoursework:
      "Data Structures & Algorithms, Software Construction & Tools, Operating Systems, Computer Organization, Database Systems, Linear Algebra, Probability & Statistics, Discrete Mathematics, Multi-Variable Calculus",
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: "Full Stack Mobile Developer",
    company: "We Explore Earth",
    location: "Los Angeles, CA",
    startDate: "Dec. 2025",
    endDate: "Present",
    responsibilities: [
      "Developing features for a real-time event platform used by 20,000+ users for event management, RSVPs, and volunteer coordination.",
      "Designing and implementing 10+ RESTful APIs for event creation and RSVP workflows, reducing redundant queries by 20%.",
      "Collaborating with 5 designers using Figma hi-fis and coordinating development through GitHub as part of an agile 15-member team.",
      "Leveraging AWS services and Firebase-backed infrastructure to support scalable event management and real-time platform functionality.",
    ],
  },
  {
    title: "Technical Co-Founder",
    company: "Rise the Fenua",
    location: "Los Angeles, CA",
    startDate: "Feb. 2024",
    endDate: "Present",
    responsibilities: [
      "Co-founded an education-focused nonprofit supporting underserved youth in Tahiti through school supplies and fundraising initiatives.",
      "Developed a production dashboard used by 20+ volunteers to streamline merchandise fulfillment and coordination.",
      "Engineered a data pipeline using 6+ SQL migrations to normalize Google Form responses, reducing manual processing time by 40%.",
      "Led operations, overseeing software systems, merchandise logistics, and fundraising workflows that generated $20,000 in donations.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "BID",
    location: "Los Angeles, CA",
    startDate: "May 2025",
    endDate: "Aug. 2025",
    responsibilities: [
      "Contributed to development for a marketplace platform connecting users with local service providers through task-based bidding workflows.",
      "Built auth and session management endpoints using Node.js, Express, and MongoDB, supporting 500+ active users.",
      "Debugged API response, session persistence, and state synchronization issues across 5+ backend/frontend routes.",
      "Supported product updates during a platform pivot, helping improve system usability and feature stability across multiple core modules.",
    ],
  },
  {
    title: "Intern",
    company: "Vectorly",
    location: "Los Angeles, CA",
    startDate: "May 2024",
    endDate: "Aug. 2024",
    responsibilities: [
      "Contributed to an AI-powered technical interview platform designed to help users prepare for software engineering interviews.",
      "Evaluated AI-generated coding outputs for technical interview workflows, assessing accuracy and response quality across problems.",
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
      "Building a Tinder-style restaurant discovery app that personalizes recommendations over time based on user behavior and taste preferences.",
      "Implemented a rule-based personalization engine with weighted signals and real-time preference updates per swipe.",
      "Designed a swipe-based UI with gesture handling and threshold locking to separate card swipes from photo scrolling across 15+ React components.",
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
      "Led a 4-person team to build a shared event photo app where users join via code and collaboratively upload photos into a shared feed.",
      "Architected REST backend from scratch with 10+ endpoints, JWT middleware, and Mongoose models adopted as core team infrastructure.",
      "Implemented Firebase Cloud Storage and Authentication, reducing server load and removing local storage dependencies.",
      "Shipped 8+ reusable components and API abstractions across frontend and backend using Expo, NativeWind, and Firebase.",
    ],
  },
  {
    title: "Physics-Based Remeshing Engine",
    technologies: ["C++", "MATLAB"],
    startDate: "Feb. 2025",
    endDate: "April 2025",
    description: [
      "Built a C++ remeshing engine to improve triangle quality through physics-based geometric optimization.",
      "Applied MATLAB simulations to model spring forces, damping, and boundary constraints for mesh stabilization.",
      "Presented remeshing research as an Irvine Valley College representative at the UC Berkeley Bay Honors Symposium.",
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
      "Cursor",
      "GitHub Copilot",
      "Claude Code",
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
      "Lightweight rules for 'you liked this, try that' that update as you swipe.",
      "Gesture-heavy feed UI where swipes and photo scrolls don't step on each other.",
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
