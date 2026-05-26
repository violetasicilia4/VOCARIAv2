// ============================================
// VOCARIA — App entry
// ============================================

function App() {
  return (
    <>
      <BgHalo />
      <Nav />
      <ReadingProgress />
      <main>
        <HeroSection />
        <StripSection />
        <LaberintoSection />
        <VistaPreviaSection />
        <FAQSection />
      </main>
      <CTAFinalSection />
      <Footer />
      <StickyBar />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
