"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Mission = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-10 leading-tight"
          >
            Stop circling the idea. <br />
            <span className="text-blue-700">Start building your fractional practice.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8 text-lg md:text-xl text-slate-600 leading-relaxed"
          >
            <p>
              If you’re a seasoned operator considering fractional work but unsure how to begin, you’re not alone. You know how to lead teams and deliver results. <span className="text-slate-900 font-medium">Turning that experience into a real business is the part no one shows you.</span>
            </p>
            
            <div className="py-4">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                We built this program to remove the guesswork.
              </h3>
            </div>

            <p>
              After building and growing our own fractional and advisory practice, we distill what actually works into clear playbooks, practical tools, and real-world guidance to help you land clients and build a sustainable practice.
            </p>

            <p>
              Whether you’re going all-in, easing into fractional alongside your full-time role, or creating more optionality in your career, we’re here to help you move forward with clarity and confidence.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative bottom border/divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
};

export default Mission;

