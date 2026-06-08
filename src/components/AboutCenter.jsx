'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutCenter() {
  return (
    <section className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden z-20">
      <div className="container mx-auto px-6 md:px-12 relative pointer-events-none">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Tech Terminal HUD (Command Center) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 interactive-element pointer-events-auto"
          >
            <div className="w-full rounded-2xl glassmorphism border border-white/5 overflow-hidden shadow-2xl relative">
              {/* Top Terminal Bar */}
              <div className="bg-[#0c0c0e] px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[10px] text-neutral-500 tracking-wider">vibhath@core-kernel:~</span>
                <div className="w-8" />
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-xs md:text-sm text-neutral-300 leading-relaxed bg-[#050507]/40">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span>$</span>
                  <span>cat sys_profile.json</span>
                </div>
                
                <div className="mt-4 pl-4 border-l border-cyan-400/20 text-neutral-400 flex flex-col gap-2">
                  <div>
                    <span className="text-cyan-400/70">"origin":</span> 
                    <span className="text-neutral-300"> "Idukki, Kerala, India",</span>
                  </div>
                  <div>
                    <span className="text-cyan-400/70">"academics":</span> 
                    <span className="text-neutral-300"> "Computer Science & Engineering Student",</span>
                  </div>
                  <div>
                    <span className="text-cyan-400/70">"focus_areas":</span> <span className="text-neutral-300">[</span>
                    <div className="pl-4 text-purple-400">
                      "Operating Systems",<br />
                      "Database Management (DBMS)",<br />
                      "Computer Networks (TCP/IP)"
                    </div>
                    <span className="text-neutral-300">]</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-cyan-400">
                  <span>$</span>
                  <span>sysctl -a | grep kernel.capabilities</span>
                </div>
                
                <div className="mt-3 pl-4 border-l border-purple-500/20 text-[11px] text-neutral-500 flex flex-col gap-1">
                  <span>&gt; OS_SCHEDULING: Multi-threading, Virtual Memory, Process Synchronization</span>
                  <span>&gt; DATABASE: Query Optimization, Indexing, Transaction Isolation (ACID)</span>
                  <span>&gt; NETWORKING: Socket Programming, DNS Routing, TLS/SSL Cryptography</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-emerald-400 animate-pulse">
                  <span>$</span>
                  <span className="w-2.5 h-4 bg-emerald-400" />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 interactive-element pointer-events-auto flex flex-col justify-center"
          >
            <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase">// 01 // ABOUT THE ENGINEER</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-sans text-white mt-3 uppercase tracking-tight leading-tight">
              The Command Center
            </h2>
            
            <div className="border-t-2 border-purple-500/30 w-16 my-6" />
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              I am a dedicated Software Engineering student and systems developer who views programming not just as building tools, but as crafting fine-tuned digital machinery. Nestled in the serene mountains of <strong className="text-white">Idukki, Kerala</strong>, I construct high-integrity architectures bridging raw hardware systems with elegant WebGL visuals.
            </p>
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mt-4">
              My engineering core lies in mastering computing fundamentals. I deep-dive into how operating systems coordinate memory, how databases execute transactional queries under high concurrency, and how packets traverse sockets. This low-level appreciation lets me build incredibly optimized, secure systems at the application layer.
            </p>
            
            {/* Tech cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-xl border border-white/5 bg-[#08080a]/50 text-center glassmorphism">
                <span className="block font-mono text-[10px] text-neutral-500">SCHEDULING</span>
                <span className="block text-xs font-semibold text-cyan-400 mt-1 uppercase font-sans">POSIX OS</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#08080a]/50 text-center glassmorphism">
                <span className="block font-mono text-[10px] text-neutral-500">CONSISTENCY</span>
                <span className="block text-xs font-semibold text-purple-400 mt-1 uppercase font-sans">ACID SQL</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#08080a]/50 text-center glassmorphism">
                <span className="block font-mono text-[10px] text-neutral-500">PROTOCOLS</span>
                <span className="block text-xs font-semibold text-emerald-400 mt-1 uppercase font-sans">TCP/IP</span>
              </div>
            </div>
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}
