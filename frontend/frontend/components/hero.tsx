"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/button';
import { ArrowRight, Video, Clock, Users } from 'lucide-react';

const Hero = () => {
  const scrollToSignup = () => {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-[#0B1120] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-10">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 max-w-5xl tracking-tight leading-[1.1]"
        >
          Build a Fractional Consulting Practice
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-blue-200 mb-4 block">
            Future-Proof Your Career
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl leading-relaxed font-light">
            Learn how to package your expertise, land high-value clients, and build a flexible, resilient career beyond the traditional 9-5.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" onClick={scrollToSignup} className="bg-white text-slate-900 hover:bg-blue-50 border-none font-semibold">
            Join the Cohort
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the Syllabus
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-400" />
            <span>Live Instruction</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Office Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Join our Community</span>
          </div>
        </motion.div>
      </div>

      {/* Blue Stripe Pattern at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 flex flex-col justify-end">
        <div className="w-full h-[1px] bg-blue-600/20 mb-1" />
        <div className="w-full h-[1px] bg-blue-600/30 mb-1" />
        <div className="w-full h-[2px] bg-blue-600/40 mb-1" />
        <div className="w-full h-[2px] bg-blue-600/50 mb-1" />
        <div className="w-full h-[3px] bg-blue-600/60 mb-1" />
        <div className="w-full h-[4px] bg-blue-600/70 mb-1" />
        <div className="w-full h-[6px] bg-blue-600/80" />
      </div>
    </section>
  );
};

export default Hero;
