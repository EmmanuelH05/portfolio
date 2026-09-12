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

/**
 * "My story" on the home page. The first and last paragraphs are Emmanuel's own writing,
 * spelling fixed and wording left alone. The middle one bridges them and is drawn only
 * from facts already on the site, so it stays checkable against workExperience above.
 */
export const story: string[] = [
  "Before studying computer science, my life was on a completely different path. All throughout high school I was convinced that soccer was going to be my life. I played at a high level, and all I wanted to do was play at a higher level. That all took a turn when I unfortunately tore my ACL my junior year of high school. Suddenly I was bedridden and realized the one thing in my life that made me feel fulfilled could no longer do that, and I was convinced that nothing would ever come close. Since I was bedridden, all I had was a computer and an abundant amount of free time that would be considered dangerous for a high schooler to have. That was the case until I stumbled on a tutorial on how to build your own PC. I became fascinated with computers, eventually got into computer science, and began to find small ways to make my life a little easier, one line of code at a time.",
  "That habit never really left. I am at UCLA now studying computer science and linguistics, and most of the things I build still start the same way, with something small that was annoying me or somebody around me. Right now I work on the mobile app at We Explore Earth, mostly the event and RSVP side of it, and I help run a nonprofit I co-founded that gets school supplies to kids in Tahiti, where I built the dashboard our volunteers use to keep track of everything. On my own time I am making SwipeBite, which exists because my friends and I kept spending half an hour deciding where to eat and then not deciding. I also tutor with School on Wheels, which is probably the part that has stuck with me the most.",
  "Outside of coding, I make music and play double bass in my free time. Learning a piece is mostly slow, unglamorous repetition, and that has changed how I approach engineering problems more than I expected. When something is not working, I am a lot more willing to sit with it and go over the same few bars again until it finally clicks.",
];
