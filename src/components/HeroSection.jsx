'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const subheads = ['Software Engineering Student', 'AI Developer', 'WebGL Designer'];
  const [subheadIndex, setSubheadIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const activeWord = subheads[subheadIndex];
    let typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === activeWord.length) {
      typingSpeed = 1500; // Pause at full word
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setSubheadIndex((prev) => (prev + 1) % subheads.length);
      typingSpeed = 300;
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? activeWord.substring(0, charIndex - 1)
          : activeWord.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (prev + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, subheadIndex]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      {/* 3D Spline Scene container loading Vibhath's active WebGL Player link */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-70">
        <iframe
          src="https://my.spline.design/claritystream-OrFqiurjieZDckQXTRlmnLrZ/"
          title="Vibhath Spline 3D Workspace"
          className="w-full h-full border-none pointer-events-auto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ background: '#030303' }}
        />
      </div>

      {/* Cyber overlay panels (aesthetic grid) */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-10" />

      {/* Hero HTML Content Overlay */}
      <div className="container mx-auto px-6 md:px-12 z-20 pointer-events-none relative flex flex-col justify-center h-full w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-2"
          >
            <span className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase">
              // SECURE LINK ESTABLISHED
            </span>
            <h1 className="text-7xl md:text-9xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ededed] to-cyan-500/80 uppercase tracking-tight leading-none text-glow-cyan">
              Vibhath
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-8 mt-4 flex items-center"
          >
            <span className="font-mono text-lg md:text-2xl text-cyan-300 font-semibold">
              {typedText}
            </span>
            <span className="w-[3px] h-6 bg-cyan-400 ml-1 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-neutral-400 text-sm md:text-base font-sans max-w-lg leading-relaxed"
          >
            Pioneering highly interactive 3D WebGL user interfaces, complex local artificial intelligence workflows, and robust backends. Activating engineering systems from Idukki, Kerala.
          </motion.p>

          {/* Interactive Tech Specs Floating Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 inline-flex flex-col gap-2 p-4 glassmorphism rounded-xl border border-white/5 max-w-[280px] interactive-element pointer-events-auto"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span className="font-mono text-[10px] text-neutral-300 tracking-wider">SYSTEMS ONLINE</span>
            </div>
            <div className="border-t border-white/5 my-1" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[10px] text-neutral-500">
              <span>LATENCY:</span>
              <span className="text-cyan-400 text-right">14 MS</span>
              <span>GEOLOCATION:</span>
              <span className="text-neutral-300 text-right">9.849° N, 76.979° E</span>
              <span>OS KERNEL:</span>
              <span className="text-purple-400 text-right">HYBRID-X86</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
        <span className="font-mono text-[10px] text-neutral-500 tracking-[0.2em] uppercase animate-pulse">SCROLL DOWN</span>
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
