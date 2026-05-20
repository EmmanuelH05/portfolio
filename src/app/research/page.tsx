'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const anesthesiologySlides = [
  {
    id: 'abstract',
    label: 'Abstract',
    content:
      'AI — specifically large language models like ChatGPT — has real potential in anesthesiology. We tested it against an actual anesthesiologist in Kauai, HI across 10 patient scenarios and measured how well its dosage and risk predictions held up.',
  },
  {
    id: 'method',
    label: 'Method',
    content:
      'Each patient came with weight, height, age, ethnicity, medical history, and surgery type. We prompted ChatGPT to act as an anesthesiologist and output dosage recommendations plus risk flags — then compared those against the specialist\'s actual chart notes.',
  },
  {
    id: 'results1',
    label: 'Results: Dosage',
    content:
      'ChatGPT consistently skewed conservative — recommending lower doses of Fentanyl and Propofol than the physicians did. For simpler patients this was fine; for complex cases with comorbidities, AI was more cautious than clinical judgment warranted.',
  },
  {
    id: 'results2',
    label: 'Results: Risk',
    content:
      'Both sources agreed on major risk categories (cardiovascular events, respiratory distress). Where they diverged: AI flagged broader systemic risks while anesthesiologists named specific, condition-level concerns — like "aspiration" for Patient 5 vs. a generic respiratory flag.',
  },
  {
    id: 'implications',
    label: 'Implications',
    content:
      'AI isn\'t replacing anesthesiologists. But it works well as a first-defense tool — catching patterns across large patient populations, reducing administrative overhead, and providing a sanity-check for dosage math. The cautious default is a feature in low-stakes monitoring, a risk in complex surgery.',
  },
  {
    id: 'future',
    label: 'Future Work',
    content:
      'Next step: prompt specialists from other fields (emergency medicine, cardiology) and compare how differently they assess the same patients. Also explore emergency-scenario performance, where fast and accurate dosage calculation under pressure is exactly where AI could matter most.',
  },
];

const remeshingSlides = [
  {
    id: 'title',
    label: 'Overview',
    content:
      'Triangle Mesh Renormalization Using Physical Principles. Presented at ROCCT 2018. Co-authored with Colin Minhquan Pham, mentored by Lan Pham, Dept. of Mathematics, Irvine Valley College.',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    content:
      'A novel methodology for mesh repair using physical forces: electrostatic repulsion keeps interior points inside the boundary, spring forces pull triangles toward equilateral, and damping prevents oscillation. The whole thing is solved as a 2nd-order ODE stepped with Euler\'s method.',
  },
  {
    id: 'problem',
    label: 'The Problem',
    content:
      'Triangulation is easy — remeshing is not. Moving one interior point to fix a distorted triangle cascades changes through every connected triangle. Geometric algorithms handle this awkwardly. We asked: what if the mesh could feel forces and settle into a good shape on its own?',
  },
  {
    id: 'electrostatic',
    label: 'Boundary Enforcement',
    content:
      'Virtual "charged" particles placed along the boundary repel interior points, keeping them inside the region. This is modeled after Coulomb\'s electrostatic law — same math as point charges, applied to vertex containment.',
  },
  {
    id: 'modeling',
    label: 'Physics Model',
    content:
      'Three forces act on each interior point: electrostatic repulsion from boundary charges, spring tension from edges connecting to neighbors (pulling toward equal-length), and a resistance term that damps motion so the system converges instead of oscillating.',
  },
  {
    id: 'implementation',
    label: 'Implementation',
    content:
      'The differential equations are solved numerically in VB.NET using Euler\'s first-order method, with zero initial-velocity conditions. MATLAB handles post-processing: we dump mesh snapshots per time step and visualize how the triangulation evolves toward equilibrium.',
  },
  {
    id: 'results',
    label: 'Results',
    content:
      'Tested on rectangular regions (2 interior pts), triangular regions (3 pts), and L-shaped regions (6 pts). Interior points reliably converge toward equilateral configurations. The engine also handles time-evolving shapes — remeshing updates as the boundary changes.',
  },
  {
    id: 'future',
    label: 'Future Work',
    content:
      'Add localization: finer meshes in small subregions that need more detail. The current approach moves all interior points uniformly — localization would let certain areas resolve at higher resolution, which matters a lot for engineering simulations with stress concentrations.',
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
            <p className="text-xs text-gray-500">IVC Honors Program — 2024</p>
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
    institution: 'Irvine Valley College — Honors Program',
    mentor: 'Mentor: Prof. Kristen Skjonsby',
    year: '2024',
    venue: 'IVC Honors Research',
    tech: ['Python', 'ChatGPT (GPT-4)', 'Data Visualization'],
    problem:
      'Anesthesia is one of the highest-stakes moments in any surgery. A wrong dose — too little and a patient wakes up mid-procedure, too much and you risk respiratory failure. Anesthesiologists synthesize age, weight, height, comorbidities, and surgery type in seconds. We wanted to know whether a large language model could do the same, and where it would break.',
    approach:
      'We ran 10 real patient profiles through ChatGPT, asking it to act as an anesthesiologist and output dosage recommendations plus risk flags. Then we compared every prediction against the actual clinical judgment of the head anesthesiologist in Kauai, HI.',
    findings: [
      'AI aligned on major risk categories (cardiovascular, respiratory) but named them more broadly than specialists did',
      'ChatGPT consistently recommended lower doses — conservative by default, which is both a safety feature and a clinical risk for complex cases',
      'Anesthesiologists gave more condition-specific risk assessments; AI generalized across patient types',
      'Strongest case for AI: first-defense monitoring and documentation automation, not replacing surgical judgment',
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
    institution: 'Irvine Valley College — Department of Mathematics',
    mentor: 'Mentor: Lan Pham',
    year: '2018 · 2024',
    venue: 'ROCCT 2018 · Bay Honors Symposium (UC Berkeley)',
    tech: ['C++', 'VB.NET', 'MATLAB'],
    problem:
      '3D objects in games, simulations, and engineering tools are made of triangles. When shapes change — liquid flowing, a robot transforming, a structural part deforming — those triangles have to update. The catch: moving one vertex to fix a distorted triangle shifts every triangle it touches. Geometric algorithms handle this but don\'t adapt well to physics-driven motion. We asked: what if the mesh could feel forces and find its own equilibrium?',
    approach:
      'We modeled each interior mesh vertex as a mass on springs, with virtual "charged" particles along the boundary repelling interior points inward via Coulomb\'s law. The whole system evolves by solving Newton\'s 2nd law as a 2nd-order ODE, stepped numerically with Euler\'s method. Implemented in VB.NET, visualized in MATLAB.',
    findings: [
      'Interior points converge reliably toward equilateral triangle configurations under spring-damping forces',
      'Electrostatic boundary repulsion keeps 95%+ of interior points inside test regions throughout the simulation',
      'Tested on 4 region geometries: rectangles, triangles, L-shapes, and time-evolving shapes',
      'Remeshing updates in real time as the boundary changes shape, not just at start state',
      'Presented at ROCCT 2018 and Bay Honors Symposium at UC Berkeley',
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
              Research &{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Publications
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              Two research threads: AI in high-stakes medical decision-making, and
              physics-based algorithms for 3D graphics. Both published and presented at
              undergraduate research conferences.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 mt-12"
          >
            {[
              { value: '2', label: 'Published Papers' },
              { value: '3+', label: 'Conferences' },
              { value: '2', label: 'Institutions' },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary-500 pl-4">
                <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
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
              I&apos;m actively looking for research opportunities at the intersection of CS,
              healthcare, and graphics.
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
