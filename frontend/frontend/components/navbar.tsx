"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0B1120]/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-[#0B1120] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* NextStep Logo Style */}
          <span className="text-2xl font-serif font-bold text-white tracking-tight leading-none lowercase">
            nextstep
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('curriculum')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
            Curriculum
          </button>
          <button onClick={() => scrollToSection('instructor')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
            Instructors
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
            Testimonials
          </button>
          <Button onClick={() => scrollToSection('signup')} size="sm" variant="outline" className="border-white/20 hover:bg-white hover:text-slate-900">
            Join the Cohort
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B1120] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <button onClick={() => scrollToSection('curriculum')} className="text-left text-slate-300 hover:text-white py-2">
                Curriculum
              </button>
              <button onClick={() => scrollToSection('instructor')} className="text-left text-slate-300 hover:text-white py-2">
                Instructors
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left text-slate-300 hover:text-white py-2">
                Testimonials
              </button>
              <Button onClick={() => scrollToSection('signup')} className="w-full" variant="secondary">
                Join the Cohort
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

