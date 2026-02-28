"use client";

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <span className="text-lg font-serif font-bold text-white tracking-tight leading-none">
              FractionalPro
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Academy</span>
          </div>
          
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} FractionalPro Academy. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

