'use client';

import { education } from '@/lib/data';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            I&apos;m a passionate full-stack developer and research enthusiast currently pursuing a 
            B.A. in Computer Science and Linguistics at UCLA. I love exploring the intersection 
            of technology, graphics, and healthcare through innovative projects.
          </p>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-display font-bold text-gray-900 mb-12 text-center"
        >
          Education
        </motion.h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-8 border border-gray-100 ${
                index % 2 === 0 ? 'md:mr-32' : 'md:ml-32'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {edu.institution}
                  </h3>
                  <p className="text-xl text-primary-600 font-medium">
                    {edu.degree}
                  </p>
                  <p className="text-gray-500 mt-1">{edu.location}</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 text-center mb-8">
              My Journey
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                My passion for technology began during my time at Irvine Valley College, where I 
                earned my Associates in Computer Science. This foundation sparked my interest in 
                exploring how computer science intersects with other fields, leading me to pursue 
                a unique interdisciplinary major in Computer Science and Linguistics at UCLA.
              </p>
              <p>
                Through my research projects, I&apos;ve had the opportunity to work on diverse problems—from 
                photorealistic graphics rendering using physics-based simulations to healthcare applications 
                in anesthesiology. Each project has taught me the importance of combining theoretical 
                knowledge with practical implementation.
              </p>
              <p>
                Currently, I&apos;m working as a Full-Stack Developer at LA Blueprint, where I collaborate 
                with a talented team to build platforms that make a real impact. I&apos;m also deeply committed 
                to giving back to communities through my volunteer work with School on Wheels and Rise the Fenua, 
                helping students access educational resources and opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-8">
            Interests
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Computer Graphics',
              'Machine Learning',
              'Healthcare Technology',
              'Natural Language Processing',
              'Software Engineering',
              'Research & Development',
            ].map((interest, index) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-6 py-3 bg-white rounded-full shadow-md text-gray-700 font-medium hover:shadow-lg transition-all"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
