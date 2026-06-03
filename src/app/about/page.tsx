'use client';

import { education, additionalResumeInfo } from '@/lib/data';
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
            I&apos;m pursuing a B.A. in Computer Science & Linguistics at UCLA (expected June 2027, GPA
            3.5). Most days I&apos;m writing full-stack and mobile code: React Native at We Explore Earth,
            co-founding Rise the Fenua, and building civic tech with LA Blueprint. Side projects like SwipeBite
            are where I try out ideas without a deadline breathing down my neck.
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
                    {edu.startDate && edu.endDate
                      ? `${edu.startDate} - ${edu.endDate}`
                      : edu.endDate || edu.startDate}
                  </span>
                </div>
              </div>
              {edu.gpa && (
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold text-gray-900">GPA: </span>
                  {edu.gpa}
                </p>
              )}
              {edu.relevantCoursework && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Relevant Coursework</p>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {edu.relevantCoursework}
                  </p>
                </div>
              )}
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
                At UCLA I stack CS fundamentals (data structures, systems, databases, math) next to linguistics,
                which weirdly helps when I&apos;m naming APIs, tightening UX copy, or arguing for simpler product
                behavior.
              </p>
              <p>
                Work-wise I&apos;ve shipped mobile and web for We Explore Earth, stood up nonprofit tooling as
                co-founder of Rise the Fenua, and did backend support at BID and Vectorly. With LA Blueprint I get
                to build real civic tech for nonprofits around Los Angeles, not toy demos.
              </p>
              <p>
                Away from the keyboard I tutor with School on Wheels, play double bass, and make music. That kind
                of slow, repetitive practice maps pretty cleanly onto how I like to engineer.
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
            Interests and Activities
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalResumeInfo.interestsAndActivities.map((interest, index) => (
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
          <p className="mt-8 text-gray-600 text-lg max-w-2xl mx-auto">
            <span className="font-semibold text-gray-900">Fun fact: </span>
            {additionalResumeInfo.funFact}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
