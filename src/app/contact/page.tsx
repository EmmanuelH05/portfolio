'use client';

import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

export default function Contact() {
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
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? I&apos;d love to hear from you!
          </p>
        </motion.div>

        {/* Contact Form Section */}
        <ContactForm />
      </div>
    </div>
  );
}
