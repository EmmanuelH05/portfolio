'use client';

import { motion } from 'framer-motion';
import { WorkExperience, Volunteering } from '@/lib/data';

interface ExperienceTimelineProps {
  experiences: (WorkExperience | Volunteering)[];
  title: string;
}

export default function ExperienceTimeline({ experiences, title }: ExperienceTimelineProps) {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
        {title}
      </h2>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-accent-300" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline Dot */}
              <div className="absolute left-2 md:left-6 top-2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg" />

              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.title || (exp as Volunteering).role}
                    </h3>
                    <p className="text-lg text-primary-600 font-medium mt-1">
                      {exp.company || (exp as Volunteering).organization}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{exp.location}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600 mt-2 md:mt-0">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>

                <ul className="space-y-2 mt-4">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start">
                      <span className="text-primary-500 mr-2 mt-1.5">▸</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
