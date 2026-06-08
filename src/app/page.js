'use client';

import dynamic from 'next/dynamic';
import HeroSection from "@/components/HeroSection";
import AboutCenter from "@/components/AboutCenter";
import { TechStack3DHTML } from "@/components/TechStack3D";
import ProjectsArsenal from "@/components/ProjectsArsenal";
import { ContactUplinkHTML } from "@/components/ContactUplink";

// Dynamically load the WebGL persistent background canvas safely on the client side
const ClientCanvasWrapper = dynamic(() => import('@/components/ClientCanvasWrapper'), { 
  ssr: false,
  loading: () => null 
});

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      
      {/* Fixed Fullscreen WebGL Canvas Backdrop */}
      <ClientCanvasWrapper />

      {/* Hero Entry Section (integrated 3D Spline and typing header) */}
      <HeroSection />

      {/* About Section (terminal Emulation HUD) */}
      <AboutCenter />

      {/* Tech Stack Section (interacts with the background physics Canvas) */}
      <TechStack3DHTML />

      {/* Projects Section (loads and styles frosted glass project cards client-side) */}
      <ProjectsArsenal />

      {/* Contact Section (uplink communications console next to the rotating R3F knot) */}
      <ContactUplinkHTML />

    </main>
  );
}
