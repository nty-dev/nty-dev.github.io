import React, { useEffect, useRef } from "react";

// Three layers matching the original CSS stars: sizes 1px, 2px, 3px at 50s/100s/150s cycles
const LAYERS = [
  { count: 700, radius: 0.5, cycleMs: 50000 },
  { count: 200, radius: 1,   cycleMs: 100000 },
  { count: 100, radius: 1.5, cycleMs: 150000 },
];

function makeStars(width, height, count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * width,
      y: Math.random() * height,
    });
  }
  return arr;
}

export default function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Size the canvas to match the header, which is always window.innerWidth × window.innerHeight.
    // Using window dimensions directly is more reliable than canvas.offsetWidth/Height,
    // which can return 0 if the CSS layout hasn't propagated yet when useEffect fires.
    const resize = () => {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();

    // Initialise layer state
    const layers = LAYERS.map((cfg) => ({
      ...cfg,
      stars:  makeStars(canvas.width, canvas.height, cfg.count),
      offset: Math.random() * canvas.height, // start at random phase so stars are visible immediately
    }));

    let lastTs = null;
    let animId;

    const draw = (ts) => {
      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";

      layers.forEach((layer) => {
        // px/ms this layer scrolls upward
        const speed = canvas.height / layer.cycleMs;
        layer.offset = (layer.offset + speed * delta) % canvas.height;

        layer.stars.forEach((star) => {
          // wrap star position with current scroll offset
          const y = (star.y - layer.offset + canvas.height) % canvas.height;
          ctx.beginPath();
          ctx.arc(star.x, y, layer.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      // Re-scatter stars to fill the new dimensions
      layers.forEach((layer) => {
        layer.stars = makeStars(canvas.width, canvas.height, layer.count);
        layer.offset = Math.random() * canvas.height;
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
