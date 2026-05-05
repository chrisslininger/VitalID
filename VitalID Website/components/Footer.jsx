function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-stack">
          <Logo height={56} />
          <div className="meta">PATIENT-OWNED CLINICAL INTELLIGENCE</div>
        </div>
        <div className="row" style={{ marginTop: 36, opacity: .7 }}>
          <div className="meta">© {new Date().getFullYear()} VitalID. All rights reserved.</div>
          <div className="legal">
            <a href="#">Security</a>
            <a href="#">Compliance</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
