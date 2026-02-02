'use client';

import { motion } from 'framer-motion';
import { ResearchProject } from '@/lib/data';

interface ProjectCardProps {
  project: ResearchProject;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-gray-500 font-medium">
            {project.startDate} - {project.endDate}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {project.description.map((desc, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {desc}
            </p>
          ))}
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-2">Key Highlights:</p>
            <ul className="space-y-1">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-center">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
