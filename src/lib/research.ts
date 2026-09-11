import type { Tint } from "./projects";

export type PaperFigure =
  | { kind: "poster"; image: string; width: number; height: number; pdf: string }
  | { kind: "mesh" };

export interface Paper {
  slug: string;
  title: string;
  /** For "Next" links and the browser tab. */
  shortTitle: string;
  authors: string;
  mentor: string;
  institution: string;
  venue: string;
  year: string;
  tools: string[];
  tint: Tint;
  /** One line for the card on the home page. */
  summary: string;
  figure: PaperFigure;
  problem: string;
  approach: string;
  findings: string[];
  details: { label: string; body: string }[];
  documents: { label: string; href: string }[];
}

export const papers: Paper[] = [
  {
    slug: "ai-anesthesiology",
    title: "The Implementation of AI in the Field of Anesthesiology",
    shortTitle: "AI in anesthesiology",
    authors: "Emmanuel Hernandez and Hinanui Swider",
    mentor: "Prof. Kristen Skjonsby",
    institution: "Irvine Valley College, Honors Program",
    venue: "IVC Honors Research",
    year: "2025",
    tools: ["Python", "ChatGPT (GPT-4o)", "Data visualization"],
    tint: "sand",
    summary:
      "We gave ChatGPT ten real patient profiles and compared its dosing and risk calls against what an anesthesiologist actually charted.",
    figure: {
      kind: "poster",
      image: "/research/ai-anesthesiology-poster.jpg",
      width: 1600,
      height: 1201,
      pdf: "/research/ai-anesthesiology.pdf",
    },
    problem:
      "Getting anesthesia dosage wrong is catastrophic either way. Too little and a patient can wake up mid-surgery; too much and you risk respiratory failure. Anesthesiologists factor in weight, height, age, comorbidities, surgery type, and medication history all at once. We wanted to see how close a large language model could get, and what it would miss.",
    approach:
      "We gave GPT-4o 10 real patient profiles and told it to act as an anesthesiologist: output a recommended dosage and flag any risks. Then we compared every prediction against what the head anesthesiologist in Kauai, HI actually charted for the same patients.",
    findings: [
      'AI agreed on major risk categories but named them broadly; doctors flagged specific conditions like "aspiration risk" for individual patients',
      "ChatGPT recommended lower doses across the board, especially for Fentanyl and Propofol",
      "For complex patients with multiple comorbidities, AI was more cautious than clinical judgment warranted",
      "Best use case is first-pass monitoring and documentation, not replacing surgical decision-making",
    ],
    details: [
      {
        label: "Method",
        body: "Each patient had weight, height, age, ethnicity, medical history, and surgery type. We prompted GPT-4o to act as an anesthesiologist and return dosage recommendations and risk predictions, then compared every output against the specialist's actual clinical notes.",
      },
      {
        label: "Results: dosage",
        body: "ChatGPT consistently went lower on doses than the doctors did, especially for Fentanyl and Propofol. For straightforward cases that was fine. For patients with multiple comorbidities, the AI was being too cautious in ways that a real anesthesiologist would not.",
      },
      {
        label: "Results: risk",
        body: 'Both agreed on the big categories like cardiovascular and respiratory risks. The difference was specificity. Anesthesiologists named exact conditions like "aspiration risk" for a specific patient. AI gave broader flags that applied to multiple patients at once.',
      },
      {
        label: "Implications",
        body: "AI is not replacing anyone here. But it has a real use case as a first-pass tool: flagging risks across large patient sets, handling documentation, and giving a sanity check on dosage math. Its conservative default is actually useful in monitoring contexts, less so in complex surgery.",
      },
      {
        label: "Future work",
        body: "Next we want to test ER doctors and cardiologists on the same patient profiles and see how their predictions compare. Also worth testing in emergency scenarios where fast, accurate dosage output actually matters.",
      },
    ],
    documents: [{ label: "Poster", href: "/research/ai-anesthesiology.pdf" }],
  },
  {
    slug: "remeshing",
    title: "Triangle Mesh Renormalization Using Physical Principles",
    shortTitle: "Physics-based remeshing",
    authors: "Emmanuel Hernandez and Colin Minhquan Pham",
    mentor: "Lan Pham",
    institution: "Irvine Valley College, Department of Mathematics",
    venue: "Bay Honors Symposium, UC Berkeley",
    year: "2025",
    tools: ["C++", "VB.NET", "MATLAB"],
    tint: "mist",
    summary:
      "We fixed distorted triangle meshes by treating them as a physics system: springs, charged boundaries, and damping.",
    figure: { kind: "mesh" },
    problem:
      "Objects in graphics are points joined into triangles, and it is the GPU's job to turn that triangulation into what you see on screen. When the object changes shape, a liquid drop falling or a robot transforming into a jet, the triangulation has to change with it, and it gets distorted along the way. Triangulation is easy. Remeshing is hard: moving one interior point to fix a bad triangle affects every triangle around it, and the standard algorithms are purely geometric. We wanted a version where the mesh settles into a good shape on its own.",
    approach:
      "We modeled every interior point as a point mass, connected it to its neighbors with springs, and let it move in a damping field, with virtual charges along the boundary so points cannot escape the region. Positions come from Newton's second law, solved as a second order differential equation with Euler's method and zero initial velocity. Boundary points never move.",
    findings: [
      "Interior points settle into an equilibrium where most triangles come out close to equilateral",
      "Virtual charges along the boundary kept interior points inside the region on every shape we tested",
      "Tested on rectangles, triangles, L-shapes, and time-evolving shapes where the boundary changes mid-simulation",
      "Presented at the Bay Honors Symposium at UC Berkeley",
    ],
    details: [
      {
        label: "Boundary enforcement",
        body: "We placed virtual charged particles along the boundary and modeled interior points as charges too. The repulsion between them keeps interior points inside the region. Same math as Coulomb's law, just applied to mesh containment instead of actual charges.",
      },
      {
        label: "Physics model",
        body: "Each interior point has three forces acting on it: electrostatic repulsion from the boundary, spring tension pulling it toward equal edge lengths with its neighbors, and a resistance term so the system actually converges instead of oscillating forever.",
      },
      {
        label: "Implementation",
        body: "The engine reads a triangulation and solves the differential equation in C++. The numerical solver was also implemented in VB.NET with Euler's first-order method and zero initial velocity, and MATLAB handled the plots, writing out a mesh snapshot at each time step so we could watch the triangulation converge.",
      },
      {
        label: "Results",
        body: "Ran tests on rectangular, triangular, and L-shaped regions with 2 to 6 interior points. Interior points consistently converged toward equilateral configurations. The engine also works on time-evolving shapes where the boundary itself changes.",
      },
      {
        label: "Future work",
        body: "The next step is localization: letting subregions resolve at higher resolution when more detail is needed there. Right now all interior points move with the same granularity, which is not ideal for engineering sims with stress concentrations.",
      },
    ],
    documents: [
      { label: "Slides", href: "/research/remeshing-presentation.pptx" },
      { label: "Abstract", href: "/research/remeshing-abstract.docx" },
    ],
  },
];
