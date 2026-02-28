"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Aaron Lieberman",
    role: "Founder & CEO",
    company: "Buzze",
    image: "/aaron-lieberman.jpeg",
    quote: "NextStep has been invaluable thought partners. Ha has an extraordinary network and made key intros to investors and experts. Garrett expedited our time-to-market by clarifying strategy, targets, and operating discipline. They are a world-class combo and I give them my highest endorsement."
  },
  {
    id: 2,
    name: "Audrey Wisch",
    role: "Co-Founder and CEO",
    company: "Curious Cardinals",
    image: "/audrey-wisch.jpeg",
    quote: "I’m so grateful to work with Ha and Garrett. They perfectly balance high-level strategic guidance with tactical advice, allowing us to drive implementation with rapid speed. I admire their ability to provide strategic guidance while rolling their sleeves up and getting in the weeds with us!"
  },
  {
    id: 3,
    name: "David Wei",
    role: "VP of Operations and Finance",
    company: "SolarKal",
    image: "/david wei.jpeg",
    quote: "Working with Garrett and Ha was an accelerant for our business! It was invaluable to have someone with their direct operational experience to develop our operations and elevate our team’s capabilities. Garrett scaled his knowledge of our business in record time, contributing from macro strategy to micro process protocols."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#F8F9FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-6"
          >
            Built from real client work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            This program is grounded in years of fractional, advisory, and coaching engagements. The playbooks you’ll learn are the same ones we use to win work and deliver real results. The feedback below comes from clients, not a classroom.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                className="flex flex-col h-full border-none shadow-lg bg-white p-8 items-center text-center"
              >
                <div className="w-20 h-20 mb-6 relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-sm"
                  />
                </div>
                
                <div className="mb-6 text-blue-100">
                  <Quote size={40} className="fill-current" />
                </div>
                
                <p className="text-slate-600 mb-8 flex-grow leading-relaxed font-serif text-sm md:text-base">
                  "{testimonial.quote}"
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100 w-full">
                  <h4 className="text-slate-900 font-bold text-base font-serif">{testimonial.name}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mt-1">{testimonial.role}</p>
                  <p className="text-blue-600 text-xs font-medium mt-1">{testimonial.company}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

