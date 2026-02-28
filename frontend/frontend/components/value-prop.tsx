import React from 'react';
import { Brain, Target, Bird, TrendingUp, Building2, RefreshCw, Briefcase, ArrowRight } from 'lucide-react';

export default function ValueProp() {
  const benefits = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "High-Impact Work",
      description: "Solve the strategic problems founders and leadership teams actually care about."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Control Your Work",
      description: "Choose the clients, problems, and projects you want to work on."
    },
    {
      icon: <Bird className="w-8 h-8 text-blue-600" />,
      title: "Design Your Time",
      description: "Structure your work around your life—not the other way around."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Income That Scales",
      description: "Earn based on the value of your expertise—not your title or tenure."
    }
  ];

  return (
    <>
      <section className="relative overflow-hidden py-24">
        {/* Background: soft spotlight gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_20%,rgba(59,130,246,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(700px_500px_at_15%_85%,rgba(99,102,241,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(700px_500px_at_85%_85%,rgba(2,132,199,0.06),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Headline */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-widest text-slate-500">
                THE NEW CAREER PLAYBOOK
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Your job is no longer your career.
              <br />
              Your expertise is.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 text-center">
              The rules of work are changing. The operators who thrive will be the ones who build leverage with their expertise.
            </p>
          </div>

          {/* 3-column narrative */}
          <div className="relative mx-auto mt-12 max-w-6xl">
            {/* connector line behind cards */}
            <div className="absolute left-6 right-6 top-1/2 hidden -translate-y-1/2 md:block">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>

            <div className="relative grid gap-8 md:grid-cols-3">
              {/* OLD MODEL */}
              <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                <div className="mb-4 flex items-start justify-end">
                  <div />
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all duration-300 group-hover:bg-slate-100">
                    <Building2 className="h-5 w-5" />
                  </div>
                </div>
                
                <p className="text-xs font-semibold tracking-widest text-slate-500">
                  THE OLD MODEL
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  The Corporate Ladder
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-slate-400">•</span><span>One employer</span></li>
                  <li className="flex gap-2"><span className="text-slate-400">•</span><span>One income stream</span></li>
                  <li className="flex gap-2"><span className="text-slate-400">•</span><span>Progress tied to promotion cycles</span></li>
                </ul>
              </div>

              {/* WHAT'S CHANGING */}
              <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                <div className="mb-4 flex items-start justify-end">
                  <div />
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all duration-300 group-hover:bg-slate-100">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                </div>

                <p className="text-xs font-semibold tracking-widest text-slate-500">
                  WHAT’S CHANGING
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  The Nature of Work
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-slate-400">•</span><span>AI and automation accelerate change</span></li>
                  <li className="flex gap-2"><span className="text-slate-400">•</span><span>Roles evolve faster than org charts</span></li>
                  <li className="flex gap-2"><span className="text-slate-400">•</span><span>Skills must adapt continuously</span></li>
                </ul>
              </div>

              {/* NEW OPPORTUNITY */}
              <div className="group relative rounded-2xl border border-blue-200 bg-blue-50/30 p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />
                <div className="mb-4 flex items-start justify-end">
                  <div />
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-105">
                    <Briefcase className="h-5 w-5" />
                  </div>
                </div>

                <p className="text-xs font-semibold tracking-widest text-slate-500">
                  THE NEW OPPORTUNITY
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  The Portfolio Career
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-blue-500">•</span><span>Package your expertise into clear offers</span></li>
                  <li className="flex gap-2"><span className="text-blue-500">•</span><span>Solve high-value problems across companies</span></li>
                  <li className="flex gap-2"><span className="text-blue-500">•</span><span>Build multiple income streams and optionality</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fractional Works Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              What the portfolio career unlocks
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Work on higher-impact problems, control your time, and build income that grows with your expertise.
            </p>
          </div>

          {/* Existing 4 cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="h-full p-8 flex flex-col items-start text-left bg-white border border-slate-200 rounded-xl hover:border-blue-200 hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-slate-50 shadow-sm border border-slate-100 mb-6 group-hover:bg-blue-50/50 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
