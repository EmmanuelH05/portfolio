export interface Education {
  school: string;
  degree: string;
  graduation: string;
  summary: string;
  coursework: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  /** One plain sentence shown on the home page; the full bullets open underneath. */
  summary: string;
  responsibilities: string[];
}

export interface PersonalInfo {
  name: string;
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

export const personalInfo: PersonalInfo = {
  name: "Emmanuel Hernandez",
  email: "eahernandez1@ucla.edu",
  linkedin: "linkedin.com/in/05manny/",
  instagram: "instagram.com/05manny",
  github: "github.com/EmmanuelH05",
};

/** personalInfo stores bare profile paths; this turns one into a link. */
export const profileUrl = (profilePath: string) => `https://${profilePath}`;

export const education: Education = {
  school: "UCLA",
  degree: "B.A. Computer Science & Linguistics",
  graduation: "June 2027",
  summary: "GPA 3.5. Dean's List.",
  coursework: [
    "Data Structures & Algorithms",
    "Software Construction & Tools",
    "Operating Systems",
    "Computer Organization",
    "Database Systems",
    "Linear Algebra",
    "Probability & Statistics",
    "Discrete Mathematics",
    "Multi-Variable Calculus",
  ],
};

export const workExperience: WorkExperience[] = [
  {
    title: "Full Stack Mobile Developer",
    company: "We Explore Earth",
    location: "Los Angeles, CA",
    startDate: "Dec 2025",
    endDate: "Present",
    summary:
      "I work on the React Native app for an event platform with 20,000+ users, mostly the event and RSVP APIs behind it.",
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
    startDate: "Feb 2024",
    endDate: "Present",
    summary:
      "A nonprofit I co-founded that gets school supplies to kids in Tahiti. I built the dashboard our volunteers run fulfillment from, and we've raised $20,000 so far.",
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
    endDate: "Aug 2025",
    summary:
      "Auth and session endpoints in Node, Express, and MongoDB for a marketplace of local service providers with 500+ users.",
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
    endDate: "Aug 2024",
    summary: "Graded AI-written code for a platform that helps people prep for technical interviews.",
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
    summary: "A student org that builds software for nonprofits around LA. About 4% of applicants get in.",
    responsibilities: [
      "Selected through a 4% acceptance rate for a student-led organization that develops full-stack products for nonprofits across LA.",
      "Presented technical deliverables and architecture proposals to peers improving collaboration and software adoption.",
      "Contributed to open-source civic-tech products that empower Los Angeles nonprofits to modernize community operations.",
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

export const awards: string[] = [
  "Dean's List",
  "Southern California Research Symposium",
  "Bay Honors Undergraduate Research Conference (UC Berkeley)",
];

/** "The longer version" on the home page, in Emmanuel's own words. */
export const story: string[] = [
  "Before computer science, I was convinced I was going to go pro in soccer. I played competitively for years and honestly saw it as the only path for myself until I tore my ACL in high school and suddenly had a lot more time sitting in front of a computer than I expected. Out of boredom at first, I started exploring computer science as a degree and ended up loving it, especially the mix of problem solving and working closely with people to take ideas from 0 to 1.",
  "Now, I study Computer Science and Linguistics at UCLA, where I spend most of my time building products that solve real problems and actually get used. I have worked on everything from real time event platforms to nonprofit systems and civic tech, and what I enjoy most is building things where I can see the impact of what I worked on.",
  "Outside of coding, I tutor with School on Wheels, play double bass, and make music. I think the patience and repetition that come with music carry over pretty naturally into how I approach engineering.",
];
