'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

// 1. R3F 3D MORPHING WIREFRAME MESH
export function Contact3DMorphing() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.12;
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.z = time * 0.05;
    const scaleFactor = 1.0 + Math.sin(time * 2.0) * 0.08;
    meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
  });

  return (
    <group position={[2.5, -30, 0]}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.4, 0.45, 120, 16, 3, 5]} />
        <meshPhysicalMaterial
          color="#bd00ff"
          emissive="#bd00ff"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <points>
        <sphereGeometry args={[2.5, 16, 16]} />
        <pointsMaterial color="#00f0ff" size={0.02} transparent opacity={0.3} />
      </points>
    </group>
  );
}

// 2. HTML CONTACT FORM — sends via mailto (no backend/database needed)
export function ContactUplinkHTML() {
  const CONTACT_EMAIL = 'vibhathcross@gmail.com';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Portfolio Contact — ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden z-20">
      <div className="container mx-auto px-6 md:px-12 pointer-events-none relative w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Form Panel */}
          <div className="lg:col-span-6 interactive-element pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl glassmorphism border border-white/5 shadow-2xl relative w-full max-w-lg"
            >
              <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase">// 04 // UPLINK COMMUNICATIONS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-sans text-white mt-3 uppercase tracking-tight">
                Uplink Station
              </h2>

              <div className="border-t-2 border-purple-500/30 w-16 my-6" />

              {!mounted ? (
                <div className="flex flex-col gap-5 py-6">
                  <div className="w-full bg-neutral-900/60 h-10 rounded-xl animate-pulse" />
                  <div className="w-full bg-neutral-900/60 h-10 rounded-xl animate-pulse" />
                  <div className="w-full bg-neutral-900/60 h-24 rounded-xl animate-pulse" />
                </div>
              ) : submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                  <CheckCircle size={48} className="text-purple-400 animate-bounce" />
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm text-white font-semibold">UPLINK INITIATED</span>
                    <span className="font-mono text-[10px] text-neutral-500">YOUR EMAIL CLIENT IS NOW OPEN. READY TO TRANSMIT.</span>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 border border-white/10 hover:border-purple-500/50 rounded-lg font-mono text-[10px] text-neutral-400 hover:text-white transition-all bg-[#0a0a0f]"
                  >
                    RESET_CHANNEL
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">COMMANDER NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Neo"
                      className="w-full bg-[#050507]/60 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">COMM SIGNAL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. neo@matrix.net"
                      className="w-full bg-[#050507]/60 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">SIG_MESSAGE BODY</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Type your message payload..."
                      className="w-full bg-[#050507]/60 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-bold py-3.5 px-6 rounded-xl border border-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-purple-500/10 cursor-pointer uppercase tracking-wider mt-2"
                  >
                    <Send size={12} />
                    SEND_MESSAGE
                  </button>

                  <p className="font-mono text-[9px] text-neutral-600 text-center mt-1">
                    Opens your email client · Sends directly to vibhathcross@gmail.com
                  </p>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column: Space for 3D Torus Knot */}
          <div className="lg:col-span-6 h-[400px] w-full" />
        </div>
      </div>
    </section>
  );
}
