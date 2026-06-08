'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Physics, useBox, useSphere } from '@react-three/cannon';
import * as THREE from 'three';

// 1. INDIVIDUAL PHYSICS OBJECTS (Spheres and Cubes)
function PhysicsObject({ type, name, color, position, radius, size }) {
  const { viewport } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  
  // Custom texture loader for dynamic tech text inside the canvas
  const [textTexture, setTextTexture] = useState(null);

  useEffect(() => {
    // Generate text texture dynamically for maximum stability
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Background cyber gradient
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, '#0a0a0f');
    grad.addColorStop(1, '#020204');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    
    // Accent circle border
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 116, 116);
    
    // Label text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    setTextTexture(texture);
  }, [name, color]);

  // Set up standard rigid body physics hooks
  const isSphere = type === 'sphere';
  const physicsArgs = isSphere ? radius : size;

  const [ref, api] = isSphere
    ? useSphere(() => ({
        mass: 1.2,
        position,
        args: [radius],
        angularDamping: 0.4,
        linearDamping: 0.1,
      }))
    : useBox(() => ({
        mass: 1.5,
        position,
        args: size,
        angularDamping: 0.4,
        linearDamping: 0.1,
      }));

  // Handle Dragging physics in useFrame
  const { camera } = useThree();
  const pointerPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (isDragged) {
      // Projected mouse coordinates in 3D space at Z depth
      const vector = new THREE.Vector3(
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2 - 15, // Adjusted for scroll offset
        0
      );
      
      // Pull the physics body smoothly towards the mouse pointer
      api.position.set(vector.x, vector.y, 0);
      api.velocity.set(
        (vector.x - ref.current.position.x) * 12,
        (vector.y - ref.current.position.y) * 12,
        0
      );
    }
  });

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      style={{ pointerEvents: 'auto' }} // Enable dragging triggers
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = 'grab';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        document.body.style.cursor = 'default';
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setIsDragged(true);
        document.body.style.cursor = 'grabbing';
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        setIsDragged(false);
        document.body.style.cursor = 'grab';
      }}
    >
      {isSphere ? (
        <sphereGeometry args={[radius, 32, 32]} />
      ) : (
        <boxGeometry args={size} />
      )}
      <meshPhysicalMaterial
        map={textTexture}
        emissive={isHovered ? color : '#000000'}
        emissiveIntensity={isHovered ? 0.8 : 0}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.1}
        thickness={0.2}
      />
    </mesh>
  );
}

// 2. INVISIBLE ENCLOSURE WALLS
function BoundaryWall({ args, position }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial visible={false} /> {/* Invisible walls */}
    </mesh>
  );
}

// 3. COMPLETE WEBGL PHYSICS ENGINE SCENE
export function TechStack3DPhysics() {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;

  // Render boundaries relative to current viewport sizes at Tech Stack scroll depth (Y = -15)
  return (
    <group position={[0, -15, 0]}>
      <Physics gravity={[0, -9.8, 0]}>
        {/* Enclosure boundaries */}
        <BoundaryWall position={[0, -5, 0]} args={[30, 0.5, 10]} />     {/* Floor */}
        <BoundaryWall position={[-6.5, 2.5, 0]} args={[0.5, 15, 10]} />   {/* Left Wall */}
        <BoundaryWall position={[6.5, 2.5, 0]} args={[0.5, 15, 10]} />    {/* Right Wall */}
        <BoundaryWall position={[0, 9, 0]} args={[30, 0.5, 10]} />       {/* Ceiling */}
        <BoundaryWall position={[0, 2.5, 2.5]} args={[30, 15, 0.5]} />   {/* Front Plate */}
        <BoundaryWall position={[0, 2.5, -2.5]} args={[30, 15, 0.5]} />  {/* Back Plate */}

        {/* Dynamic rigid meshes loaded with color maps and names */}
        <PhysicsObject type="cube" name="C" color="#ff3333" position={[-3, 6, 0]} size={[1.1, 1.1, 1.1]} />
        <PhysicsObject type="sphere" name="Python" color="#ffd343" position={[3, 5, 0]} radius={0.7} />
        <PhysicsObject type="sphere" name="React" color="#00d8ff" position={[-1, 8, 0]} radius={0.7} />
        <PhysicsObject type="cube" name="Next.js" color="#888888" position={[1, 7, 0]} size={[1.2, 1.2, 1.2]} />
        <PhysicsObject type="sphere" name="HTML" color="#ff5722" position={[-2, 4, 0]} radius={0.6} />
        <PhysicsObject type="cube" name="JS" color="#f7df1e" position={[2, 3, 0]} size={[1.0, 1.0, 1.0]} />
        <PhysicsObject type="sphere" name="CSS" color="#2196f3" position={[0, 5, 0]} radius={0.6} />
        <PhysicsObject type="sphere" name="AI/Data" color="#00e676" position={[2.5, 8, 0]} radius={0.65} />
      </Physics>
    </group>
  );
}

// 4. HTML LAYOUT OVERLAY
export function TechStack3DHTML() {
  return (
    <section className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden z-20">
      {/* HTML Content Grid */}
      <div className="container mx-auto px-6 md:px-12 pointer-events-none relative w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Tech Description */}
          <div className="lg:col-span-6 interactive-element pointer-events-auto flex flex-col justify-center">
            <span className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase">// 02 // TECHNICAL AMMUNITION</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-sans text-white mt-3 uppercase tracking-tight leading-tight">
              My Tech Stack
            </h2>
            <div className="border-t-2 border-cyan-500/30 w-16 my-6" />
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              Every system is engineered using tailored components chosen for peak execution speed and memory efficiency. From standard static HTML/CSS web experiences to low-overhead logic controllers in C or dense machine learning pipelines.
            </p>

            {/* Instruction Box */}
            <div className="mt-8 p-4 rounded-xl border border-cyan-400/20 bg-cyan-950/10 max-w-md flex gap-4 items-start">
              <span className="text-xl">🎮</span>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide uppercase font-sans">PHYSICS SANDBOX ACTIVE</h4>
                <p className="text-neutral-500 text-[11px] font-mono mt-1">
                  Hover over the bouncing shapes in the background, click and grab them, and slide your mouse to fling them across the screen. Observe real-time rigid body dynamics!
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Emptied to keep the physics viewport clear and readable */}
          <div className="lg:col-span-6 h-[400px] w-full" />
        </div>
      </div>
    </section>
  );
}
