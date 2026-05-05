function Problem() {
  return (
    <section className="container section-pad problem-section">
      <div className="problem">
        <div className="row-2">
          <div className="copy">
            <Reveal><span className="eyebrow">The Problem We're Solving</span></Reveal>
            <Reveal delay={1}>
              <h2 className="h-section">
                Scattered.{" "}
                <span className="grad-text">Siloed. Inaccessible.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p>
                For too long, the most important information about a patient has lived
                in different systems. Specialists work in isolation. Records get
                repeated. Imaging lives in another building. The full picture is never seen.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p>
                <strong>VitalID changes that.</strong> One platform. One record.
                Complete clinical intelligence — from first visit to today.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <p style={{ marginTop: 8 }}>
                Records, imaging, labs, and clinical narratives normalized into a single
                patient-owned record — accessible from any device, working in the room.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="ingest-visual">
              <div className="ingest-tag">
                <span className="dot" />
                INGESTION ENGINE
              </div>
              <img src={(window.__resources && window.__resources.ingestionPhone) || "./assets/ingestion-phone.png"} alt="Patient records flowing into the VitalID mobile interface" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

window.Problem = Problem;
