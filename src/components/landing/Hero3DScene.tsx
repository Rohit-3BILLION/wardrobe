"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// 1. Stylized Tailor's Mannequin with Terracotta Draped Coat
function TailorMannequin({
  onHoverItem,
  hoveredItem,
}: {
  onHoverItem: (name: string | null) => void;
  hoveredItem: string | null;
}) {
  const mannequinRef = useRef<THREE.Group>(null);
  const isHovered = hoveredItem === "blazer";

  useFrame((state) => {
    if (mannequinRef.current) {
      const targetScale = isHovered ? 1.07 : 1;
      const targetZ = isHovered ? 0.25 : 0;
      const targetRotY = isHovered ? Math.sin(state.clock.getElapsedTime() * 1.5) * 0.12 : 0;

      mannequinRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      mannequinRef.current.position.z = THREE.MathUtils.lerp(mannequinRef.current.position.z, targetZ, 0.1);
      mannequinRef.current.rotation.y = THREE.MathUtils.lerp(mannequinRef.current.rotation.y, targetRotY, 0.1);
    }
  });

  return (
    <group
      ref={mannequinRef}
      position={[0, -0.15, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
        onHoverItem("blazer");
      }}
      onPointerOut={() => {
        if (typeof document !== "undefined") document.body.style.cursor = "auto";
        onHoverItem(null);
      }}
    >
      {/* Brass Stand & Base */}
      <mesh position={[0, -1.45, 0]}>
        <cylinderGeometry args={[0.42, 0.45, 0.05, 32]} />
        <meshStandardMaterial color="#B08D57" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 1.7, 16]} />
        <meshStandardMaterial color="#B08D57" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Stand Screw Knob */}
      <mesh position={[0, -0.5, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.08, 16]} />
        <meshStandardMaterial color="#B08D57" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Tailor Dummy Torso (Warm Plaster / Linen) */}
      <group position={[0, 0.35, 0]}>
        {/* Chest & Shoulders */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.3, 0.22, 0.55, 32]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.85} metalness={0.05} />
        </mesh>
        {/* Waist & Hips */}
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.22, 0.32, 0.4, 32]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.85} metalness={0.05} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.18, 32]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.85} metalness={0.05} />
        </mesh>
        {/* Brass Finial Top */}
        <mesh position={[0, 0.74, 0]}>
          <sphereGeometry args={[0.065, 32, 32]} />
          <meshStandardMaterial color="#B08D57" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Draped Terracotta Atelier Blazer / Cape */}
      <group position={[0, 0.45, 0.04]}>
        {/* Left Lapel / Bodice */}
        <mesh position={[-0.14, 0.05, 0.12]} rotation={[0, 0.15, -0.05]} castShadow>
          <boxGeometry args={[0.38, 0.72, 0.12]} />
          <meshStandardMaterial
            color={isHovered ? "#C57255" : "#B9684B"}
            roughness={0.7}
            metalness={0.08}
          />
        </mesh>
        {/* Right Lapel / Bodice */}
        <mesh position={[0.14, 0.02, 0.1]} rotation={[0, -0.15, 0.05]} castShadow>
          <boxGeometry args={[0.38, 0.7, 0.12]} />
          <meshStandardMaterial
            color={isHovered ? "#B56146" : "#A9573C"}
            roughness={0.7}
            metalness={0.08}
          />
        </mesh>
        {/* Collar Fold */}
        <mesh position={[0, 0.36, 0.12]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.36, 0.12, 0.14]} />
          <meshStandardMaterial color="#8E3E26" roughness={0.75} />
        </mesh>
        {/* Horn Buttons */}
        <mesh position={[-0.03, 0.08, 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
          <meshStandardMaterial color="#2B211A" roughness={0.5} />
        </mesh>
        <mesh position={[-0.03, -0.12, 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
          <meshStandardMaterial color="#2B211A" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// 2. Floating Peach Silk Ribbon Scarf
function FloatingSilkScarf({
  onHoverItem,
  hoveredItem,
}: {
  onHoverItem: (name: string | null) => void;
  hoveredItem: string | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hoveredItem === "scarf";

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      const rotSpeed = isHovered ? 1.2 : 0.4;
      meshRef.current.rotation.y = Math.cos(t * rotSpeed) * 0.3 + (isHovered ? 0.4 : 0);
      meshRef.current.rotation.z = Math.sin(t * (rotSpeed * 1.2)) * 0.2;
      const targetScale = isHovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[0.95, 0.7, 0.3]}>
        <mesh
          ref={meshRef}
          castShadow
          onPointerOver={(e) => {
            e.stopPropagation();
            if (typeof document !== "undefined") document.body.style.cursor = "pointer";
            onHoverItem("scarf");
          }}
          onPointerOut={() => {
            if (typeof document !== "undefined") document.body.style.cursor = "auto";
            onHoverItem(null);
          }}
        >
          <torusKnotGeometry args={[0.38, 0.11, 80, 20, 2, 3]} />
          <meshStandardMaterial
            color={isHovered ? "#E2A786" : "#D99B79"}
            roughness={isHovered ? 0.2 : 0.28}
            metalness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Floating Caramel Leather Saddle Bag
function FloatingLeatherBag({
  onHoverItem,
  hoveredItem,
}: {
  onHoverItem: (name: string | null) => void;
  hoveredItem: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isHovered = hoveredItem === "bag";

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const rotY = isHovered
        ? -0.2 + Math.sin(t * 1.5) * 0.25
        : -0.3 + Math.sin(t * 0.6) * 0.15;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.1);
      const targetScale = isHovered ? 1.18 : 1;
      const targetZ = isHovered ? 0.35 : 0.2;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={groupRef}
        position={[0.75, -0.65, 0.2]}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (typeof document !== "undefined") document.body.style.cursor = "pointer";
          onHoverItem("bag");
        }}
        onPointerOut={() => {
          if (typeof document !== "undefined") document.body.style.cursor = "auto";
          onHoverItem(null);
        }}
      >
        {/* Main Leather Body */}
        <mesh castShadow>
          <boxGeometry args={[0.75, 0.6, 0.28]} />
          <meshStandardMaterial
            color={isHovered ? "#B37E50" : "#A87549"}
            roughness={0.5}
            metalness={0.12}
          />
        </mesh>
        {/* Leather Flap */}
        <mesh position={[0, 0.08, 0.03]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.78, 0.38, 0.29]} />
          <meshStandardMaterial color="#946338" roughness={0.55} metalness={0.12} />
        </mesh>
        {/* Brass Ring Buckle */}
        <mesh position={[0, -0.05, 0.18]}>
          <torusGeometry args={[0.075, 0.016, 16, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

// 4. Floating Gold Signet Ring
function FloatingGoldJewelry({
  onHoverItem,
  hoveredItem,
}: {
  onHoverItem: (name: string | null) => void;
  hoveredItem: string | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hoveredItem === "jewelry";

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      const speed = isHovered ? 2.2 : 0.5;
      meshRef.current.rotation.x = t * speed;
      meshRef.current.rotation.y = t * (speed * 0.8);
      const targetScale = isHovered ? 1.35 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.6}>
      <group position={[-1.0, -0.55, 0.5]}>
        <mesh
          ref={meshRef}
          castShadow
          onPointerOver={(e) => {
            e.stopPropagation();
            if (typeof document !== "undefined") document.body.style.cursor = "pointer";
            onHoverItem("jewelry");
          }}
          onPointerOut={() => {
            if (typeof document !== "undefined") document.body.style.cursor = "auto";
            onHoverItem(null);
          }}
        >
          <torusGeometry args={[0.22, 0.04, 24, 48]} />
          <meshStandardMaterial
            color={isHovered ? "#FFD700" : "#D4AF37"}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 5. Atelier Stage Component (Inside Canvas where R3F hooks are valid)
function AtelierStage({
  hoveredItem,
  setHoveredItem,
}: {
  hoveredItem: string | null;
  setHoveredItem: (name: string | null) => void;
}) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const pointer = state.pointer;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const scrollProgress = Math.min(Math.max(scrollY / 800, 0), 1.2);

    // Silky smooth camera parallax and scroll translation
    if (sceneRef.current) {
      const targetRotY = pointer.x * 0.35 + scrollProgress * 0.4;
      const targetRotX = -pointer.y * 0.2 + scrollProgress * 0.1;
      const targetPosY = -scrollProgress * 0.4;

      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, targetRotY, 0.06);
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, targetRotX, 0.06);
      sceneRef.current.position.y = THREE.MathUtils.lerp(sceneRef.current.position.y, targetPosY, 0.06);
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Central Tailor Mannequin Torso with Draped Blazer */}
      <TailorMannequin onHoverItem={setHoveredItem} hoveredItem={hoveredItem} />

      {/* Floating Silk Scarf */}
      <FloatingSilkScarf onHoverItem={setHoveredItem} hoveredItem={hoveredItem} />

      {/* Floating Leather Saddle Bag */}
      <FloatingLeatherBag onHoverItem={setHoveredItem} hoveredItem={hoveredItem} />

      {/* Floating Gold Jewelry */}
      <FloatingGoldJewelry onHoverItem={setHoveredItem} hoveredItem={hoveredItem} />

      {/* Floor Plinth with Subtle Shadow */}
      <mesh position={[0, -1.6, 0]} receiveShadow>
        <cylinderGeometry args={[1.9, 2.0, 0.1, 32]} />
        <meshStandardMaterial color="#EFE7DC" roughness={0.92} />
      </mesh>

      <ContactShadows
        position={[0, -1.66, 0]}
        opacity={0.35}
        scale={6.5}
        blur={2.6}
        far={3.2}
        color="#302923"
      />
    </group>
  );
}

export function Hero3DScene() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="w-full h-full min-h-[480px] lg:min-h-[600px] relative">
      <Canvas
        shadows
        camera={{ position: [0, 0.25, 4.4], fov: 40 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Warm Studio Illumination */}
        <ambientLight intensity={1.2} color="#FFF8F0" />
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.0}
          color="#FFF3E3"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-4, 2, -2]} intensity={1.4} color="#B9684B" />
        <pointLight position={[3, -2, 2]} intensity={0.8} color="#D99B79" />

        <AtelierStage hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
      </Canvas>
    </div>
  );
}
