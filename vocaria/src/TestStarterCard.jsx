// ============================================
// VOCARIA — TestStarterCard
// Tercera sección: micro test starter (interactivo)
// ============================================

import React, { useRef, useEffect, useState } from 'react';
import { CTAButton, prefersReducedMotion } from './ui';

const STARTER_OPTIONS = [
  {
    letter: 'A',
    text: 'Ordenar un problema difícil hasta encontrarle lógica.',
    reading: 'te interesa entender qué pasa detrás de un problema antes de decidir qué camino tomar.',
  },
  {
    letter: 'B',
    text: 'Ayudar a un equipo a funcionar mejor.',
    reading: 'te interesa entender qué pasa detrás de un problema antes de decidir qué camino tomar.',
  },
  {
    letter: 'C',
    text: 'Crear una experiencia que la gente quiera usar.',
    reading: 'te interesa entender qué pasa detrás de un problema antes de decidir qué camino tomar.',
  },
  {
    letter: 'D',
    text: 'Entender por qué algo no está funcionando.',
    reading: 'te interesa entender qué pasa detrás de un problema antes de decidir qué camino tomar.',
  },
];

function TestStarterCard() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [selected, setSelected] = useState(null); // letter or null
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce) { setAnimate(true); return; }
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 80 && r.bottom > 0) {
        setAnimate(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        setAnimate(true);
        io.disconnect();
      }
    }, { rootMargin: '-80px', threshold: 0 });
    io.observe(el);
    const onScroll = () => { if (check()) io.disconnect(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduce]);

  const selectedOpt = STARTER_OPTIONS.find(o => o.letter === selected);
  const isAnswered = !!selected;

  return (
    <div
      ref={ref}
      className={`starter-card ${animate ? 'is-active' : ''} ${isAnswered ? 'is-answered' : ''}`}
    >
      {/* Header */}
      <div className="starter-card__head">
        <div className="starter-card__progress-label">
          PREGUNTA 1 · CÓMO PENSÁS
        </div>
        <div className="starter-card__progress-track">
          <div className="starter-card__progress-fill" />
        </div>
      </div>

      {/* Question */}
      <h3 className="starter-card__question">
        Imaginá tu primer día en algo nuevo. ¿Qué desafío te entusiasmaría más?
      </h3>

      {/* Options */}
      <div className="starter-card__options">
        {STARTER_OPTIONS.map((opt, i) => {
          const isSel = selected === opt.letter;
          return (
            <button
              key={opt.letter}
              type="button"
              className={`starter-opt ${isSel ? 'is-selected' : ''}`}
              style={{ '--opt-i': i }}
              onClick={() => setSelected(opt.letter)}
              aria-pressed={isSel}
            >
              <span className="starter-opt__letter">{opt.letter}</span>
              <span className="starter-opt__text">{opt.text}</span>
              <span className="starter-opt__check" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 8.5 6.5 12 13 4.5" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>

      {/* Reveal block — solo cuando hay respuesta */}
      <div className={`starter-reveal ${isAnswered ? 'is-open' : ''}`}>
        <div className="starter-reveal__inner">
          <div className="starter-reveal__lead">
            Esta respuesta puede empezar a mostrar:
          </div>
          <p className="starter-reveal__body">
            {selectedOpt ? selectedOpt.reading : ''}
          </p>

          <div className="starter-reveal__chips-label">
            Después lo combinamos con:
          </div>
          <div className="starter-reveal__chips">
            <span className="starter-chip">Intereses</span>
            <span className="starter-chip">Prioridades</span>
            <span className="starter-chip">Carreras afines</span>
          </div>

          <div className="starter-reveal__cta">
            <CTAButton label="Seguir con el test" />
          </div>
        </div>
      </div>

      {/* Idle state hint (replaces reveal when nothing selected) */}
      {!isAnswered && (
        <div className="starter-card__hint">
          Tocá una opción para ver qué empieza a mostrar.
        </div>
      )}
    </div>
  );
}

export default TestStarterCard;
