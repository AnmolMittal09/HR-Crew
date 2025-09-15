import React, { useEffect, useRef } from "react";

const MusicVisualizer = ({ textRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let bars = [];

    const initializeBars = (barCount) => {
      bars = Array.from({ length: barCount }, () => Math.random() * 50 + 30);
    };

    const resize = () => {
      canvas.width = window.innerWidth;

      // Compute canvas height: from bottom of Hero to top of text
      const heroHeight = canvas.parentElement.offsetHeight;
      const textTop = textRef.current?.offsetTop || 0;
      canvas.height = heroHeight - textTop; // fills space up to text

      const barCount = window.innerWidth < 768 ? 40 : 80;
      if (bars.length !== barCount) initializeBars(barCount);
    };

    resize();
    window.addEventListener("resize", resize);

    const getFakeSpectrum = (i, total) => {
      const t = Date.now() * 0.002;
      const phase = (i / total) * Math.PI * 2;
      const low = Math.sin(t + phase) * 0.6 + 0.4;
      const mid = Math.sin(t * 1.5 + phase * 2) * 0.5 + 0.5;
      const high = Math.sin(t * 3 + phase * 4) * 0.3 + 0.7;
      return (low + mid + high) / 3;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10,10,15,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bars.length;

      bars.forEach((h, i) => {
        const spectrum = getFakeSpectrum(i, bars.length);
        const targetHeight = spectrum * 80;
        bars[i] = bars[i] + (targetHeight - bars[i]) * 0.1;

        const x = i * barWidth;
        const barHeight = (bars[i] / 100) * canvas.height; // scaled to dynamic height

        const gradient = ctx.createLinearGradient(
          x,
          canvas.height - barHeight,
          x,
          canvas.height
        );
        gradient.addColorStop(0, "#ff00ff");
        gradient.addColorStop(0.5, "#00ffff");
        gradient.addColorStop(1, "#06b6d4");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [textRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full z-30 pointer-events-none"
    />
  );
};

export default MusicVisualizer;
