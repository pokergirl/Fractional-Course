"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/card';
import { Linkedin } from 'lucide-react';

const Bio = () => {
  return (
    <section id="instructor" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
          >
            Meet your Instructors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed font-serif"
          >
            After years of real client work across fractional, advisory, and coaching roles, we created this program to share the playbooks, tools, and guidance we wish we’d had when we began.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Garrett Kelly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full p-10 flex flex-col items-center text-center bg-white border-none shadow-xl shadow-slate-200/50 rounded-2xl">
              <div className="w-48 h-48 mb-8 relative">
                <img 
                  src="/garrett-kelly.jpg" 
                  alt="Garrett Kelly" 
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Garrett Kelly</h3>
              <p className="text-slate-400 font-serif italic mb-6">Founder & Managing Partner</p>
              
              <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base font-serif">
                Garrett specializes in strategy, operations, people, and risk. As the Head of Operations at Swimply he led CS, TNS, and Insurance while establishing OKRs, KPIs, core values, performance management, and roadmap prioritization. At AirBnB, Garrett led a 500+ ops team's product, process, and people strategies.
              </p>
              
              <a 
                href="https://www.linkedin.com/in/garrett-kelly-pdx/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-auto text-rose-400 hover:text-rose-500 transition-colors"
              >
                <Linkedin size={24} fill="currentColor" className="stroke-none" />
              </a>
            </Card>
          </motion.div>

          {/* Ha Nguyen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full p-10 flex flex-col items-center text-center bg-white border-none shadow-xl shadow-slate-200/50 rounded-2xl">
              <div className="w-48 h-48 mb-8 relative">
                <img 
                  src="/ha-nguyen.jpg" 
                  alt="Ha Nguyen" 
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Ha Nguyen</h3>
              <p className="text-slate-400 font-serif italic mb-6">Founder & Managing Partner</p>
              
              <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base font-serif">
                Ha has 25 years of deep expertise in building and scaling startups and venture investing. Ha was most recently the Chief Experiences Officer at Swimply and a Founding Partner of Spero Ventures. Ha also has 16 years of product leadership experience, having started her early career as a PM at eBay.
              </p>
              
              <a 
                href="https://www.linkedin.com/in/hanguyen-spero/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-auto text-rose-400 hover:text-rose-500 transition-colors"
              >
                <Linkedin size={24} fill="currentColor" className="stroke-none" />
              </a>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Bio;

