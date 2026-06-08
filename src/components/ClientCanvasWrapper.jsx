'use client';

import React from 'react';
import CanvasContainer from "@/components/CanvasContainer";
import ProfileBadge3D from "@/components/ProfileBadge3D";
import { TechStack3DPhysics } from "@/components/TechStack3D";
import { Contact3DMorphing } from "@/components/ContactUplink";

export default function ClientCanvasWrapper() {
  return (
    <CanvasContainer>
      <ProfileBadge3D />
      <TechStack3DPhysics />
      <Contact3DMorphing />
    </CanvasContainer>
  );
}
