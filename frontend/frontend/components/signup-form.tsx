"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/button';
import Card from './ui/card';
import { Check, Lock, CreditCard, ShieldCheck, Calendar, Timer } from 'lucide-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.linkedin) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      // Call backend API to create signup and get Stripe checkout URL
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create signup');
      }

      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section id="signup" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Value Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Your Next Step <br /> <span className="text-blue-700">Starts Here</span>
            </h2>
            

            {/* Cohort Schedule Block */}
            <div className="mb-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Spring Cohort Schedule</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">9 live sessions across 3 weeks</p>
                  <p className="text-gray-600">May 4 – May 22</p>
                </div>
                
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex gap-2">
                    <span className="font-medium min-w-[60px]">Week 1:</span>
                    <span>May 4, May 6, May 8</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium min-w-[60px]">Week 2:</span>
                    <span>May 11, May 13, May 15</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium min-w-[60px]">Week 3:</span>
                    <span>May 18, May 20, May 22</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <p className="text-xs text-slate-500 font-medium">
                    Live instruction • small group breakouts • office hours
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50/40 to-transparent pointer-events-none rounded-r-2xl"></div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Full Program Access
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Includes all live sessions, templates, recordings, and office hours.
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Early Bird
                </span>
                <div className="mt-2 text-4xl font-bold text-slate-900">
                  $795
                </div>
                <div className="text-sm text-slate-400 line-through">
                  $1,295 regular price
                </div>
                <div className="mt-1 text-sm font-medium text-blue-600">
                  Ends March 31
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-slate-200 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Join the Next Cohort</h3>
                <p className="text-slate-500 text-sm">Cohort will begin, Monday, May 4. Enrollment is capped to 15 participants.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full mt-4" 
                  size="lg"
                  isLoading={isLoading}
                >
                  Secure My Spot <CreditCard className="ml-2 w-4 h-4" />
                </Button>

                <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-xs">
                  <Lock size={12} />
                  <span>Secure payment via Stripe</span>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;

