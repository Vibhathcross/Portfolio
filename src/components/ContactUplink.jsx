'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

// 1. R3F 3D MORPHING WIREFRAME MESH (renders inside the background canvas at scroll depth Y = -30)
export function Contact3DMorphing() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow, fluid rotation on 3 axes
    meshRef.current.rotation.x = time * 0.12;
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.z = time * 0.05;

    // Harmonic morphing/pulsing scale using sine wave
    const scaleFactor = 1.0 + Math.sin(time * 2.0) * 0.08;
    meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
  });

  return (
    <group position={[2.5, -30, 0]}>
      {/* Dynamic twisting torus knot wireframe */}
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

      {/* Cyber ambient particle grid surrounding the knot */}
      <points>
        <sphereGeometry args={[2.5, 16, 16]} />
        <pointsMaterial
          color="#00f0ff"
          size={0.02}
          transparent
          opacity={0.3}
        />
      </points>
    </group>
  );
}

// 2. HTML CONTACT FORM OVERLAY
export function ContactUplinkHTML() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted true on client mount to bypass extension-driven hydration warnings
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);
        
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("Submission failed:", err);
      setError("UPLINK FAILURE: COULD NOT ESTABLISH SECURE PIPE.");
    } finally {
      setLoading(false);
    }
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

              {/* Show form only when mounted client-side to guarantee zero hydration warnings */}
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
                    <span className="font-mono text-sm text-white font-semibold">UPLINK SUCCESSFUL</span>
                    <span className="font-mono text-[10px] text-neutral-500">TRANSMISSION STREAM SAVED. INCOMING COMM QUEUED.</span>
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
                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] flex items-center gap-2">
                      <AlertTriangle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

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
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-bold py-3.5 px-6 rounded-xl border border-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-purple-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider mt-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-t border-r border-white rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        SEND_MESSAGE
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column: Emptied to keep the 3D rotating Torus Knot clear */}
          <div className="lg:col-span-6 h-[400px] w-full" />
        </div>
      </div>
    </section>
  );
}
