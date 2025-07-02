'use client';

import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid();
    };

    // Draw grid lines
    const drawGrid = () => {
      const gridSize = 40;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.strokeStyle = 'rgba(229, 231, 235, 0.3)';
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Add gradient overlay
      const centerX = width / 2;
      const centerY = height / 2;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(width, height) * 0.6,
      );

      gradient.addColorStop(0, 'rgba(186, 230, 253, 0.15)'); // Light blue
      gradient.addColorStop(0.5, 'rgba(125, 211, 252, 0.05)'); // Sky blue
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Initial setup
    updateCanvasSize();

    // Handle resize
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
}
