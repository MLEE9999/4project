// public/fireworks.js
export function launchFirework(x, y) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const particles = [];

  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  for (let i = 0; i < 80; i++) {
    particles.push({
      x,
      y,
      radius: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 60%, 80%)`,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 6 + 2,
      opacity: 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed + 0.5;
      p.opacity -= 0.02;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });

    particles.filter(p => p.opacity > 0);
    if (particles.some(p => p.opacity > 0)) {
      requestAnimationFrame(draw);
    } else {
      document.body.removeChild(canvas);
    }
  }

  draw();
}
