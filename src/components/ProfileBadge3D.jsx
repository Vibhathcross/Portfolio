'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProfileBadge3D() {
  const meshRef = useRef();
  const borderRef = useRef();
  const [texture, setTexture] = useState(null);

  // Safely load profile texture client-side with cyber grid fallback
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    // Cyber hologram SVG fallback data url
    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="100%" height="100%" fill="%23050a12"/><circle cx="100" cy="80" r="40" fill="none" stroke="%2300f0ff" stroke-width="2" stroke-dasharray="4"/><path d="M50 160 C50 120, 150 120, 150 160" fill="none" stroke="%2300f0ff" stroke-width="2"/><path d="M0 0 L200 200 M200 0 L0 200" fill="none" stroke="%23bd00ff" stroke-opacity="0.15" stroke-width="1"/></svg>`;
    
    loader.load(
      '/profile.png',
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      () => {
        // If profile.png is missing, load the fallback grid texture safely
        loader.load(fallbackSvg, (fallbackTex) => {
          setTexture(fallbackTex);
        });
      }
    );
  }, []);

  // Float and rotate badge gently
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Hovering float
    meshRef.current.position.y = Math.sin(time * 1.5) * 0.2;
    if (borderRef.current) {
      borderRef.current.position.y = meshRef.current.position.y;
    }
    
    // Subtle rotation
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
    meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.05;
    
    if (borderRef.current) {
      borderRef.current.rotation.y = meshRef.current.rotation.y;
      borderRef.current.rotation.x = meshRef.current.rotation.x;
    }
  });

  return (
    <group position={[2.2, 0.5, 0]}>
      {/* 3D Glass ID Badge Front Face */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2.2, 3.2, 0.06]} />
        <meshPhysicalMaterial
          map={texture}
          color="#ffffff"
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.8} // High transparency glass effect
          thickness={0.5}
          ior={1.5}
        />
      </mesh>

      {/* Cyber Glowing Outer Frame */}
      <mesh ref={borderRef}>
        <boxGeometry args={[2.26, 3.26, 0.08]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
