function Nav() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Platform", "#platform"],
    ["Features", "#features"],
    ["Patient", "#ownership"],
    ["About", "#closing"],
  ];

  return (
    <nav className={`nav ${visible ? "visible" : ""}`} aria-label="Section navigation">
      <Logo height={20} />
      <div className="links">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="link">{label}</a>
        ))}
      </div>
      <a href="#closing" className="nav-cta">Request a Demo</a>
    </nav>
  );
}

window.Nav = Nav;
