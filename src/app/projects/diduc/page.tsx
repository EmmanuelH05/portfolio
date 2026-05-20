'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const screens = [
  {
    id: 'home',
    label: 'Events Feed',
    src: '/diduc/home.png',
    description: 'Your events in one place. Search, browse, and see who\'s attending at a glance.',
  },
  {
    id: 'event',
    label: 'Event Detail',
    src: '/diduc/event-detail.png',
    description: 'Every photo, every member, and every moment from the event all in one screen.',
  },
  {
    id: 'create',
    label: 'Create Event',
    src: '/diduc/create.png',
    description: 'Name it, describe it, drop a pin, pick a date. Share the join code and you\'re done.',
  },
  {
    id: 'profile',
    label: 'Profile',
    src: '/diduc/profile.png',
    description: 'Your gallery across every event you\'ve been part of.',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    src: '/diduc/notifications.png',
    description: 'Event invites and updates land here.',
  },
  {
    id: 'settings',
    label: 'Settings',
    src: '/diduc/settings.png',
    description: 'Edit profile, log out, or delete your account.',
  },
];

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Event Management',
    desc: 'Create events with name, description, location, and date. Share a generated join code with friends.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Shared Photo Gallery',
    desc: 'Everyone at the event can upload photos. Each one is attributed to the person who took it.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Join via Code',
    desc: 'No invite links or permissions. Share the code, enter it, you\'re in the event.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Personal Gallery',
    desc: 'Your profile aggregates every photo you\'ve uploaded across all your events.',
  },
];

const stack = [
  { label: 'React Native', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { label: 'Expo', color: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
  { label: 'TypeScript', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { label: 'Express', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { label: 'MongoDB', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { label: 'Firebase', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
];

export default function DIDUCPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-600/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <Link
              href="/projects"
              className="text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Projects
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-sm text-white/60">DIDUC</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  Mobile App
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                  UCLA CS 35L, Fall 2025
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                DIDUC
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                A shared photo album app for events. You create an event, share a
                code, and everyone who joins can upload photos that live in one place.
                Built with a team of 5 as a class project for UCLA CS 35L.
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-10">
                {stack.map((s) => (
                  <span
                    key={s.label}
                    className={`text-xs font-mono px-3 py-1.5 rounded-md border ${s.color}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href="https://github.com/EmmanuelH05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </motion.div>

            {/* Phone mockup - hero video */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <PhoneVideo src="/diduc/demo.mp4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full video section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-pink-400 tracking-widest uppercase">
              Demo Walkthrough
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              See it in action
            </h2>
            <p className="text-white/50 mt-2 text-sm">
              Recorded live on iPhone 17 Pro simulator. Events feed, event detail, create flow, and profile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {/* Wide cinematic phone + video */}
            <div className="relative">
              {/* Ambient glow */}
              <div className="absolute -inset-8 bg-pink-500/10 rounded-full blur-3xl" />
              <div className="relative w-[320px] md:w-[380px]">
                <div className="relative rounded-[48px] overflow-hidden border-2 border-white/10 bg-gray-900 shadow-2xl shadow-black/60">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gray-950 rounded-b-2xl z-10" />
                  <video
                    src="/diduc/demo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full block"
                    style={{ aspectRatio: '390/844' }}
                  />
                  {/* Screen sheen */}
                  <div className="absolute inset-0 rounded-[46px] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Side buttons */}
                <div className="absolute right-0 top-28 w-1.5 h-12 bg-white/10 rounded-l-full" />
                <div className="absolute left-0 top-24 w-1.5 h-8 bg-white/10 rounded-r-full" />
                <div className="absolute left-0 top-36 w-1.5 h-8 bg-white/10 rounded-r-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screen gallery */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-pink-400 tracking-widest uppercase">
              Live Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Every screen, running on device
            </h2>
            <p className="text-white/50 mt-2 text-sm">
              Captured from an iPhone 17 Pro simulator on the demo branch.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Big phone */}
            <div className="flex justify-center lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <PhoneMockup
                    src={screens[active].src}
                    alt={screens[active].label}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Screen selector */}
            <div className="space-y-3">
              {screens.map((screen, i) => (
                <motion.button
                  key={screen.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex gap-4 items-start ${
                    i === active
                      ? 'bg-white/8 border-white/20 shadow-lg shadow-black/30'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-10 h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 relative">
                    <Image
                      src={screen.src}
                      alt={screen.label}
                      fill
                      className="object-cover object-top"
                      sizes="40px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-mono ${i === active ? 'text-pink-400' : 'text-white/30'}`}>
                        0{i + 1}
                      </span>
                      <span className={`text-sm font-semibold ${i === active ? 'text-white' : 'text-white/60'}`}>
                        {screen.label}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      {screen.description}
                    </p>
                  </div>

                  {i === active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-pink-400 tracking-widest uppercase">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              What it does
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/5 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My role */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-mono text-pink-400 tracking-widest uppercase">
                My Contribution
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-8">
                What I built
              </h2>

              <div className="space-y-4">
                {[
                  'Designed and wired backend API routes for auth, events, photos, and user sessions using Express and MongoDB.',
                  'Built the data models and schemas, then kept them in sync with the frontend as requirements changed mid-project.',
                  'Contributed shared React Native components (cards, forms, layout) so screens stayed visually consistent across the team.',
                  'Migrated key storage to Firebase when our deployment needs shifted later in the quarter.',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex gap-3 text-white/70 text-sm leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back / Next */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Projects
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-pink-900/40 transition-all hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

function PhoneVideo({ src }: { src: string }) {
  return (
    <div className="relative w-[240px] h-[500px]">
      <div className="absolute inset-4 bg-pink-500/10 rounded-[44px] blur-2xl" />
      <div className="relative w-full h-full rounded-[44px] bg-gray-900 border-2 border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-950 rounded-b-2xl z-10" />
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="absolute right-0 top-24 w-1 h-10 bg-white/10 rounded-l-full" />
      <div className="absolute left-0 top-20 w-1 h-7 bg-white/10 rounded-r-full" />
      <div className="absolute left-0 top-30 w-1 h-7 bg-white/10 rounded-r-full" />
    </div>
  );
}

function PhoneMockup({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative w-[240px] h-[500px]">
      {/* Glow */}
      <div className="absolute inset-4 bg-pink-500/10 rounded-[44px] blur-2xl" />

      {/* Phone shell */}
      <div className="relative w-full h-full rounded-[44px] bg-gray-900 border-2 border-white/10 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-950 rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="absolute inset-0 overflow-hidden rounded-[42px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="240px"
            priority={priority}
          />
        </div>

        {/* Subtle screen reflection */}
        <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Side buttons */}
      <div className="absolute right-0 top-24 w-1 h-10 bg-white/10 rounded-l-full" />
      <div className="absolute left-0 top-20 w-1 h-7 bg-white/10 rounded-r-full" />
      <div className="absolute left-0 top-30 w-1 h-7 bg-white/10 rounded-r-full" />
    </div>
  );
}
