// Animated, responsive, minimal background for modern UI
(function () {
  const canvas = document.getElementById('bg-animated');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  let dpr = window.devicePixelRatio || 1;
  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize); resize();

  // Config: 8 circles, 6 squares, soft blue/gray, slow float/rotate
  const shapes = [];
  for (let i = 0; i < 8; ++i) shapes.push({
    type: 'circle',
    x: Math.random() * w, y: Math.random() * h,
    r: 60 + Math.random() * 40,
    dx: 0.1 + Math.random() * 0.15, dy: 0.1 + Math.random() * 0.15,
    alpha: 0.10 + Math.random() * 0.08,
    color: `rgba(60,120,255,1)`
  });
  for (let i = 0; i < 6; ++i) shapes.push({
    type: 'square',
    x: Math.random() * w, y: Math.random() * h,
    size: 70 + Math.random() * 30,
    angle: Math.random() * Math.PI * 2,
    dAngle: 0.002 + Math.random() * 0.003,
    dx: 0.08 + Math.random() * 0.12, dy: 0.08 + Math.random() * 0.12,
    alpha: 0.08 + Math.random() * 0.07,
    color: `rgba(100,130,180,1)`
  });

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const s of shapes) {
      ctx.save();
      ctx.globalAlpha = s.alpha;
      if (s.type === 'circle') {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = s.color;
        ctx.filter = 'blur(2px)';
        ctx.fill();
      } else {
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.fillStyle = s.color;
        ctx.filter = 'blur(1.5px)';
        ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
        ctx.rotate(-s.angle);
        ctx.translate(-s.x, -s.y);
      }
      ctx.restore();

      // Animate position
      s.x += s.dx * (Math.sin(Date.now() / 4000 + s.x) + 1);
      s.y += s.dy * (Math.cos(Date.now() / 4000 + s.y) + 1);
      if (s.type === 'square') s.angle += s.dAngle;

      // Wrap around edges
      if (s.x < -100) s.x = w + 100;
      if (s.x > w + 100) s.x = -100;
      if (s.y < -100) s.y = h + 100;
      if (s.y > h + 100) s.y = -100;
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
