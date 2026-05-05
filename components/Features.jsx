const FEATURES = [
  {
    icon: "brain",
    name: "AI-Assisted Clinical Decision Making",
    short: "See the complete picture, not a snapshot.",
    full: "VitalID aggregates and associates your patient's full clinical history using AI, surfacing patterns, correlations, and root cause pathways that isolated records simply cannot reveal. Designed for the clinician who needs to know why, not just what."
  },
  {
    icon: "sync",
    name: "Continuous Workflow — Online & Offline",
    short: "Lossless clinical data, regardless of your connection.",
    full: "VitalID is one of the first cloud-based clinical platforms built to work seamlessly in both online and offline environments. Your workflow never stops — even without a connection. The moment you reconnect, VitalID automatically synchronizes and normalizes all data with full traceability and zero loss. No gaps. No reconciliation errors. No interrupted care."
  },
  {
    icon: "shield",
    name: "Hyper-Secure Patient Record",
    short: "Federal-grade security and a full cryptographic audit trail.",
    full: "Built on CAST — a military-grade compiled language developed by Code 626 — VitalID protects patient data at the highest level of security standards in existence. Every record carries a cryptographic audit trail. Every interaction is verifiable. Your patients and your practice operate with complete confidence."
  },
  {
    icon: "transfer",
    name: "Seamless Transition From Your Current EHR",
    short: "Bring your patient history forward — completely.",
    full: "Switching platforms should never mean losing records. VitalID brings your patient history forward without gaps, lost files, or starting over. The transition into the VitalID clinical intelligence interface is designed to be immediate and complete."
  },
  {
    icon: "calendar",
    name: "AI-Assisted Scheduling, Communication & CRM",
    short: "From first contact to active care, in one workflow.",
    full: "VitalID streamlines every patient-facing workflow from first contact to active care. A built-in CRM transitions leads into full patient files upon arrival, so your team spends less time on administration and more time on care."
  },
  {
    icon: "doc",
    name: "AI-Assisted Notes, Reports & Narratives",
    short: "Documentation that reflects the full longitudinal picture.",
    full: "From encounter notes to clinical narratives, VitalID assists with documentation automatically — pulling from the patient's full longitudinal history so every report reflects the complete picture, not just the current visit."
  },
  {
    icon: "imaging",
    name: "Imaging — Capture to Decision, in One Platform",
    short: "A full PACS environment, fully integrated into the record.",
    full: "VitalID includes a full imaging environment equivalent to a dedicated PACS system — but fully integrated into the clinical record. Annotation, measurement, comparison views, and diagnostic analysis sit alongside the patient's complete longitudinal record. Imaging is never separate from the clinical picture. It informs it."
  },
];

function FeatureCard({ f, idx, openIdx, setOpenIdx }) {
  const open = openIdx === idx;
  const ref = React.useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      className={`f-card ${open ? "open" : ""}`}
      onMouseMove={onMove}
      onClick={() => setOpenIdx(open ? -1 : idx)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenIdx(open ? -1 : idx); } }}
      aria-expanded={open}
    >
      <div className="num">{String(idx + 1).padStart(2, "0")} / 07</div>
      <div className="ic"><Icon name={f.icon} /></div>
      <h3>{f.name}</h3>
      <p className="short">{f.short}</p>
      <div className="full"><div><p>{f.full}</p></div></div>
      <div className="toggle">
        <span>{open ? "COLLAPSE" : "READ MORE"}</span>
        <span className="arr"><Icon name="plus" /></span>
      </div>
    </div>
  );
}

function Features() {
  const [openIdx, setOpenIdx] = React.useState(-1);
  return (
    <section className="container section-pad" id="features">
      <div className="features-head">
        <div className="left">
          <Reveal><span className="eyebrow">Seven Core Capabilities</span></Reveal>
          <Reveal delay={1}>
            <h2 className="h-section">
              One platform. Every part of the clinical workflow,{" "}
              <span className="grad-text">already connected.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <div className="right">
            BUILT FOR SPECIALISTS<br/>
            <b>{String(openIdx + 1).padStart(2, "0").replace("00", "—")} / 07</b>
          </div>
        </Reveal>
      </div>

      <div className="feature-grid">
        {FEATURES.map((f, i) => (
          <Reveal key={i} delay={Math.min((i % 2) + 1, 4)}>
            <FeatureCard f={f} idx={i} openIdx={openIdx} setOpenIdx={setOpenIdx} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

window.Features = Features;
