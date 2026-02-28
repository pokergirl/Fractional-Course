"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/card';
import { FileText, Play, ExternalLink } from 'lucide-react';

const resources = [
  {
    type: 'blog',
    title: "Fractional Executives: A Force Multiplier",
    description: "Why moving from 'employee' to 'business of one' changes everything about how you work.",
    link: "https://beyondleadership.substack.com/p/fractional-executives-a-force-multiplier",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    type: 'blog',
    title: "The Art of the Hustle",
    description: "A deep dive into why hourly billing traps you and how to structure value-based retainers.",
    link: "https://beyondleadership.substack.com/p/the-art-of-the-hustle",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    type: 'video',
    title: "Panel: Fractional Roundtable",
    description: "Ha Nguyen discusses the macro trends driving the fractional executive boom with industry leaders.",
    link: "https://youtu.be/lAaqU8a37KY?si=toUc43EweBaDd-eL",
    image: "https://img.youtube.com/vi/lAaqU8a37KY/maxresdefault.jpg"
  },
  {
    type: 'video',
    title: "Panel: The Journey to Fractional CPO",
    description: "Garrett Kelly shares his journey from full-time operator to managing multiple high-growth clients.",
    link: "https://youtu.be/j1wipq09mnI?si=jgrIzV-m_KuiFVCl",
    image: "https://img.youtube.com/vi/j1wipq09mnI/maxresdefault.jpg"
  }
];

const LightningLessons = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
          >
            Explore Our Thinking on <span className="text-blue-700">Fractional Work</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed space-y-4"
          >
            <p>
              Before building this program, we spent years doing the work and reflecting on it publicly. Below you’ll find blog posts, panels, and talks where we share lessons from our own fractional journey and what we’ve learned along the way.
            </p>
            <p>
              These resources are free, practical, and a great place to start if you’re exploring fractional work.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                <Card className="h-full p-0 overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        item.type === 'blog' 
                          ? 'bg-white text-blue-700' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {item.type === 'blog' ? <FileText size={12} /> : <Play size={12} />}
                        {item.type === 'blog' ? 'Read' : 'Watch'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {item.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium mt-auto">
                      {item.type === 'blog' ? 'Read Article' : 'Watch Video'}
                      <ExternalLink size={14} className="ml-1.5" />
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LightningLessons;

