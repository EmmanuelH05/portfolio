'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const anesthesiologySlides = [
  {
    id: 'abstract',
    label: 'Abstract',
    content:
      'We looked at whether ChatGPT could do what an anesthesiologist does: take a patient profile and output a safe dosage recommendation with risk flags. Tested it against a real anesthesiologist in Kauai, HI across 10 patient scenarios.',
  },
  {
    id: 'method',
    label: 'Method',
    content:
      'Each patient had weight, height, age, ethnicity, medical history, and surgery type. We prompted GPT-4 to act as an anesthesiologist and return dosage recommendations and risk predictions, then compared every output against the specialist\'s actual clinical notes.',
  },
  {
    id: 'results1',
    label: 'Results: Dosage',
    content:
      'ChatGPT consistently went lower on doses than the doctors did, especially for Fentanyl and Propofol. For straightforward cases that was fine. For patients with multiple comorbidities, the AI was being too cautious in ways that a real anesthesiologist would not.',
  },
  {
    id: 'results2',
    label: 'Results: Risk',
    content:
      'Both agreed on the big categories like cardiovascular and respiratory risks. The difference was specificity. Anesthesiologists named exact conditions like "aspiration risk" for a specific patient. AI gave broader flags that applied to multiple patients at once.',
  },
  {
    id: 'implications',
    label: 'Implications',
    content:
      'AI is not replacing anyone here. But it has a real use case as a first-pass tool: flagging risks across large patient sets, handling documentation, and giving a sanity check on dosage math. Its conservative default is actually useful in monitoring contexts, less so in complex surgery.',
  },
  {
    id: 'future',
    label: 'Future Work',
    content:
      'Next we want to test ER doctors and cardiologists on the same patient profiles and see how their predictions compare. Also worth testing in emergency scenarios where fast, accurate dosage output actually matters.',
  },
];

const remeshingSlides = [
  {
    id: 'title',
    label: 'Overview',
    content:
      'Triangle Mesh Renormalization Using Physical Principles. Co-authored with Colin Minhquan Pham, mentored by Lan Pham, Dept. of Mathematics, Irvine Valley College.',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    content:
      'Instead of using geometry to fix distorted meshes, we modeled the mesh as a physics system. Springs pull triangles toward equilateral, electrostatic forces keep points inside the boundary, and damping stops it from bouncing around. The positions are solved by stepping through a 2nd-order ODE with Euler\'s method.',
  },
  {
    id: 'problem',
    label: 'The Problem',
    content:
      'Creating a triangulation of a region is straightforward. Getting a good one is not. When you move one interior point to fix a bad triangle, every neighboring triangle shifts too. Existing geometric algorithms struggle with this. We wanted a physics-based approach that would let the mesh settle naturally.',
  },
  {
    id: 'electrostatic',
    label: 'Boundary Enforcement',
    content:
      'We placed virtual charged particles along the boundary and modeled interior points as charges too. The repulsion between them keeps interior points inside the region. Same math as Coulomb\'s law, just applied to mesh containment instead of actual charges.',
  },
  {
    id: 'modeling',
    label: 'Physics Model',
    content:
      'Each interior point has three forces acting on it: electrostatic repulsion from the boundary, spring tension pulling it toward equal edge lengths with its neighbors, and a resistance term so the system actually converges instead of oscillating forever.',
  },
  {
    id: 'implementation',
    label: 'Implementation',
    content:
      'Differential equations solved numerically in VB.NET with Euler\'s first-order method and zero initial velocity. MATLAB handles the visualization side: we output mesh snapshots at each time step to show how the triangulation converges.',
  },
  {
    id: 'results',
    label: 'Results',
    content:
      'Ran tests on rectangular, triangular, and L-shaped regions with 2 to 6 interior points. Interior points consistently converged toward equilateral configurations. The engine also works on time-evolving shapes where the boundary itself changes.',
  },
  {
    id: 'future',
    label: 'Future Work',
    content:
      'The next step is localization: letting subregions resolve at higher resolution when more detail is needed there. Right now all interior points move with the same granularity, which is not ideal for engineering sims with stress concentrations.',
  },
];

interface SlideViewerProps {
  slides: typeof remeshingSlides;
  accentColor: 'blue' | 'purple';
}

function SlideViewer({ slides, accentColor }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);

  const bg =
    accentColor === 'blue'
      ? 'from-blue-900 via-blue-800 to-blue-700'
      : 'from-primary-900 via-primary-800 to-accent-800';

  return (
    <div className="w-full">
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${bg} p-8 min-h-[260px] flex flex-col justify-between shadow-xl`}>
        {/* Slide number */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase">
            {slides[current].label}
          </span>
          <span className="text-white/40 text-xs font-mono">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="text-white/90 text-base leading-relaxed flex-1"
          >
            {slides[current].content}
          </motion.p>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((c) => Math.min(slides.length - 1, c + 1))}
            disabled={current === slides.length - 1}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tab strip */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              i === current
                ? 'bg-primary-600 text-white shadow'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface PdfViewerProps {
  src: string;
}

function PdfViewer({ src }: PdfViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
              <path d="M8 12h2v6H8zm3 2h2v4h-2zm3-1h2v5h-2z" opacity=".5"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Research Poster</p>
            <p className="text-xs text-gray-500">IVC Honors Program, 2025</p>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2"
          >
            <iframe
              src={src}
              className="w-full rounded-xl border border-gray-200 shadow-inner"
              style={{ height: '700px' }}
              title="AI in Anesthesiology Research Poster"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const papers = [
  {
    number: '01',
    title: 'The Implementation of AI in the Field of Anesthesiology',
    authors: 'Emmanuel Hernandez · Hinanui Swider',
    institution: 'Irvine Valley College, Honors Program',
    mentor: 'Mentor: Prof. Kristen Skjonsby',
    year: '2025',
    venue: 'IVC Honors Research',
    tech: ['Python', 'ChatGPT (GPT-4)', 'Data Visualization'],
    problem:
      'Getting anesthesia dosage wrong is catastrophic either way. Too little and a patient can wake up mid-surgery; too much and you risk respiratory failure. Anesthesiologists factor in weight, height, age, comorbidities, surgery type, and medication history all at once. We wanted to see how close a large language model could get, and what it would miss.',
    approach:
      'We gave GPT-4 10 real patient profiles and told it to act as an anesthesiologist: output a recommended dosage and flag any risks. Then we compared every prediction against what the head anesthesiologist in Kauai, HI actually charted for the same patients.',
    findings: [
      'AI agreed on major risk categories but named them broadly; doctors flagged specific conditions like "aspiration risk" for individual patients',
      'ChatGPT recommended lower doses across the board, especially for Fentanyl and Propofol',
      'For complex patients with multiple comorbidities, AI was more cautious than clinical judgment warranted',
      'Best use case is first-pass monitoring and documentation, not replacing surgical decision-making',
    ],
    slides: anesthesiologySlides,
    sliderAccent: 'purple' as const,
    documents: [
      { label: 'Download Poster (PDF)', href: '/research/ai-anesthesiology.pdf', icon: 'pdf' },
    ],
    pdfSrc: '/research/ai-anesthesiology.pdf',
  },
  {
    number: '02',
    title: 'Triangle Mesh Renormalization Using Physical Principles',
    authors: 'Emmanuel Hernandez · Colin Minhquan Pham',
    institution: 'Irvine Valley College, Department of Mathematics',
    mentor: 'Mentor: Lan Pham',
    year: '2025',
    venue: 'Bay Honors Symposium (UC Berkeley)',
    tech: ['C++', 'VB.NET', 'MATLAB'],
    problem:
      '3D objects in simulations and games are made of triangles. When a shape changes over time, those triangles have to update too. The problem is that moving one interior vertex to fix a bad triangle shifts every triangle connected to it. Standard geometric algorithms handle this badly. We wanted to try a physics-based approach where the mesh finds a good configuration on its own.',
    approach:
      'We modeled each interior vertex as a point mass connected to its neighbors by springs, with virtual charged particles along the boundary keeping points from escaping. The system evolves by applying Newton\'s 2nd law as a 2nd-order ODE, stepped with Euler\'s method. Code in VB.NET, visualization in MATLAB.',
    findings: [
      'Interior points converge toward equilateral configurations under spring and damping forces',
      'Electrostatic boundary repulsion kept 95%+ of interior points inside the region across all test geometries',
      'Tested on rectangles, triangles, L-shapes, and time-evolving shapes where the boundary changes mid-simulation',
      'Presented at the Bay Honors Symposium at UC Berkeley',
    ],
    slides: remeshingSlides,
    sliderAccent: 'blue' as const,
    documents: [
      { label: 'Download Slides (PPTX)', href: '/research/remeshing-presentation.pptx', icon: 'pptx' },
      { label: 'Download Abstract (DOCX)', href: '/research/remeshing-abstract.docx', icon: 'docx' },
    ],
    pdfSrc: null,
  },
];

function DocIcon({ type }: { type: string }) {
  if (type === 'pdf') {
    return (
      <div className="w-8 h-8 rounded-md bg-red-100 flex items-center justify-center flex-shrink-0">
        <span className="text-red-600 text-xs font-bold">PDF</span>
      </div>
    );
  }
  if (type === 'pptx') {
    return (
      <div className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center flex-shrink-0">
        <span className="text-orange-600 text-xs font-bold">PPT</span>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
      <span className="text-blue-600 text-xs font-bold">DOC</span>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gray-950 pt-32 pb-24 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-600/15 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-primary-400 text-sm font-mono tracking-widest uppercase mb-4">
              Academic Research
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Research
            </h1>
            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              Two research projects: AI in high-stakes medical decision-making, and
              physics-based algorithms for 3D graphics. Both presented at undergraduate
              research conferences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Papers */}
      <div className="bg-white">
        {papers.map((paper, idx) => (
          <section
            key={paper.number}
            className={`py-24 ${idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Paper header */}
                <div className="flex items-start gap-6 mb-12">
                  <span className="text-7xl font-display font-bold text-gray-100 select-none leading-none mt-1 hidden md:block">
                    {paper.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs font-medium px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                        {paper.venue}
                      </span>
                      <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {paper.year}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2 leading-tight">
                      {paper.title}
                    </h2>
                    <p className="text-gray-500 text-sm">{paper.authors}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{paper.institution} &mdash; {paper.mentor}</p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {paper.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 bg-white border border-gray-200 text-gray-600 rounded-md font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main content grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left: problem / approach / findings */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">
                        The Problem
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{paper.problem}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">
                        What We Did
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{paper.approach}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">
                        Key Findings
                      </h3>
                      <ul className="space-y-2.5">
                        {paper.findings.map((f, i) => (
                          <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: slide viewer + documents */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-4">
                        Research Summary
                      </h3>
                      <SlideViewer slides={paper.slides} accentColor={paper.sliderAccent} />
                    </div>

                    {/* PDF viewer (anesthesiology only) */}
                    {paper.pdfSrc && (
                      <div>
                        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-4">
                          Full Poster
                        </h3>
                        <PdfViewer src={paper.pdfSrc} />
                      </div>
                    )}

                    {/* Downloads */}
                    <div>
                      <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-4">
                        Documents
                      </h3>
                      <div className="space-y-2">
                        {paper.documents.map((doc) => (
                          <a
                            key={doc.href}
                            href={doc.href}
                            download
                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all group"
                          >
                            <DocIcon type={doc.icon} />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                              {doc.label}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary-500 transition-colors"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-950 to-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Interested in collaborating?
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Looking for research opportunities across CS, healthcare, and graphics.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-900/50 transition-all hover:scale-105"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
