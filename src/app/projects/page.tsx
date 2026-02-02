'use client';

import ProjectCard from '@/components/ProjectCard';
import { researchProjects } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Research Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exploring innovative solutions at the intersection of computer science, graphics, 
            and healthcare through hands-on research and development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Interested in Collaborating?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new research opportunities, innovative projects, 
            or creative collaborations. Let's build something amazing together!
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
