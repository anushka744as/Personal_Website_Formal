import React, { useEffect, useRef } from 'react';
import { PARTICLE_PRESETS, type ParticlePresetKey } from './particlePresets';

type Props = {
  presetKey: ParticlePresetKey;  // 'light' or 'dark'
  className?: string;
};

export const ParticleBackground: React.FC<Props> = ({ presetKey, className }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    const preset = PARTICLE_PRESETS[presetKey] as any;
    if (!container) return;

    // Clear previous canvas
    container.innerHTML = '';

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return () => undefined;

    // Particle type definition
    type Particle = { 
      x: number;     // X position
      y: number;     // Y position
      vx: number;    // X velocity
      vy: number;    // Y velocity
      r: number      // Radius
    };

    const particles: Particle[] = [];
    
    // Extract configuration from preset
    const count = preset.particles.number.value;
    const linkDistance = preset.particles.line_linked.distance;
    const baseSpeed = preset.particles.move.speed / 2;
    const color = preset.particles.color.value;
    const lineColor = preset.particles.line_linked.color;
    const lineOpacity = preset.particles.line_linked.opacity;
    const lineWidth = preset.particles.line_linked.width;
    const sizeValue = preset.particles.size.value;

    // Mouse tracking for hover interactions
    const mouse = { x: 0, y: 0, active: false };
    const supportsGrab = preset.interactivity.events.onhover.enable && 
                         preset.interactivity.events.onhover.mode === 'grab';
    const grabDistance = preset.interactivity.modes.grab?.distance ?? 140;

    // Create a new particle with random position and velocity
    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = baseSpeed + Math.random() * baseSpeed;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.max(1, sizeValue * (preset.particles.size.random ? Math.random() : 1)),
      };
    };

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    // Event handlers
    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = () => {
      if (!preset.interactivity.events.onclick.enable || 
          preset.interactivity.events.onclick.mode !== 'push') return;
      const toAdd = preset.interactivity.modes.push?.particles_nb ?? 3;
      for (let i = 0; i < toAdd; i++) {
        particles.push(createParticle());
      }
    };

    // Register event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    let frameId = 0;

    // Animation loop
    const step = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges (particles exit one side and enter from opposite)
        if (p.x < -p.r) p.x = canvas.width + p.r; 
        else if (p.x > canvas.width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = canvas.height + p.r; 
        else if (p.y > canvas.height + p.r) p.y = -p.r;

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = preset.particles.opacity.value;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist2 = dx * dx + dy * dy;
          
          // Only connect if distance is less than linkDistance
          if (dist2 < linkDistance * linkDistance) {
            // Calculate opacity based on distance (fade out as particles move apart)
            const opacity = lineOpacity * (1 - Math.sqrt(dist2) / linkDistance);
            if (opacity > 0.01) {
              ctx.beginPath();
              ctx.strokeStyle = lineColor;
              ctx.globalAlpha = opacity;
              ctx.lineWidth = lineWidth;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw lines to mouse cursor on hover (grab effect)
      if (supportsGrab && mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < grabDistance) {
            const opacity = Math.max(0, 1 - dist / grabDistance) * lineOpacity;
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(step);
    };

    step();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      container.innerHTML = '';
    };
  }, [presetKey]);

  const preset = PARTICLE_PRESETS[presetKey];
  return <div ref={canvasRef} className={`absolute inset-0 ${className || ''}`} style={{ backgroundColor: preset.background }} aria-hidden />;
};
