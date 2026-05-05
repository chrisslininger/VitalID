function Closing() {
  return (
    <section className="closing" id="closing">
      <div className="container">
        <Reveal><span className="eyebrow">Request a Demo</span></Reveal>
        <Reveal delay={1}>
          <h2>
            Built for clinicians who want{" "}
            <span className="grad-text">the full picture.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p>
            VitalID was designed from the ground up by specialists, for specialists.
            If you're ready to practice with complete clinical intelligence,
            we'd like to show you what that looks like.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <a href="#" className="btn btn-grad">
            Request a Demo <Icon name="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

window.Closing = Closing;
