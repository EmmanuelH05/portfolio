export interface Education {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
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

export interface Volunteering {
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
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

export const personalInfo: PersonalInfo = {
  name: "Emmanuel Hernandez",
  phone: "(949)-910-8604",
  email: "05mannyhernandez@gmail.com",
  linkedin: "linkedin.com/in/05manny",
  github: "github.com/EmmanuelH05",
};

export const education: Education[] = [
  {
    institution: "University of California, Los Angeles (UCLA)",
    degree: "B.A. in Computer Science and Linguistics",
    location: "Los Angeles, CA",
    startDate: "Aug. 2025",
    endDate: "June 2027",
  },
  {
    institution: "Irvine Valley College",
    degree: "Associates in Computer Science",
    location: "Irvine, California",
    startDate: "Aug. 2023",
    endDate: "June 2025",
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: "Full-Stack Developer (Member)",
    company: "LA Blueprint",
    location: "Los Angeles, CA",
    startDate: "Sept. 2025",
    endDate: "Present",
    responsibilities: [
      "Collaborating with a full-stack engineering team to develop mobile and web features using React Native and Node.js.",
      "Working with AWS S3 and Firebase for secure storage, authentication, and scalable backend operations.",
      "Practicing iterative deployment, code reviews, and team-based development workflows.",
      "Contributing to an Instagram-style feed + storefront platform designed for event-goers and community representatives.",
      "Engineering a platform that helps We Explore Earth (WEE) manage a large and diverse user base by improving event communication, community engagement, and operational transparency.",
      "Building tech solutions to address WEE's lack of a centralized system for event management, strengthening communication pipelines between users and nonprofit organizers.",
    ],
  },
  {
    title: "Community Service Leader",
    company: "City of Irvine",
    location: "Irvine, CA",
    startDate: "Nov. 2023",
    endDate: "Present",
    responsibilities: [
      "Prepared reports, data summaries, and public-facing materials for internal City operations.",
      "Supported facility operations, documentation processing, and activity planning.",
      "Worked closely with staff to maintain safe and organized public environments.",
      "Enforced City policies and assisted community members as needed.",
    ],
  },
];

export const researchProjects: ResearchProject[] = [
  {
    title: "Physics to Graphics: Particle Scattering and Absorptions",
    technologies: ["C++", "Vulkan API"],
    startDate: "Feb. 2024",
    endDate: "Apr. 2024",
    description: [
      "Applied physics and linear algebra to generate photorealistic images through particle-based rendering.",
      "Developed Vulkan API + C++ simulations modeling scattering, absorption, and random sampling.",
      "Performed millions of Monte-Carlo trials to optimize rendering accuracy and performance.",
    ],
    highlights: [
      "Monte-Carlo simulations",
      "Photorealistic rendering",
      "Vulkan API implementation",
    ],
  },
  {
    title: "AI in Anesthesiology: Dosage Modeling & Risk Prediction",
    technologies: ["Python"],
    startDate: "Sept. 2024",
    endDate: "Feb. 2025",
    description: [
      "Explored dosage prediction models using patient features: weight, height, age, medical history.",
      "Built Python scripts to compute BMI, adjusted dosages, and visualize patient-level data.",
      "Designed early-stage structure for predictive modeling workflows.",
    ],
    highlights: [
      "Predictive modeling",
      "Healthcare applications",
      "Data visualization",
    ],
  },
  {
    title: "Triangle Remeshing Simulation with Live Quality Metrics",
    technologies: ["C++", "SFML"],
    startDate: "Mar. 2025",
    endDate: "May. 2025",
    description: [
      "Developed a dynamic mesh simulation enforcing boundary constraints and equilateral convergence.",
      "Implemented color-coded triangle quality and animated mesh deformation.",
      "Selected to present simulation research at UC Berkeley.",
    ],
    highlights: [
      "Real-time mesh simulation",
      "Mathematical optimization",
      "Selected for UC Berkeley presentation",
    ],
  },
];

export const volunteering: Volunteering[] = [
  {
    role: "Tutor",
    organization: "School on Wheels",
    location: "Los Angeles, CA",
    startDate: "Sept. 2023",
    endDate: "Present",
    responsibilities: [
      "Tutored students experiencing homelessness in math, reading, and study skills.",
      "Coached ESL learners on comprehension and writing fundamentals.",
      "Provided feedback on academic growth and strategies for improvement.",
    ],
  },
  {
    role: "Coordinator",
    organization: "Rise the Fenua",
    location: "Tahiti / Remote",
    startDate: "Jan. 2024",
    endDate: "Present",
    responsibilities: [
      "Supported a backpack and school-supply donation initiative for students in Tahiti.",
      "Created a Google Sheets/Drive system to track donations, expenses, and inventory, ensuring organization and accountability.",
    ],
  },
];

export const technicalSkills: TechnicalSkill[] = [
  {
    category: "Languages",
    skills: ["C/C++", "Python", "Java", "TypeScript"],
  },
  {
    category: "Mobile/Web",
    skills: ["React", "Next.js", "React Native (Expo)", "Node.js", "Express.js", "TailwindCSS"],
  },
  {
    category: "Cloud/Storage",
    skills: ["AWS S3", "Firebase", "MongoDB Atlas", "Supabase", "Google Places API"],
  },
];

export const currentWork: CurrentWorkItem[] = [
  {
    title: "DIDUC",
    type: "Full-Stack Event Platform",
    description:
      "Building a scalable full-stack event management platform that allows users to create, discover, and manage events. Focused on clean architecture, role-based access control, and mobile-first performance.",
    techStack: [
      "MongoDB Atlas",
      "Express.js",
      "React Native (Expo)",
      "TypeScript",
      "Firebase (Auth + Firestore)",
    ],
    building: [
      "Event creation & editing workflows",
      "Role-based admin/user permissions",
      "REST API structure",
      "MongoDB schema optimization",
      "Secure environment configuration",
    ],
  },
  {
    title: "SwipeBite",
    type: "Personalized Restaurant Discovery App",
    description:
      "Developing a swipe-based food discovery app that personalizes restaurant recommendations based on user behavior. Focused on intelligent ranking algorithms, clean UX, and scalable backend integration.",
    techStack: [
      "React / Next.js",
      "Supabase (Auth + Database)",
      "Google Places API",
      "TypeScript",
      "TailwindCSS",
    ],
    building: [
      "Personalization scoring algorithm",
      "Dynamic restaurant ranking",
      "Smart filtering (cuisine, price, distance)",
      '"Why This Restaurant?" recommendation logic',
      "Futuristic minimal UI system",
    ],
  },
];
