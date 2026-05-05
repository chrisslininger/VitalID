function App() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <div className="shell">
        <Hero />
        <Strip />
        <Problem />
        <Interface />
        <Features />
        <Ownership />
        <Closing />
        <Footer />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
