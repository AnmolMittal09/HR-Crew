import React, { useEffect, useRef } from "react";

const TrailCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const trailParticles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addParticle = (x, y) => {
      trailParticles.push({
        x,
        y,
        size: Math.random() * 3 + 2,
        alpha: 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        color: ["#06b6d4", "#a855f7", "#ff00ff", "#00ffff"][Math.floor(Math.random() * 4)],
      });
    };

    const handleMouseMove = (e) => addParticle(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      for (let touch of e.touches) addParticle(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailParticles.forEach((p, i) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) trailParticles.splice(i, 1);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-20" />;
};

export default TrailCanvas;
