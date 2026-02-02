'use client';

import { motion } from 'framer-motion';
import { technicalSkills } from '@/lib/data';

export default function SkillsGrid() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 text-center">
        Technical Skills
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {technicalSkills.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-200">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-50 to-accent-50 text-gray-700 rounded-lg text-sm font-medium hover:from-primary-100 hover:to-accent-100 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
