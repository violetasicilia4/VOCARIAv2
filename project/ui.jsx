// ============================================
// VOCARIA — UI primitives
// FadeIn, AnimatedText, MagneticButton, ScrollMarquee,
// HeroCardParallax, StickyCard, CTAButton, Icons
// ============================================

const { useRef, useEffect, useState, useMemo, useCallback } = React;

const prefersReducedMotion = () =>
  typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------- FadeIn (IntersectionObserver) -------- */
function FadeIn({
  children,
  delay = 0,
  duration = 650,
  y = 24,
  x = 0,
  className = '',
  as = 'div',
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 40 && r.bottom > -40) {
        setVisible(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '40px', threshold: 0 }
    );
    io.observe(el);
    const onScroll = () => {
      if (check()) {
        io.disconnect();
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduce]);

  const Tag = as;
  const initialTransform = `translate(${x}px, ${y}px)`;
  return (
    <Tag
      ref={ref}
      className={`fade-in ${visible ? 'visible' : ''} ${className}`}
      style={{
        ...style,
        transform: visible ? 'translate(0,0)' : initialTransform,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* -------- AnimatedText (word-by-word on scroll) -------- */
function AnimatedText({ text, className = '', limeFromIndex = null }) {
  const ref = useRef(null);
  const reduce = prefersReducedMotion();
  const words = useMemo(() => text.split(' '), [text]);
  const [opacities, setOpacities] = useState(
    () => words.map(() => reduce ? 1 : 0.5)
  );

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // start: when top hits 90% of viewport, end: when bottom hits 30%
      const start = vh * 0.9;
      const end = vh * 0.3;
      const top = rect.top;
      // progress 0..1
      const range = start - end;
      const progress = Math.min(1, Math.max(0, (start - top) / range));
      const next = words.map((_, i) => {
        const a = i / words.length;
        const b = Math.min((i + 1.5) / words.length, 1);
        if (progress <= a) return 0.5;
        if (progress >= b) return 1;
        return 0.5 + ((progress - a) / (b - a)) * 0.5;
      });
      setOpacities(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [words, reduce]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            style={{
              opacity: opacities[i],
              transition: 'opacity 150ms linear',
              color: (limeFromIndex !== null && i >= limeFromIndex) ? 'var(--green-lime)' : undefined,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
}

/* -------- MagneticButton -------- */
function MagneticButton({ children, strength = 4, padding = 50, className = '' }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const [active, setActive] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile || prefersReducedMotion()) {
    return <div className={className} style={{ display: 'inline-block' }}>{children}</div>;
  }

  const onMove = (e) => {
    if (!ref.current || !innerRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / strength;
    const y = (e.clientY - rect.top - rect.height / 2) / strength;
    innerRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
  };
  const onLeave = () => {
    setActive(false);
    if (innerRef.current) innerRef.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-block',
        padding: `${padding}px`,
        margin: `-${padding}px`,
      }}
    >
      <div
        ref={innerRef}
        className={className}
        style={{
          transition: active
            ? 'transform 0.3s ease-out'
            : 'transform 0.6s ease-in-out',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* -------- CTAButton -------- */
function CTAButton({
  label = 'Empezar test',
  href = '#test',
  magnetic = false,
  size = 'md',
  arrow = true,
  onClick,
}) {
  const padding = size === 'sm' ? '11px 18px' : '15px 28px';
  const fontSize = size === 'sm' ? '14px' : '15px';
  const btn = (
    <a
      href={href}
      onClick={onClick}
      className="cta-btn"
      style={{ padding, fontSize }}
    >
      {label}
      {arrow && <span className="cta-btn__arrow">→</span>}
    </a>
  );
  if (magnetic) return <MagneticButton>{btn}</MagneticButton>;
  return btn;
}

/* -------- ScrollMarquee (continuous right-to-left) -------- */
function ScrollMarquee({ children, durationSec = 45 }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;
    // Measure ONE copy width: track contains 3 copies of children
    const measure = () => {
      const totalWidth = track.scrollWidth;
      const copyWidth = totalWidth / 3;
      track.style.setProperty('--marquee-shift', `-${copyWidth}px`);
      track.style.setProperty('--marquee-dur', `${durationSec}s`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [durationSec, reduce]);

  return (
    <div ref={wrapRef} className="strip__marquee">
      <div
        ref={trackRef}
        className="strip__track strip__track--auto"
        style={{ willChange: 'transform' }}
      >
        {children}{children}{children}
      </div>
    </div>
  );
}

/* -------- Shared scroll engine: single rAF loop ticks subscribers -------- */
const _scrollSubs = new Set();
let _scrollRaf = null;
function _scrollTick() {
  _scrollSubs.forEach(fn => { try { fn(); } catch(e) {} });
  _scrollRaf = null;
}
function _onScrollGlobal() {
  if (_scrollRaf == null) _scrollRaf = requestAnimationFrame(_scrollTick);
}
if (typeof window !== 'undefined' && !window.__vocariaScrollInit) {
  window.addEventListener('scroll', _onScrollGlobal, { passive: true });
  window.addEventListener('resize', _onScrollGlobal);
  window.__vocariaScrollInit = true;
}
function useScrollEffect(fn) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    _scrollSubs.add(fn);
    // initial tick
    requestAnimationFrame(fn);
    return () => { _scrollSubs.delete(fn); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* -------- ScrollParallax: translates a child by `speed` * scroll-from-center
   speed > 0 = moves up faster than scroll, speed < 0 = drifts down (slower) */
function ScrollParallax({ children, speed = 0.15, className = '', style = {} }) {
  const ref = useRef(null);
  useScrollEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // distance from viewport-center, normalized
    const centerOffset = rect.top + rect.height / 2 - vh / 2;
    const y = -centerOffset * speed;
    el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
  });
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}

/* -------- ScrollRise: scales from 0.94 → 1 + fades in as it enters viewport,
   then keeps moving subtly as it exits. More dramatic than FadeIn. */
function ScrollRise({ children, className = '', amount = 0.06, lift = 32 }) {
  const ref = useRef(null);
  useScrollEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when top is at bottom of viewport, 1 when top is at 30% from top
    const t = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.7)));
    const scale = 1 - amount * (1 - t);
    const y = lift * (1 - t);
    const opacity = 0.4 + 0.6 * t;
    el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
    el.style.opacity = String(opacity);
  });
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}

/* -------- HeroCardParallax (uses shared engine now) -------- */
function HeroCardParallax({ children }) {
  const ref = useRef(null);
  useScrollEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / (rect.height + vh * 0.4)));
    const y = -60 * progress;
    const opacity = 1 - 0.5 * Math.min(1, progress / 0.7);
    el.style.transform = `translate3d(0, ${y}px, 0)`;
    el.style.opacity = String(opacity);
  });
  return (
    <div ref={ref} className="result-card-wrap" style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}

/* -------- BgHalo: ambient drift behind content -------- */
function BgHalo() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  useScrollEffect(() => {
    const y = window.scrollY;
    if (ref1.current) ref1.current.style.transform = `translate3d(-50%, ${(-y * 0.25).toFixed(2)}px, 0)`;
    if (ref2.current) ref2.current.style.transform = `translate3d(-50%, ${(-y * 0.15 + 200).toFixed(2)}px, 0)`;
  });
  return (
    <>
      <div ref={ref1} className="bg-halo" />
      <div ref={ref2} className="bg-halo bg-halo--2" />
    </>
  );
}

/* -------- StickyCard -------- */
function StickyCard({ index, total, children, height = '75vh', top = '120px' }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const update = () => {
      const el = ref.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      const rect = el.getBoundingClientRect();
      const totalH = el.offsetHeight;
      // progress through the section: 0 when top is at top of viewport, 1 when bottom is at top
      const p = Math.min(1, Math.max(0, -rect.top / totalH));
      const sectionStart = index / total;
      const t = Math.min(1, Math.max(0, (p - sectionStart) / (1 - sectionStart)));
      const targetScale = 1 - (total - 1 - index) * 0.04;
      const scale = 1 - (1 - targetScale) * t;
      inner.style.transform = `scale(${scale})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [index, total, reduce]);

  return (
    <div ref={ref} style={{ height }}>
      <div style={{ position: 'sticky', top, transformOrigin: 'top center' }}>
        <div
          ref={innerRef}
          style={{
            marginTop: `${index * 20}px`,
            willChange: 'transform',
            transformOrigin: 'top center',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* -------- Icons -------- */
const IconChevron = ({ size = 18 }) => (
  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconLock = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconShield = ({ size = 12 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconQuote = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M7 7h3v3H8c0 1.1.9 2 2 2v2c-2.2 0-4-1.8-4-4V7zm8 0h3v3h-2c0 1.1.9 2 2 2v2c-2.2 0-4-1.8-4-4V7z" />
  </svg>
);

Object.assign(window, {
  FadeIn, AnimatedText, MagneticButton, CTAButton,
  ScrollMarquee, HeroCardParallax, StickyCard,
  ScrollParallax, ScrollRise, BgHalo, useScrollEffect,
  IconChevron, IconLock, IconShield, IconQuote,
  prefersReducedMotion,
});
