function Strip() {
  return (
    <section className="strip" id="platform">
      <div className="corner l" />
      <div className="corner r" />
      <div className="container">
        <Reveal>
          <span className="eyebrow">Patient-Owned Clinical Intelligence</span>
        </Reveal>
        <Reveal delay={1}>
          <h2>
            This isn't an EHR. <span className="grad-text">It's what comes next.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p>
            Electronic health records were built to <em className="serif-accent">store</em> data.
            VitalID was built to <em className="serif-accent">use</em> it. As a true clinical
            intelligence interface, VitalID represents a fundamental shift in how clinical
            software works — moving from passive record-keeping to active insight generation.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p style={{ marginTop: 24 }}>
            That means doctors spend their time doing what they came to do — helping patients.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

window.Strip = Strip;
