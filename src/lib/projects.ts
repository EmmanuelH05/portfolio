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
  {
    slug: "crash-simulator",
    name: "Database Crash Simulator",
    number: "03",
    period: "Aug 2026",
    headline: "A crash simulator that found a real data-loss bug in a production database",
    blurb:
      "Databases promise that once a write comes back, your data survives a crash. This traces every write one makes, works out which on-disk states a crash could legally leave behind, and replays each one to see whether the promise holds.",
    chips: ["Solo", "C, TypeScript, Bun, Rust, Linux", "10,942 crash states"],
    cta: "Read the case study",
    tint: "sand",
    intro: [
      "Databases advertise durability, but that guarantee is rarely tested against the narrow set of on-disk states a real crash can actually produce. I wanted something that enumerated those states instead of guessing at them, so this records a real syscall trace of a database under load, models what each filesystem journaling mode actually guarantees, and replays every legal crash state through the database's own recovery path.",
      "I pointed it at redb, a production Rust embedded database, across 20 combinations of filesystem mode and workload shape. It ran 10,942 crash states in 21 minutes and found a genuine data-loss bug, where recovery permanently lost an intact file after one specific interrupted write. Checking redb's git history and all 75 released tags showed the maintainer had already found and fixed the same bug before I picked the target, so I found it independently rather than first. I packaged the disclosure the way it would have been written and left the credit where it belonged. The fix ships in redb 4.2.0.",
    ],
    facts: [
      { label: "Role", value: "Solo" },
      { label: "Stack", value: "C, TypeScript on Bun, Rust, Linux" },
      { label: "Scale", value: "10,942 crash states in 21 minutes, 77 tests" },
      { label: "Status", value: "Local only, not published" },
    ],
    links: [],
    screenSize: { width: 1200, height: 800 },
    screensNote: "Output from the committed campaign run, not a mock-up.",
    screens: [
      {
        src: "/crashfuzz/campaign.png",
        label: "The campaign",
        caption:
          "Every filesystem and workload shape, 10,942 states in total. Three rows produced a finding, and all three are the same bug on a different filesystem.",
      },
      {
        src: "/crashfuzz/finding.png",
        label: "The bug",
        caption:
          "The header persisted but the ftruncate that grew the file did not, so the file ends up smaller than the layout its own header describes. redb panics instead of recovering.",
      },
      {
        src: "/crashfuzz/disclosure.png",
        label: "Disclosure",
        caption:
          "The maintainer had already found and fixed it upstream. Nothing was filed, because a duplicate report adds nothing.",
      },
    ],
    features: [
      {
        title: "Traces the real thing",
        body: "An LD_PRELOAD shim in C intercepts the database's actual writes. No source changes to the target and no instrumentation it could behave differently under.",
      },
      {
        title: "Four journaling modes",
        body: "ext4 ordered and journal, xfs and btrfs each guarantee different things. The models deliberately diverge instead of collapsing into one conservative approximation.",
      },
      {
        title: "Real recovery, not a simulation",
        body: "Each crash state is materialized as an actual filesystem image on a loopback device, and the database's own recovery code runs against it.",
      },
      {
        title: "One-command reproducer",
        body: "Findings are deduplicated by root-cause signature and packaged so anyone can reproduce one in about six seconds from a clean machine.",
      },
    ],
    build: [
      {
        layer: "Trace",
        detail:
          "C shim loaded with LD_PRELOAD. Every intercepted syscall gets submission and completion timestamps from one counter in a shared page, which gives a total order without a lock in the hot path.",
      },
      {
        layer: "Enumeration",
        detail:
          "TypeScript on Bun builds a persistence graph per journaling mode and enumerates the legal on-disk states at each crash point.",
      },
      {
        layer: "Oracle",
        detail:
          "Derived mechanically from the database's own documented durability contract rather than hand-written per workload, so it cannot be quietly tuned to pass.",
      },
      {
        layer: "Targets",
        detail:
          "redb as the real target, SQLite as a working control, and a deliberately broken key-value store as a positive control to prove the oracle catches what it should.",
      },
    ],
  },
  {
    slug: "code-switching-benchmark",
    name: "LLM Code-Switching Benchmark",
    number: "04",
    period: "Aug 2026 → now",
    headline: "A benchmark for whether language models actually handle Spanglish",
    blurb:
      "Bilingual speakers switch languages mid-sentence using rules they never consciously learned. This measures whether a language model follows those rules or just produces something that sounds close.",
    chips: ["Solo", "Python, pydantic, pytest, Ollama", "402 items, 3 models"],
    cta: "Read the case study",
    tint: "mist",
    intro: [
      "Spanish and English bilinguals mix languages inside a single sentence constantly, and which mixtures sound right is governed by grammar rather than taste. Most evaluations prompt a model with some Spanglish and grade the output on feel, which says nothing about whether the model represents the rule being tested. This grades against the Matrix Language Frame model from linguistics, which makes specific predictions about which language controls the grammar of a mixed sentence, so a violation becomes a gradeable error instead of an awkward phrase.",
      "Version 1.0 is 402 items, hash pinned so any edit fails the suite, balanced across three violation types and four task types. Three local open-weight models each ran the full set. One of them timed out on every item of the language identification task, so that row is unusable and the writeup says so rather than quietly dropping it. The suite is 177 tests at 96% statement coverage. It is the only thing I have built that uses both halves of my major.",
    ],
    facts: [
      { label: "Role", value: "Solo" },
      { label: "Stack", value: "Python, pydantic, pytest, Ollama" },
      { label: "Scale", value: "402 items, 3 models, 177 tests at 96% coverage" },
      { label: "Status", value: "Local only, v1.0 tagged" },
    ],
    links: [],
    screenSize: { width: 1200, height: 800 },
    screensNote: "Output from the committed v1.0 runs and a live test run.",
    screens: [
      {
        src: "/cswbench/results.png",
        label: "Repair scores",
        caption:
          "Two of the three models repair the easy violation types well and collapse on T5, a bare English verb in a Spanish frame. The third breaks differently, which is why the finding is scoped to two.",
      },
      {
        src: "/cswbench/runs.png",
        label: "The runs",
        caption:
          "All three models completed 402 items. One lost a single task entirely to timeouts, and a second is degraded across all four. Errored records are counted, never silently dropped.",
      },
      {
        src: "/cswbench/tests.png",
        label: "Tests",
        caption: "177 tests at 96% statement coverage, with eight of the fourteen modules at 100%.",
      },
    ],
    features: [
      {
        title: "Grammaticality judgment",
        body: "Pick the licensed member of a minimal pair that differs only in one violation the theory predicts. The one task every model does well.",
      },
      {
        title: "Repair",
        body: "Fix a violating sentence with the smallest possible change. This is where the models actually separate from each other.",
      },
      {
        title: "Matrix language identification",
        body: "Name which language is running the grammar and cite the evidence for it. Every model scores below chance here.",
      },
      {
        title: "Reproducible by construction",
        body: "Every response is cached by a content hash of prompt, model and seed, so rescoring a changed rule costs zero model calls and every published number regenerates from committed data.",
      },
    ],
    build: [
      {
        layer: "Items",
        detail:
          "402 items, each carrying a source, one violation type from a mutually exclusive taxonomy, a difficulty, and the linguistic justification for its gold answer. The set has a recorded SHA-256 that a test pins, so any edit fails the suite.",
      },
      {
        layer: "Taxonomy",
        detail:
          "Three violation types, cut down from a planned four. Two candidates could not be populated with enough real items for a held-out split to mean anything, so they were dropped and the reasoning recorded rather than smoothed over.",
      },
      {
        layer: "Scoring",
        detail:
          "Each task is rescaled against its own floor and tasks are never averaged together. Every reported number carries a 95% bootstrap interval from 10,000 resamples.",
      },
      {
        layer: "Inference",
        detail:
          "Local open-weight models through Ollama. No API keys and nothing leaves the machine, which meant the harness had to handle GPU out-of-memory, hung models and contention per item rather than failing the run.",
      },
    ],
  },
  {
    slug: "we-explore-earth",
    name: "We Explore Earth",
    number: "05",
    period: "Dec 2025 → June 2026",
    headline: "We Explore Earth: the RSVP app behind a 20,000-person outdoor community",
    blurb:
      "A real-time event platform for RSVPs and volunteer coordination. I worked on the React Native app, mostly the event and RSVP APIs behind it.",
    chips: ["15-person team", "React Native, Redux, Firebase, AWS S3", "20,000+ users"],
    cta: "Read the case study",
    tint: "sand",
    intro: [
      "We Explore Earth runs a real-time event platform for a community of 20,000+ users: browsing events, RSVPing, and coordinating volunteers for outdoor trips.",
      "I joined through LA Blueprint as a Software Engineer Intern on a 15-member agile team with 5 designers, working mostly on the React Native app and the event and RSVP APIs behind it. I designed and built 10+ REST endpoints for event creation and RSVP workflows, consolidating sequential reads to cut redundant queries by 20%, and built 20+ reusable React Native components from Figma hi-fis. My own merged pull requests cover the event card and home screen redesign, the RSVP modal's cancel flow, and admin-only event deletion end to end, frontend and backend.",
    ],
    facts: [
      { label: "Role", value: "Software Engineer Intern" },
      { label: "Team", value: "15-member agile team, 5 designers" },
      { label: "Stack", value: "React Native, Redux, Firebase, AWS S3" },
      { label: "Scale", value: "20,000+ users" },
    ],
    links: [],
    screenSize: { width: 390, height: 818 },
    video: {
      src: "/we-explore-earth/flow.mp4",
      poster: "/we-explore-earth/flow-poster.jpg",
      flanks: ["/we-explore-earth/your-events.png", "/we-explore-earth/rsvp-modal-cancel.png"],
      note:
        "Four stills from my merged pull requests, sequenced into a loop, not a live recording. The app needs the organization's Firebase project to run, which this portfolio doesn't have access to.",
    },
    screensNote: "Screenshots from my own merged pull requests, May 2026.",
    screens: [
      {
        src: "/we-explore-earth/your-events.png",
        label: "Event cards",
        caption:
          "Reworked the event card: dropped the gradient and gloss overlay, and restyled the date to match the Figma spec.",
      },
      {
        src: "/we-explore-earth/rsvp-modal-cancel.png",
        label: "RSVP flow",
        caption:
          "The RSVP modal grew a Cancel RSVP option that only shows once you're already registered; canceling clears both the event's attendee list and the user's RSVP list.",
      },
      {
        src: "/we-explore-earth/event-detail-admin.png",
        label: "Admin delete",
        caption: "A delete option on the event detail screen, visible only to admin accounts.",
      },
      {
        src: "/we-explore-earth/confirm-delete-modal.png",
        label: "Confirm delete",
        caption:
          "Deleting asks for confirmation first. On confirm, the backend walks every attendee's RSVP before removing the event from Firestore.",
      },
    ],
    features: [
      {
        title: "Event browsing and RSVPs",
        body: "Browse upcoming outdoor events, RSVP yes or maybe, and update or cancel an existing RSVP from the same modal.",
      },
      {
        title: "Volunteer coordination",
        body: "Event organizers track attendees and manage who's signed up for a trip.",
      },
      {
        title: "Admin controls",
        body: "Admin accounts get event management tools regular users don't, including deleting an event and cleaning up every attendee's RSVP when it's removed.",
      },
      {
        title: "Personalized home screen",
        body: "A \"Brewing next\" section surfaces the events a user is already RSVPed to, ahead of the full event list.",
      },
    ],
    contributions: [
      "Designed and built 10+ REST endpoints for event creation and RSVP workflows, consolidating sequential reads to cut redundant queries by 20%.",
      "Built 20+ reusable React Native components with standardized props from Figma hi-fis, working with 5 designers on a 15-member agile team.",
      "Shipped admin-only event deletion end to end: the trash-can UI and confirmation modal on the frontend, and the deleteEvent controller and DELETE /events/:id route on the backend, which also cleans up every attendee's RSVP before removing the event.",
      "Added the RSVP modal's cancel flow, redesigned the event card and home screen, and used AWS S3 and Firebase-backed infrastructure to support scalable, real-time event management.",
    ],
  },
];
