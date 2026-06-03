'use client';

// Portfolio home page
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import CurrentWorkCard from '@/components/CurrentWorkCard';
import SkillsGrid from '@/components/SkillsGrid';
import { researchProjects, currentWork } from '@/lib/data';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const featuredProjects = researchProjects.slice(0, 2);

  return (
    <>
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Currently Working On */}
      <section className="py-20 bg-gray-50" aria-labelledby="current-work-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              id="current-work-heading"
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
            >
              Currently Working On
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {currentWork.map((item, index) => (
              <CurrentWorkCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsGrid />
        </div>
      </section>
    </>
  );
}
