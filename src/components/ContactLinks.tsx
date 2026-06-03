'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

function formatUsPhoneDisplay(raw: string) {
  const d = raw.replace(/\D/g, '');
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return raw;
}

export default function ContactLinks() {
  const phoneDigits = personalInfo.phone.replace(/\D/g, '');
  const telHref =
    phoneDigits.length === 10 ? `tel:+1${phoneDigits}` : `tel:${personalInfo.phone}`;
  const phoneLabel = formatUsPhoneDisplay(personalInfo.phone);

  const contactMethods = [
    {
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: phoneLabel,
      href: telHref,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: personalInfo.linkedin,
      href: `https://${personalInfo.linkedin}`,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.label}
            href={method.href}
            target={method.href.startsWith('http') ? '_blank' : undefined}
            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 group"
          >
            <div className="text-primary-600 group-hover:text-primary-700 transition-colors shrink-0">
              {method.icon}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-sm text-gray-500">{method.label}</p>
              <p className="text-gray-900 font-medium break-all">{method.value}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
