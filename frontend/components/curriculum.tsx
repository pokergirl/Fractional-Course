"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const sessions = [
  {
    id: 1,
    title: "Clarify Your Positioning & Foundation",
    theme: "Know what you do, who it’s for, and why it matters",
    description: "You’ll lay the groundwork for your fractional practice by sharpening your point of view and defining an offer clients actually understand and want.",
    topics: [
      "Clarify your positioning based on your strengths, experience, and interests",
      "Identify your ideal client and the problems they’re willing to pay to solve",
      "Define a focused initial offer and service menu",
      "Draft a polished one-pager you can immediately use in conversations"
    ],
    liveElements: [
      "Positioning & Offer Design Workshop",
      "Optional small-group coaching",
      "Group discussion + live Q&A"
    ]
  },
  {
    id: 2,
    title: "Activate Your Network & Build Early Momentum",
    theme: "Turn relationships into real opportunities",
    description: "This week focuses on how experienced operators actually get hired, without cold outreach or awkward selling.",
    topics: [
      "Activate your existing network in an authentic, relationship-first way",
      "Design a simple outreach strategy that leads to real conversations",
      "Run effective networking and discovery calls",
      "Set up a lightweight CRM to track leads and follow-ups"
    ],
    liveElements: [
      "Relationship-Driven Sales & Pipeline Workshop",
      "Optional 1:1 or small-group coaching",
      "Group discussion + live Q&A"
    ]
  },
  {
    id: 3,
    title: "Price, Scope & Close with Confidence",
    theme: "Get paid well and protect your time",
    description: "You’ll remove the guesswork around pricing and scoping so you can move from conversations to signed work with clarity and confidence.",
    topics: [
      "Choose the right pricing model (hourly, retainer, project-based)",
      "Set pricing that reflects your experience and goals",
      "Structure scopes that avoid underpricing and scope creep",
      "Lead sales conversations that build trust and close"
    ],
    liveElements: [
      "Pricing, Scoping & Sales Workshop",
      "Optional coaching sessions",
      "Group discussion + live Q&A"
    ]
  },
  {
    id: 4,
    title: "Build Your Fractional Operating System",
    theme: "Move from “freelancer” to sustainable business",
    description: "The final week is about setting yourself up to run a real practice, not just land one-off work.",
    topics: [
      "Set up the core systems to run your fractional business smoothly",
      "Understand legal, tax, insurance, and business-structure basics",
      "Create your personal Fractional Operating System",
      "Define a clear 30-day action plan to maintain momentum after the program"
    ],
    liveElements: [
      "From Operator to Business Owner Workshop",
      "Final AMA + course wrap-up"
    ]
  }
];

const Curriculum = () => {
  const [openSession, setOpenSession] = useState<number | null>(1);

  const toggleSession = (id: number) => {
    setOpenSession(openSession === id ? null : id);
  };

  return (
    <section id="curriculum" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4"
          >
            Course Syllabus: <span className="text-blue-700">3-Week Live Program</span> + Weekly Office Hours
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            A structured, high-intensity program designed to get you from idea to first clients.
          </motion.p>
        </div>

        <div className="space-y-4">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                onClick={() => toggleSession(session.id)}
                className={cn(
                  "group cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden",
                  openSession === session.id 
                    ? "bg-white border-blue-600 shadow-md" 
                    : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm"
                )}
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "flex flex-col items-center justify-center w-16 h-16 rounded-lg border transition-colors shrink-0",
                      openSession === session.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200"
                    )}>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Module</span>
                      <span className="text-2xl font-bold leading-none">{session.id}</span>
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold transition-colors",
                        openSession === session.id ? "text-slate-900" : "text-slate-700"
                      )}>
                        {session.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        Theme: {session.theme}
                      </p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "text-slate-400 transition-transform duration-300 shrink-0 ml-4",
                      openSession === session.id ? "rotate-180 text-blue-600" : ""
                    )} 
                  />
                </div>

                <AnimatePresence>
                  {openSession === session.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-8 pt-0 pl-6 md:pl-[5.5rem]">
                        <div className="h-px w-full bg-slate-100 mb-6" />
                        
                        <div className="mb-6">
                          <p className="text-slate-700 italic leading-relaxed">
                            "{session.description}"
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <BookOpen size={18} className="text-blue-600" />
                              <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">You'll Learn How To:</span>
                            </div>
                            <ul className="space-y-2">
                              {session.topics.map((topic, i) => (
                                <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Users size={18} className="text-purple-600" />
                              <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">Live Elements:</span>
                            </div>
                            <ul className="space-y-2">
                              {session.liveElements.map((element, i) => (
                                <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                                  <Sparkles size={14} className="text-purple-400 mt-0.5 shrink-0" />
                                  <span>{element}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;

