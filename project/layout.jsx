// ============================================
// VOCARIA — Layout (Nav, ReadingProgress, StickyBar)
// ============================================

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (progressRef.current) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div className={`nav-shell ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <a className="nav__logo" href="#top" aria-label="Vocaria">
          <span className="nav__logo-mark" aria-hidden="true">
            <VocariaMark size={20} />
          </span>
          <span className="nav__logo-text">Vocaria</span>
        </a>
        <div className="nav__links">
          <a href="#laberinto">Dilemas</a>
          <a href="#vistaprevia">Universidades</a>
          <a href="#vistaprevia">Vista Previa</a>
          <a href="#faq">Preguntas</a>
          <a href="#test" className="purple">Explorador de Carreras +</a>
        </div>
        <div ref={progressRef} className="nav__progress" />
      </nav>
      <a className="nav__cta-pill" href="#test">
        Empezar test
        <span className="nav__cta-arrow">→</span>
      </a>
    </div>
  );
}

function ReadingProgress() { return null; /* moved into <Nav /> */ }

function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-bar ${visible ? 'visible' : ''}`}>
      <div className="sticky-bar__text">
        <span className="sticky-bar__title">¿No sabés qué estudiar?</span>
        <span className="sticky-bar__sub">Vocaria te ayuda en 7 minutos.</span>
      </div>
      <a href="#test" className="sticky-bar__cta">
        Empezar <span>→</span>
      </a>
    </div>
  );
}

Object.assign(window, { Nav, ReadingProgress, StickyBar });
