export type Tint = "sand" | "mist";

export interface Screen {
  src: string;
  label: string;
  caption: string;
}

export interface Feature {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  number: string;
  period: string;
  /** Panel title and paragraph on the home page. */
  headline: string;
  blurb: string;
  chips: string[];
  cta: string;
  tint: Tint;
  intro: string[];
  facts: { label: string; value: string }[];
  links: { label: string; href: string }[];
  /** Intrinsic size of the screenshots, so next/image can reserve space. */
  screenSize: { width: number; height: number };
  screensNote: string;
  screens: Screen[];
  features: Feature[];
  build?: { layer: string; detail: string }[];
  roadmap?: string[];
  contributions?: string[];
  /** `flanks` are two screenshots fanned out behind the video in the page header. */
  video?: { src: string; poster: string; flanks: [string, string]; note: string };
}

export const projects: Project[] = [
  {
    slug: "swipebite",
    name: "SwipeBite",
    number: "01",
    period: "Feb 2026 → now",
    headline: "SwipeBite: a restaurant finder you swipe through",
    blurb:
      "Every swipe nudges a taste profile, so the next stack of places is a little closer to what you'd actually eat.",
    chips: ["Solo, full stack", "Next.js, Express, Postgres, Prisma", "Google Places API"],
    cta: "Read the case study",
    tint: "sand",
    intro: [
      "Tinder for restaurants. Enter a city, get a stack of nearby places, and swipe right on what looks good. Every swipe trains a taste profile that makes the next batch smarter.",
      "It runs against a real backend: Express and PostgreSQL through Prisma, JWT auth with refresh tokens, and restaurant data from the Google Places API.",
    ],
    facts: [
      { label: "Role", value: "Solo, full stack" },
      { label: "Stack", value: "Next.js 16, TypeScript, Express, PostgreSQL, Prisma" },
      { label: "Data", value: "Google Places API" },
      { label: "Status", value: "Live" },
    ],
    links: [
      { label: "Try the live demo", href: "https://frontend-livid-ten-37.vercel.app" },
      { label: "Code on GitHub", href: "https://github.com/EmmanuelH05/SwipeBite" },
    ],
    screenSize: { width: 390, height: 844 },
    screensNote: "Captured from a running local instance connected to a real PostgreSQL database.",
    screens: [
      { src: "/swipebite/auth.png", label: "Sign up", caption: "An email and a password, and you're in." },
      {
        src: "/swipebite/login.png",
        label: "Sign in",
        caption: "Returning users get straight back to their personalized feed.",
      },
      {
        src: "/swipebite/onboarding.png",
        label: "Taste setup",
        caption: "Pick your cuisines upfront. SwipeBite uses these to weight your initial recommendations.",
      },
      {
        src: "/swipebite/feed.png",
        label: "Swipe feed",
        caption: "One restaurant at a time. Swipe right to save, left to skip. Each swipe trains your taste profile.",
      },
      {
        src: "/swipebite/feed2.png",
        label: "Restaurant card",
        caption: "Name, cuisine, price range, match score, open status, and address, all before you swipe.",
      },
      {
        src: "/swipebite/saved.png",
        label: "Saved",
        caption: "Every restaurant you liked in one place. Your personal shortlist.",
      },
    ],
    features: [
      {
        title: "Swipe to discover",
        body: "Tinder-style card swiping for restaurants. Right to save, left to pass. The gesture is fast and the UI gets out of the way.",
      },
      {
        title: "Match score",
        body: "Every card shows a percentage match based on your taste profile. The more you swipe, the more accurate it gets.",
      },
      {
        title: "Location-based feed",
        body: "Enter any city or neighborhood. Results pull from Google Places and filter by distance, price, and cuisine.",
      },
      {
        title: "Real-time hours",
        body: "Open/closed status shown on every card based on the current time. No more showing up to a closed restaurant.",
      },
      {
        title: "Saved list",
        body: "Liked restaurants stack up in a personal saved tab. Browse them anytime, no more forgetting that place you wanted to try.",
      },
      {
        title: "Taste profile",
        body: "Your preferences build up over time. Cuisine types, price range, and location radius all feed the recommendation engine.",
      },
    ],
    build: [
      {
        layer: "Frontend",
        detail: "Next.js 16 with Turbopack, TypeScript throughout, Framer Motion for swipe gesture animations.",
      },
      {
        layer: "Backend",
        detail: "Node.js + Express REST API. JWT access tokens (15 min) with refresh token rotation stored in PostgreSQL.",
      },
      {
        layer: "Database",
        detail: "PostgreSQL via Supabase. Prisma ORM with typed schemas for users, swipes, matches, and taste profiles.",
      },
      {
        layer: "Restaurants",
        detail:
          "Google Places API for real location data. Results cached per-query and filtered server-side by distance, price, and cuisine.",
      },
      {
        layer: "Personalization",
        detail:
          "Taste profile built from swipe history. Match scores computed per-restaurant by weighting cuisine, price, and distance against your preferences.",
      },
    ],
    roadmap: [
      "Group mode: swipe with friends and match on places everyone liked",
      "Visit log to track restaurants you have actually been to",
      "Photo strip from Google Places for richer cards",
      "Push notifications for deals at saved restaurants",
      "Filter by dietary restrictions (vegetarian, halal, gluten-free)",
    ],
  },
  {
    slug: "diduc",
    name: "DIDUC",
    number: "02",
    period: "Jan → May 2026",
    headline: "DIDUC: one shared photo album for everyone at the party",
    blurb:
      "Make an event, share a code, and everybody's photos land in the same feed. I led the team and wrote the backend.",
    chips: ["Led a team of 5", "React Native, Express, MongoDB, Firebase"],
    cta: "Watch the demo",
    tint: "mist",
    intro: [
      "A shared photo album app for events. You create an event, share a code, and everyone who joins can upload photos that live in one place.",
      "Built as a class project for UCLA CS 35L by five of us on the code and a designer working in Figma. I led the team and wrote the backend.",
    ],
    facts: [
      { label: "Role", value: "Team lead, backend" },
      { label: "Team", value: "5 engineers and a designer" },
      { label: "Class", value: "UCLA CS 35L, Winter 2026" },
      { label: "Stack", value: "React Native, Expo, TypeScript, Express, MongoDB, Firebase" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/EmmanuelH05" }],
    screenSize: { width: 1206, height: 2622 },
    video: {
      src: "/diduc/demo.mp4",
      poster: "/diduc/demo-poster.jpg",
      flanks: ["/diduc/event-detail.png", "/diduc/profile.png"],
      note: "Recorded live on the iPhone 17 Pro simulator: events feed, event detail, the create flow, and profile.",
    },
    screensNote: "Captured from an iPhone 17 Pro simulator on the demo branch.",
    screens: [
      {
        src: "/diduc/home.png",
        label: "Events feed",
        caption: "Your events in one place. Search, browse, and see who's attending at a glance.",
      },
      {
        src: "/diduc/event-detail.png",
        label: "Event detail",
        caption: "Every photo, every member, and every moment from the event all in one screen.",
      },
      {
        src: "/diduc/create.png",
        label: "Create event",
        caption: "Name it, describe it, drop a pin, pick a date. Share the join code and you're done.",
      },
      { src: "/diduc/profile.png", label: "Profile", caption: "Your gallery across every event you've been part of." },
      { src: "/diduc/notifications.png", label: "Notifications", caption: "Event invites and updates land here." },
      { src: "/diduc/settings.png", label: "Settings", caption: "Edit profile, log out, or delete your account." },
    ],
    features: [
      {
        title: "Event management",
        body: "Create events with name, description, location, and date. Share a generated join code with friends.",
      },
      {
        title: "Shared photo gallery",
        body: "Everyone at the event can upload photos. Each one is attributed to the person who took it.",
      },
      {
        title: "Join via code",
        body: "No invite links or permissions. Share the code, enter it, you're in the event.",
      },
      {
        title: "Personal gallery",
        body: "Your profile aggregates every photo you've uploaded across all your events.",
      },
    ],
    contributions: [
      "Designed and wired backend API routes for auth, events, photos, and user sessions using Express and MongoDB.",
      "Built the data models and schemas, then kept them in sync with the frontend as requirements changed mid-project.",
      "Contributed shared React Native components (cards, forms, layout) so screens stayed visually consistent across the team.",
      "Migrated key storage to Firebase when our deployment needs shifted later in the quarter.",
    ],
  },
];
