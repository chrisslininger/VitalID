const NODES = [
  { id: "pcp",  role: "Primary Care",     who: "Dr. K. Lin, MD",       angle: -90, granted: true },
  { id: "spec", role: "Specialist",       who: "Atlas Cranial Clinic", angle: -30, granted: true },
  { id: "rad",  role: "Radiology",        who: "Northbay Imaging",     angle: 30,  granted: true },
  { id: "er",   role: "Emergency",        who: "First Responder",      angle: 90,  granted: true, emergency: true },
  { id: "rsr",  role: "Research",         who: "NIH Cohort 2A",        angle: 150, granted: false },
  { id: "ins",  role: "Insurer",          who: "Anthem Claims",        angle: 210, granted: false },
];

function PermissionGraph() {
  const [state, setState] = React.useState(() =>
    Object.fromEntries(NODES.map(n => [n.id, n.granted]))
  );

  // SVG connection lines: angles in radians, on a circle of radius ~ 38%
  const radius = 38; // % of container

  const positions = NODES.map(n => {
    const rad = (n.angle * Math.PI) / 180;
    return {
      ...n,
      x: 50 + Math.cos(rad) * radius,
      y: 50 + Math.sin(rad) * radius,
    };
  });

  return (
    <div className="perm" data-cursor="hover">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B020CC" stopOpacity=".7" />
            <stop offset="100%" stopColor="#00D4C0" stopOpacity=".7" />
          </linearGradient>
        </defs>
        {positions.map((p) => {
          const granted = state[p.id];
          const stroke = p.emergency
            ? "rgba(255,138,166,.65)"
            : granted ? "url(#lineGrad)" : "rgba(160,176,200,.15)";
          return (
            <line
              key={p.id}
              x1="50" y1="50"
              x2={p.x} y2={p.y}
              stroke={stroke}
              strokeWidth={granted ? 0.45 : 0.25}
              strokeDasharray={granted ? "0" : "1.2 1.2"}
              style={{ transition: "all .4s ease" }}
            />
          );
        })}
        {/* pulses on granted lines */}
        {positions.filter(p => state[p.id] && !p.emergency).map((p, i) => (
          <circle key={p.id + "p"} r="0.7" fill="#00D4C0">
            <animateMotion
              path={`M50,50 L${p.x},${p.y}`}
              dur={`${2.4 + i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0;1;0" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="center">
        <div className="label">Patient · Owner</div>
        <div className="name">M. Reyes</div>
        <div className="id">PID-7842-CKD-Δ</div>
      </div>

      {positions.map((p) => {
        const granted = state[p.id];
        const w = 168; // node width assumption used to translate
        return (
          <div
            key={p.id}
            className={`perm-node ${granted ? "granted" : ""} ${p.emergency ? "emergency" : ""}`}
            style={{
              left: `calc(${p.x}% - 84px)`,
              top:  `calc(${p.y}% - 30px)`,
            }}
            onClick={() => !p.emergency && setState(s => ({ ...s, [p.id]: !s[p.id] }))}
            role="switch"
            aria-checked={granted}
          >
            <div className="role">{p.emergency ? "Emergency · Always" : p.role}</div>
            <div className="who">{p.who}</div>
            <div className="toggle-row">
              <span>{granted ? (p.emergency ? "BIOMETRIC" : "GRANTED") : "REVOKED"}</span>
              <span className="sw" aria-hidden="true" />
            </div>
          </div>
        );
      })}

      <div className="legend">
        <span><span className="dot g" />GRANTED</span>
        <span><span className="dot r" />REVOKED</span>
        <span><span className="dot e" />EMERGENCY</span>
      </div>
    </div>
  );
}

function Ownership() {
  return (
    <section className="ownership section-pad" id="ownership">
      <div className="container">
        <div className="row-2">
          <div>
            <Reveal><span className="eyebrow">Patient Ownership</span></Reveal>
            <Reveal delay={1}>
              <h2 className="h-section">
                The record <span className="grad-text">belongs to the patient.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p>
                VitalID is built on a simple but radical idea: patients own their clinical
                data. They decide who sees it, what they share, and when.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p>
                For your practice, that means instant access to a complete record the
                moment a patient grants it — no portals, no faxes, no phone calls to another office.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <div className="quote">
                "The patient is in the chairman's seat of their own healthcare —
                for the first time."
              </div>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div style={{ paddingBottom: 70 }}>
              <PermissionGraph />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

window.Ownership = Ownership;
