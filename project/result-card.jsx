// ============================================
// VOCARIA — Result Card
// Variant data passed via `data` prop so each instance
// can show a different archetype.
// ============================================

const RESULT_CARDS = {
  exploradora: {
    match: '92% MATCH',
    archetype: 'Exploradora Estratégica',
    description: 'Combina pensamiento empático de interfaces con alta capacidad directiva.',
    tags: ['Sustento de Datos', 'Diseño UX', 'Gestión Digital'],
    careers: [
    { name: 'Licenciatura en Diseño UX/UI', pct: '94% Afinidad' },
    { name: 'Lic. en Negocios Digitales', pct: '89% Afinidad' }],

    salaryLine: 'Entrada: ~ARS 600k',
    salarySenior: 'Senior: ~ARS 2.5M / mes',
    universities: 'UADE · Universidad de San Andrés · Di Tella · UBA'
  },
  arquitecto: {
    match: '88% MATCH',
    archetype: 'El Arquitecto de Sistemas',
    description: 'Tu cabeza convierte el caos en lógica. Encontrás patrones donde otros ven ruido.',
    tags: ['Pensamiento sistémico', 'Lógica abstracta', 'Resolución compleja'],
    careers: [
    { name: 'Ingeniería en Sistemas', pct: '96% Afinidad' },
    { name: 'Licenciatura en Ciencias de Datos', pct: '91% Afinidad' }],

    salaryLine: 'Entrada: ~ARS 700k',
    salarySenior: 'Senior: ~ARS 3M / mes',
    universities: 'UBA · UTN · ITBA · Universidad Austral'
  }
};

function ResultCard({
  variant = 'exploradora',
  paywall = 'none', // 'none' (hero) | 'fade' (vista previa) | 'lock'
  showSalary = true,
  showUniversities = true
}) {
  const d = RESULT_CARDS[variant] || RESULT_CARDS.exploradora;
  return (
    <div className="result-card">
      {/* Floating badge top-right */}
      <div className="result-card__float-tr-wrap">
        <div className="result-card__float-tr">
          <span className="dot-green" />
          Alta Salida Laboral
        </div>
      </div>

      {/* Header */}
      <div className="rc-header">
        <span className="rc-label">TU DIAGNÓSTICO VOCACIONAL</span>
        <span className="rc-match">{d.match}</span>
      </div>

      {/* Profile */}
      <div style={{ marginBottom: 18 }}>
        <div className="rc-label" style={{ marginBottom: 6 }}>PERFIL DE ENFOQUE</div>
        <h3 className="rc-arch">{d.archetype}</h3>
        <p className="rc-desc">{d.description}</p>
        <div className="rc-tags">
          {d.tags.map((t, i) =>
          <span key={i} className="rc-chip">{t}</span>
          )}
        </div>
      </div>

      {/* Career matches */}
      <div className="rc-section">
        <div className="rc-label" style={{ marginBottom: 8 }}>MATCH DE RECORRIDOS</div>
        {d.careers.map((c, i) =>
        <div className="rc-row" key={i}>
            <span className="rc-row__num">{i + 1}.</span>
            <span className="rc-row__name">{c.name}</span>
            <span className="rc-row__pct">{c.pct}</span>
          </div>
        )}

        {paywall === 'fade' &&
        <div className="rc-fade">
            <div className="rc-fade__bars">
              <div className="rc-blur__bar" />
              <div className="rc-blur__bar" />
              <div className="rc-blur__bar" />
            </div>
            <div className="rc-fade__overlay" />
          </div>
        }
        {paywall === 'lock' &&
        <div className="rc-blur">
            <div className="rc-blur__bars">
              <div className="rc-blur__bar" />
              <div className="rc-blur__bar" />
              <div className="rc-blur__bar" />
            </div>
            <div className="rc-blur__lock">
              <IconLock size={12} />
              PREMIUM DESBLOQUEABLE
            </div>
          </div>
        }
      </div>

      {showSalary &&
      <div className="rc-section rc-section--secondary">
          <div className="rc-label" style={{ marginBottom: 6 }}>CONTEXTO LABORAL</div>
          <div className="rc-salary rc-salary--small">
            {d.salaryLine}
            <span style={{ color: 'var(--muted-light)', margin: '0 6px' }}>/</span>
            {d.salarySenior}
          </div>
          <div className="rc-salary-meta">
            <span className="dot-green" /> Alta demanda · Teletrabajo ✓
          </div>
        </div>
      }

      {showUniversities &&
      <div className="rc-section">
          <div className="rc-label" style={{ marginBottom: 6 }}>
            PLAN DE ESTUDIO DISPONIBLE EN ARGENTINA
          </div>
          <div className="rc-unis">{d.universities}</div>
        </div>
      }

      {/* Floating badge bottom-left */}
      <div className="result-card__float-bl-wrap">
        <div className="result-card__float-bl">
          <IconShield size={11} />
          Metodología Integrada
        </div>
      </div>
    </div>);

}

window.ResultCard = ResultCard;
window.RESULT_CARDS = RESULT_CARDS;