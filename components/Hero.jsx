// Animated gradient mesh canvas, mouse-reactive
function HeroBackground() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    let mx = 0.5, my = 0.5;
    let raf;
    const blobs = [
      { x: 0.25, y: 0.45, r: 0.55, c: [176, 32, 204], speed: 0.00018, phase: 0 },
      { x: 0.72, y: 0.55, r: 0.5,  c: [0, 212, 192], speed: 0.00022, phase: 1.7 },
      { x: 0.55, y: 0.25, r: 0.4,  c: [32, 144, 224], speed: 0.00026, phase: 3.4 },
      { x: 0.4,  y: 0.75, r: 0.45, c: [192, 32, 192], speed: 0.0002,  phase: 5.1 },
    ];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      // base wash
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#080812");
      bg.addColorStop(1, "#06060A");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      blobs.forEach((b, i) => {
        const tt = t * b.speed + b.phase;
        const ox = Math.cos(tt) * 0.08 + (mx - 0.5) * 0.06 * (i % 2 ? -1 : 1);
        const oy = Math.sin(tt * 1.3) * 0.08 + (my - 0.5) * 0.06 * (i % 2 ? 1 : -1);
        const cx = (b.x + ox) * w;
        const cy = (b.y + oy) * h;
        const r = b.r * Math.min(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [R, G, B] = b.c;
        g.addColorStop(0, `rgba(${R},${G},${B},0.55)`);
        g.addColorStop(0.4, `rgba(${R},${G},${B},0.15)`);
        g.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = g;
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";

      // grain / noise overlay (cheap)
      ctx.fillStyle = "rgba(6,6,8,0.55)";
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    }
    function onMove(e) {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    }
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <div className="hero-bg">
      <canvas ref={ref} />
      <div className="hero-vignette" />
    </div>
  );
}

function HeroPanel() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, []);
  const lat = 18 + (tick % 4);
  return (
    <aside className="hero-panel" aria-hidden="true">
      <div className="label"><span>LIVE RECORD</span><b>● SYNCED</b></div>
      <div className="pid">PID-7842-CKD-Δ</div>
      <div className="stack">
        <div className="row"><span className="k">Longitudinal span</span><span className="v">11y 4mo</span></div>
        <div className="row"><span className="k">Sources unified</span><span className="v">14</span></div>
        <div className="row"><span className="k">Imaging series</span><span className="v">38</span></div>
        <div className="row"><span className="k">Audit chain</span><span className="v good">Verified</span></div>
        <div className="row"><span className="k">Last sync (offline → cloud)</span><span className="v">{lat}ms</span></div>
      </div>
      <div className="audit">
        cast.audit › sha-256 <b>0x7f4a…d61c</b><br/>
        consent: <b>granted by patient · 04:21:08</b>
      </div>
    </aside>
  );
}

function Hero() {
  const left = ["Power", "to", "the"];
  const right = ["patient."];
  return (
    <section className="hero" id="top">
      <HeroBackground />
      <header className="top-bar">
        <Logo height={32} />
        <div className="links">
          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#ownership">Patient</a>
          <a href="#closing">Request a Demo</a>
        </div>
      </header>

      <div className="container hero-content">
        <div className="status-pill">
          <span className="dot" /> Patient-Owned Clinical Intelligence
        </div>

        <h1 className="h-display">
          <span className="word"><span style={{ animationDelay: "0.15s" }}>Power</span></span>{" "}
          <span className="word"><span style={{ animationDelay: "0.22s" }}>to</span></span>{" "}
          <span className="word"><span style={{ animationDelay: "0.29s" }}>the</span></span>{" "}
          <span className="grad-text headline-grad">patient.</span>
        </h1>

        <p className="sub">
          The patient record goes with them wherever they go —
          a single longitudinal record, owned by the patient, working with you in the room.
        </p>

        <div className="actions">
          <a href="#closing" className="btn btn-grad">
            Request a Demo <Icon name="arrow" />
          </a>
          <a href="#platform" className="btn btn-ghost">
            See the platform
          </a>
        </div>
      </div>

      <HeroPanel />

      <div className="scroll-hint">
        <span>SCROLL</span>
        <span className="line" />
      </div>
    </section>
  );
}

window.Hero = Hero;
