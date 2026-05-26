import React from 'react';
import { BgHalo } from './ui';
import { Nav, ReadingProgress, StickyBar } from './layout';
import { HeroSection, StripSection, LaberintoSection } from './sections1';
import { VistaPreviaSection, FAQSection, CTAFinalSection, Footer } from './sections2';

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

export default App;
