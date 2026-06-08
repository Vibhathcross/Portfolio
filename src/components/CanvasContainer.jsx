'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AmbientLight, DirectionalLight, SpotLight } from 'three';
import * as THREE from 'three';

// Component to handle smooth camera panning linked to page scroll
function ScrollRig() {
  useFrame((state) => {
    if (typeof window === 'undefined') return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Smoothly pan camera down based on scroll percent
    // Hero: Y = 0, Tech Stack: Y = -15, Contact: Y = -30
    const targetY = -scrollPercent * 32;
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
    
    // Subtle mouse tracking for gentle camera rotation
    const mouseX = state.pointer.x * 0.15;
    const mouseY = state.pointer.y * 0.15;
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, mouseX, 0.05);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, -mouseY, 0.05);
  });

  return null;
}

export default function CanvasContainer({ children }) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#030303] overflow-hidden">
      {/* Dynamic studio light halo */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-cyan-500/10 blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-purple-500/10 blur-[150px] animate-pulse-slow pointer-events-none" />
      
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ pointerEvents: 'none' }} // Let overlays capture mouse except on specific elements
      >
        <ambientLight intensity={0.15} />
        
        {/* Neon studio spotlight */}
        <spotLight 
          position={[10, 20, 15]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          color="#00f0ff"
        />
        
        {/* Soft fill light */}
        <directionalLight 
          position={[-10, -5, -5]} 
          intensity={0.5} 
          color="#bd00ff"
        />

        <ScrollRig />
        
        {/* Render child 3D elements inside R3F context */}
        {children}
      </Canvas>
    </div>
  );
}
