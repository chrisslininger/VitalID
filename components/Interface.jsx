function Interface() {
  const ref = React.useRef(null);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (!ref.current || !imgRef.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / vh));
      imgRef.current.style.transform = `translateY(${p * -24}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="iface section-pad" ref={ref}>
      <div className="container">
        <div className="iface-head">
          <Reveal><span className="eyebrow">Clinical Intelligence Interface</span></Reveal>
          <Reveal delay={1}>
            <h2 className="h-section">
              The complete patient,{" "}
              <span className="grad-text">already connected.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede">
              Every association, aggregation, and pattern across a patient's history is
              surfaced automatically — so your team works from a single interface where
              everything is already connected and ready.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div className="iface-stage">
            <div className="iface-glow" />
            <img
              ref={imgRef}
              src={(window.__resources && window.__resources.physicianDesktop) || "./assets/physician-desktop.png"}
              alt="VitalID physician interface — Health Summary, Vitals Overview, Recent Records, and Medical Imaging on a single dashboard"
            />

            {/* floating annotations */}
            <div className="anno anno-tl">
              <div className="anno-num">01</div>
              <div className="anno-label">UNIFIED HEALTH SUMMARY</div>
              <div className="anno-text">Allergies, conditions, medications & immunizations — pulled from every prior provider.</div>
            </div>
            <div className="anno anno-tr">
              <div className="anno-num">02</div>
              <div className="anno-label">LIVE VITALS</div>
              <div className="anno-text">Continuous trend lines, not isolated readings.</div>
            </div>
            <div className="anno anno-br">
              <div className="anno-num">03</div>
              <div className="anno-label">PACS-INTEGRATED IMAGING</div>
              <div className="anno-text">Annotation, measurement, and comparison alongside the longitudinal record.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Interface = Interface;
