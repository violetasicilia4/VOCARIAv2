// ============================================
// VOCARIA — Sections 4-6 (Vista Previa, FAQ, CTA Final, Footer)
// ============================================

/* ====== SECTION 4 — TEST STARTER (Probá una pregunta) ====== */
function VistaPreviaSection() {
  return (
    <section className="section vp" id="vistaprevia" style={{ background: 'var(--cream)' }}>
      <div className="section__inner">
        <div className="vp-head vp-head--centered">
          <FadeIn delay={0} y={20}>
            <div className="eyebrow">PROBÁ UNA PREGUNTA</div>
          </FadeIn>
          <ScrollRise>
            <h2 className="h2 vp-h2">
              Probá una pregunta.<br />
              <span className="vp-h2__accent">Si te hace sentido, seguís.</span>
            </h2>
          </ScrollRise>
          <FadeIn delay={180} y={20}>
            <p className="lab-sub vp-sub">
              No te preguntamos solo qué materias te gustan. Te mostramos situaciones reales para entender cómo pensás y qué te mueve.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0} y={24}>
          <div className="vp-card-wrap">
            <TestStarterCard />
          </div>
        </FadeIn>

        <FadeIn delay={200} y={12}>
          <p className="vp-proof">
            <span className="vp-proof__label">Después del test, alguien nos dijo:</span>{' '}
            <em className="vp-proof__quote">“Por fin no me recomendó lo obvio.”</em>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Testimonio({ initial, name, meta, arch, quote }) {
  return (
    <article className="testimonio">
      <div className="testimonio__head">
        <div className="testimonio__avatar">{initial}</div>
        <div>
          <div className="testimonio__name">{name}</div>
          <div className="testimonio__meta">{meta}</div>
          <div className="testimonio__arch">{arch}</div>
        </div>
      </div>
      <div className="testimonio__stars">★★★★★</div>
      <p className="testimonio__quote">{quote}</p>
    </article>
  );
}

/* ====== SECTION 5 — FAQ ====== */
const FAQ_ITEMS = [
  {
    q: '¿Cuánto tiempo me lleva?',
    a: 'Entre 5 y 7 minutos. Las preguntas son situacionales, simples de responder y no tienen respuestas correctas.'
  },
  {
    q: '¿Sirve si ya empecé una carrera y tengo dudas?',
    a: 'Sí. También está pensado para quienes ya empezaron y sienten que algo no termina de cerrar.'
  },
  {
    q: '¿Vocaria me dice exactamente qué estudiar?',
    a: 'No. Y eso es parte de hacerlo bien. Vocaria no decide por vos: te muestra patrones, carreras con afinidad y caminos posibles.'
  }
];

function FAQItem({ item, defaultOpen = false, delay = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <FadeIn delay={delay} y={14}>
      <div className={`faq-item ${open ? 'open' : ''}`}>
        <button className="faq-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span>{item.q}</span>
          <IconChevron />
        </button>
        <div className="faq-answer">{item.a}</div>
      </div>
    </FadeIn>
  );
}

function FAQSection() {
  return (
    <section className="section faq" id="faq" style={{ background: 'var(--cream)' }}>
      <div className="section__inner faq-wrap">
        <div className="faq-head">
          <FadeIn delay={0} y={20}>
            <div className="eyebrow">PREGUNTAS HONESTAS</div>
          </FadeIn>
          <ScrollRise>
            <h2 className="h2" style={{ margin: 0 }}>Antes de empezar.</h2>
          </ScrollRise>
        </div>
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} delay={60 * i} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== SECTION 6 — CTA FINAL ====== */
function CTAFinalSection() {
  return (
    <section className="cta-final" id="test">
      <div className="cta-final__inner">
        <FadeIn delay={0} y={-14}>
          <span className="cta-final__eyebrow">+ EMPEZÁ A ENTENDERTE</span>
        </FadeIn>

        <div className="cta-final__h-block">
          <h2 className="cta-final__h">
            <AnimatedText text="No tenés que decidir tu futuro hoy." className="cta-final__h-line" />
          </h2>
          <h2 className="cta-final__h cta-final__h--lime">
            <AnimatedText text="Pero podés empezar a entenderlo." className="cta-final__h-line" limeFromIndex={0} />
          </h2>
        </div>

        <FadeIn delay={150} y={16}>
          <p className="cta-final__sub">
            Saber quién sos es el primer paso. Empieza acá.
          </p>
        </FadeIn>

        <FadeIn delay={280} y={16}>
          <CTAButton magnetic={true} />
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark" style={{ color: 'var(--purple)' }}>
              <VocariaMark size={20} />
            </span>
            Vocaria
          </div>
          <div className="footer__tag">
            Orientación vocacional basada en psicología real, para estudiantes argentinos.
          </div>
        </div>
        <div className="footer__col">
          <h4>Producto</h4>
          <a href="#test">Empezar test</a>
          <a href="#vistaprevia">Vista previa</a>
          <a href="#laberinto">Dilemas</a>
        </div>
        <div className="footer__col">
          <h4>Método</h4>
          <a href="#laberinto">Cómo funciona</a>
          <a href="#vistaprevia">Vista previa</a>
          <a href="#faq">Preguntas</a>
        </div>
        <div className="footer__col">
          <h4>Universidades</h4>
          <a href="#vistaprevia">Carreras</a>
          <a href="#vistaprevia">Instituciones</a>
          <a href="#vistaprevia">Argentina 2025</a>
        </div>
        <div className="footer__col">
          <h4>Empresa</h4>
          <a href="#">Sobre Vocaria</a>
          <a href="#">Contacto</a>
          <a href="#">Privacidad</a>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Vocaria. Todos los derechos reservados.</span>
        <span>Desarrollado con ❤ para estudiantes argentinos</span>
      </div>
    </footer>
  );
}

Object.assign(window, { VistaPreviaSection, FAQSection, CTAFinalSection, Footer });
