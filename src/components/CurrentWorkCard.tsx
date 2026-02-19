'use client';

import { motion } from 'framer-motion';
import { CurrentWorkItem } from '@/lib/data';

interface CurrentWorkCardProps {
  item: CurrentWorkItem;
  index: number;
}

export default function CurrentWorkCard({ item, index }: CurrentWorkCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-display font-bold text-gray-900">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            {item.type}
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            What I&apos;m Building
          </p>
          <ul className="space-y-1.5">
            {item.building.map((bullet, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-600 flex items-start gap-2"
              >
                <span
                  className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-1.5 shrink-0"
                  aria-hidden
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
