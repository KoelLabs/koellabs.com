'use client';

import { useEffect, useRef } from 'react';

export default function GradientLogo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    canvas.width = 200 * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = '200px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);

    // Animation variables
    let animationFrame;
    let hue = 0;

    const drawLogo = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 200, 200);
      gradient.addColorStop(0, `hsla(${hue}, 100%, 65%, 1)`);
      gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 100%, 65%, 1)`);
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 100%, 65%, 1)`);

      // Draw circle
      ctx.beginPath();
      ctx.arc(100, 100, 80, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      // Draw "dub" text
      ctx.font = 'bold 60px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = gradient;
      ctx.fillText('koel', 100, 100);

      // Update hue for animation
      hue = (hue + 0.5) % 360;

      // Continue animation
      animationFrame = requestAnimationFrame(drawLogo);
    };

    // Start animation
    drawLogo();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto mb-4" width="200" height="200" />;
}
