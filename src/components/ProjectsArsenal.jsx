'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// ── Hardcoded project data — edit this array to update your portfolio ──
const PROJECTS = [
  {
    id: '1',
    title: 'Jasmin — Custom AI Assistant',
    description: 'A highly modular, localized Python/React orchestrator integrating advanced LLM reasoning, local vector search memory databases, and real-time audio pipeline streaming.',
    tech_stack: ['Python', 'React', 'FastAPI', 'Tailwind', 'VectorDB'],
    github_link: 'https://github.com/Vibhathcross',
    live_link: null,
  },
  {
    id: '2',
    title: 'Secure Access Gateway',
    description: 'Enterprise-grade microservice gateway designed with low-overhead C routing engines, JWT/OAuth validation proxies, and dynamic database pooling APIs.',
    tech_stack: ['C', 'PostgreSQL', 'Docker', 'Redis', 'Cryptography'],
    github_link: 'https://github.com/Vibhathcross',
    live_link: null,
  },
  {
    id: '3',
    title: 'AI Data Clustering Engine',
    description: 'High-performance clustering platform analyzing high-dimensional neural network embedding spaces using custom K-Means & DBScan implementations.',
    tech_stack: ['Python', 'Next.js', 'PyTorch', 'Data Science', 'Tailwind'],
    github_link: 'https://github.com/Vibhathcross',
    live_link: null,
  },
  {
    id: '4',
    title: '3D WebGL Portfolio',
    description: 'This very portfolio — built with Next.js 16, Three.js, and a live Spline 3D scene. Fully animated with Framer Motion and a custom cyberpunk design system.',
    tech_stack: ['Next.js', 'Three.js', 'Spline', 'Framer Motion', 'Tailwind'],
    github_link: 'https://github.com/Vibhathcross/Portfolio',
    live_link: null,
  },
];

export default function ProjectsArsenal() {
  const handleMouseMove = (e, id) => {
    const card = document.getElementById(`project-card-${id}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden z-20">
      <div className="container mx-auto px-6 md:px-12 pointer-events-none relative w-full">

        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase">// 03 // DIGITAL SYSTEM INDEX</span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-sans text-white mt-3 uppercase tracking-tight">
            The Arsenal
          </h2>
          <div className="border-t-2 border-purple-500/30 w-16 mt-6" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="interactive-element pointer-events-auto"
            >
              <div
                id={`project-card-${project.id}`}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                className="group relative rounded-2xl p-6 h-full glassmorphism flex flex-col justify-between overflow-hidden"
                style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}
              >
                {/* Spotlight hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background:
                      'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(189, 0, 255, 0.08), transparent 80%)',
                  }}
                />

                {/* Card Content */}
                <div className="relative z-10">
                  <span className="font-mono text-[10px] text-neutral-500 tracking-wider">
                    // BLOCK_0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold font-sans text-white mt-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-xs md:text-sm font-sans mt-4 leading-relaxed h-[80px] overflow-hidden text-ellipsis">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tech_stack.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 rounded border border-white/5 bg-neutral-900/60 font-mono text-[9px] text-neutral-400 uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 flex gap-4 mt-8 pt-4 border-t border-white/5">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 hover:text-white transition-colors"
                    >
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      SOURCE_CODE
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-[10px] text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink size={12} />
                      LAUNCH_SYS
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
