// Shared primitives, hooks, icons
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// reveal on scroll
function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${delay ? `d-${delay}` : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// custom cursor
function CustomCursor() {
  const dot = useRef(null);
  const glow = useRef(null);
  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let gx = x, gy = y;
    let raf;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    const onOver = (e) => {
      const t = e.target.closest("a, button, .f-card, .perm-node, [data-cursor='hover']");
      if (dot.current) dot.current.classList.toggle("hover", !!t);
    };
    const tick = () => {
      gx += (x - gx) * 0.18;
      gy += (y - gy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      if (glow.current) glow.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return (
    <>
      <div ref={glow} className="cursor-glow" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}

// Logo
function Logo({ height = 26 }) {
  return (
    <span className="logo" aria-label="VitalID">
      <img
        src={(window.__resources && window.__resources.vitalidLogo) || "./assets/vitalid-logo.png"}
        alt="VitalID"
        style={{ height, width: "auto", display: "block" }}
      />
    </span>
  );
}

// Icons (line)
const Icon = ({ name }) => {
  const c = "currentColor";
  const s = { fill: "none", stroke: c, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "brain":
      return (<svg viewBox="0 0 24 24"><path {...s} d="M9 4.5a2.5 2.5 0 0 0-2.5 2.5v.2A3 3 0 0 0 4 10v1a3 3 0 0 0 1.5 2.6V15a3 3 0 0 0 3 3h.5V4.5H9Zm6 0a2.5 2.5 0 0 1 2.5 2.5v.2A3 3 0 0 1 20 10v1a3 3 0 0 1-1.5 2.6V15a3 3 0 0 1-3 3H15V4.5Z"/><path {...s} d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/></svg>);
    case "sync":
      return (<svg viewBox="0 0 24 24"><path {...s} d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4"/></svg>);
    case "shield":
      return (<svg viewBox="0 0 24 24"><path {...s} d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z"/><path {...s} d="m9 12 2 2 4-4"/></svg>);
    case "transfer":
      return (<svg viewBox="0 0 24 24"><path {...s} d="M3 7h13M13 4l3 3-3 3M21 17H8M11 14l-3 3 3 3"/></svg>);
    case "calendar":
      return (<svg viewBox="0 0 24 24"><rect {...s} x="3.5" y="5" width="17" height="15" rx="2"/><path {...s} d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2"/></svg>);
    case "doc":
      return (<svg viewBox="0 0 24 24"><path {...s} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path {...s} d="M14 3v5h5M9 13h6M9 17h4"/></svg>);
    case "imaging":
      return (<svg viewBox="0 0 24 24"><rect {...s} x="3.5" y="4.5" width="17" height="15" rx="2"/><circle {...s} cx="12" cy="12" r="3.5"/><path {...s} d="M12 4.5v15M3.5 12h17"/></svg>);
    case "arrow":
      return (<svg viewBox="0 0 24 24" width="14" height="14"><path {...s} d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case "plus":
      return (<svg viewBox="0 0 24 24" width="10" height="10"><path {...s} d="M12 5v14M5 12h14"/></svg>);
    default: return null;
  }
};

Object.assign(window, { Reveal, CustomCursor, Logo, Icon });
