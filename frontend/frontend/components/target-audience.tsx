"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/card';
import { Briefcase, Compass, Rocket } from 'lucide-react';

const TargetAudience = () => {
  const audiences = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Experienced operators seeking more freedom and impact",
      description: "Monetize your expertise and create income beyond your 9–5."
    },
    {
      icon: <Compass className="w-8 h-8 text-blue-600" />,
      title: "Senior leaders at a career inflection point",
      description: "Explore whether fractional work fits your goals and next chapter."
    },
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "New or early-stage fractionals",
      description: "Launch and grow your practice with clarity, proven playbooks, and momentum."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
          >
            Who this program is for
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-8 flex flex-col items-start text-left bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="p-3 rounded-xl bg-slate-50 shadow-sm border border-slate-100 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

