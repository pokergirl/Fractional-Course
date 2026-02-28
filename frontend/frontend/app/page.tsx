"use client";

import React from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import ValueProp from '@/components/value-prop';
import Bio from '@/components/bio';
import TargetAudience from '@/components/target-audience';
import Curriculum from '@/components/curriculum';
import Testimonials from '@/components/testimonials';
import LightningLessons from '@/components/lightning-lessons';
import SignupForm from '@/components/signup-form';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <ValueProp />
      <Bio />
      <TargetAudience />
      <Curriculum />
      <Testimonials />
      <SignupForm />
      <LightningLessons />
      <Footer />
    </main>
  );
}

