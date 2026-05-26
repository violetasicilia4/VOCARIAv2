// ============================================
// VOCARIA — Sections 1-3 (Hero, Strip, Laberinto)
// ============================================

import React from 'react';
import { FadeIn, ScrollRise, CTAButton, HeroCardParallax, ScrollMarquee } from './ui';
import { ResultCard } from './ResultCard';

/* ====== SECTION 1 — HERO ====== */
function HeroSection() {
  return (
    <section className="section hero" id="top">
      <div className="section__inner">
        <div className="hero__grid">
          {/* LEFT */}
          <div>
            <FadeIn delay={0} y={16}>
              <span className="hero-eyebrow">
                <span className="hero-eyebrow__dot" />
                <span>Psicología real</span>
                <span className="hero-eyebrow__sep" />
                <span className="hero-eyebrow__chip">Carreras argentinas</span>
                <span className="hero-eyebrow__sep" />
                <span className="hero-eyebrow__time">7 minutos</span>
              </span>
            </FadeIn>

            <FadeIn delay={120} y={28}>
              <h1 className="headline">
                <span className="headline-line">No necesitás tener todo resuelto.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={260} y={28}>
              <h1 className="headline headline--cont">
                <span className="headline-line">Necesitás <span className="headline-accent">ver tu patrón</span></span>
              </h1>
            </FadeIn>

            <FadeIn delay={220} y={20}>
              <p className="sub">
                Descubrís cómo pensás. Te decimos qué estudiar, dónde, y por qué eso encaja con quien sos.
              </p>
            </FadeIn>

            <FadeIn delay={350} y={16}>
              <div className="cta-row">
                <CTAButton magnetic={true} />
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — card */}
          <FadeIn delay={600} y={30}>
            <HeroCardParallax>
              <div className="hero-card-entry">
                <ResultCard
                  variant="exploradora"
                  paywall="none"
                  showUniversities={false}
                />
              </div>
            </HeroCardParallax>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ====== SECTION 2 — STRIP ====== */
function StripSection() {
  const UNIS = [
    'UBA', 'UTN', 'UNC', 'UNLP', 'UADE', 'Di Tella',
    'San Andrés', 'Austral', 'UCA', 'Palermo',
    'Siglo 21', 'UNR', 'UNER', 'UNLaM',
  ];

  const items = (
    <>
      {UNIS.map((u, i) => (
        <React.Fragment key={i}>
          <span className="strip__uni">{u}</span>
          <span className="strip__sep">·</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <section className="strip" aria-label="Universidades argentinas">
      <ScrollMarquee speed={0.18}>{items}</ScrollMarquee>
      <div className="strip__caption">
        130+ carreras · 14 instituciones argentinas · Exploración independiente sin afiliación contractual
      </div>
    </section>
  );
}

/* ====== SECTION 3 — MURAL DE DUDAS ====== */
const DUDAS = [
  { text: 'Me gustan muchas cosas',                         size: 'lg', rot:  0, off:  0,  variant: 'white' },
  { text: 'Tengo miedo de elegir mal',                      size: 'md', rot:  1, off: 14,  variant: 'white' },
  { text: 'No sé si esto tiene salida laboral',             size: 'sm', rot:  0, off: -6,  variant: 'white' },
  { text: 'No quiero perder años',                          size: 'md', rot:  0, off: 22,  variant: 'white' },
  { text: 'Mis viejos opinan, pero yo no sé',               size: 'md', rot: -1, off: -4,  variant: 'white' },
  { text: 'Quiero algo que me guste y rinda',               size: 'lg', rot:  0, off: 18,  variant: 'white' },
  { text: 'Ya empecé una carrera y no sé si es para mí',    size: 'lg', rot:  0, off: -2,  variant: 'accent' },
  { text: 'No sé por dónde empezar',                        size: 'md', rot:  0, off: 10,  variant: 'white' },
];

function LaberintoSection() {
  return (
    <section className="section dudas" id="laberinto">
      <div className="section__inner">
        <FadeIn delay={0} y={20}>
          <div className="eyebrow">DUDAS QUE TE SUENAN</div>
        </FadeIn>
        <ScrollRise>
          <h2 className="h2 dudas__h2">
            No es que no tengas opciones.<br />
            <span className="dudas__h2-accent">Es que todavía no tenés un mapa.</span>
          </h2>
        </ScrollRise>
        <FadeIn delay={180} y={20}>
          <p className="lab-sub dudas__sub">
            Si alguna de estas frases te suena, Vocaria puede ayudarte a ordenar qué camino tiene más sentido para vos.
          </p>
        </FadeIn>

        <div className="dudas-mural" role="list">
          {DUDAS.map((d, i) => (
            <FadeIn
              key={i}
              delay={120 + i * 60}
              y={10}
              className={`duda-pill-wrap duda-pill-wrap--${d.size}`}
            >
              <span
                role="listitem"
                className={`duda-pill duda-pill--${d.variant}`}
                style={{
                  '--rot': `${d.rot}deg`,
                  '--off': `${d.off}px`,
                  '--float-i': i,
                }}
              >
                <span className="duda-pill__quote">"</span>
                {d.text}
              </span>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={500} y={12}>
          <p className="dudas__close">
            Te muestra patrones, carreras afines y próximos pasos.
          </p>
        </FadeIn>

        <FadeIn delay={580} y={12}>
          <div className="dudas__cta">
            <CTAButton magnetic={true} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export { HeroSection, StripSection, LaberintoSection };
