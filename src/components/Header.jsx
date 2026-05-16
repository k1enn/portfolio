const START = new Date("2023-08-01").getTime();
const END = new Date("2027-08-01").getTime();

function gradProgress() {
  const total = END - START;
  const elapsed = Date.now() - START;
  return Math.min(Math.max((elapsed / total) * 100, 0), 100);
}

export default function Header() {
  const progress = gradProgress();

  return (
    <header id="home" role="banner" className="hero">
      <div className="container hero-inner">
        <div className="hero-tag">
          <span className="hero-dot" aria-hidden="true" />
          <span>VN / Back-End / 2026</span>
        </div>

        <h1 className="hero-title">
          Trung Kien
        </h1>

        <p className="hero-lede">
          Back-end developer from Vietnam. I build server-side systems,
          ship small, and write about what I learn.
        </p>

        <div className="hero-progress" aria-label={`Road to graduation ${progress.toFixed(0)} percent`}>
          <div className="hero-progress-row">
            <span>Road to Graduation</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="hero-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}>
            <div className="hero-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="hero-progress-row hero-progress-meta">
            <span>2023.08</span>
            <span>2027.08</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100dvh;
          background: var(--bg);
          color: var(--fg);
          padding-top: clamp(120px, 14vw, 160px);
          padding-bottom: clamp(4rem, 8vw, 6rem);
          border-bottom: 2px solid var(--border);
          display: flex;
          align-items: center;
        }
        .hero-inner { display: flex; flex-direction: column; gap: 2rem; }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .hero-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: var(--fg);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 14vw, 9rem);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 700;
        }
        .hero-lede {
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          max-width: 560px;
          line-height: 1.5;
        }
        .hero-progress {
          width: 100%;
          max-width: 360px;
          border: 2px solid var(--border);
          background: var(--bg);
          padding: 14px 16px;
        }
        .hero-progress-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .hero-progress-meta {
          color: var(--muted);
          font-size: 0.72rem;
        }
        .hero-bar {
          width: 100%;
          height: 16px;
          border: 2px solid var(--border);
          background: var(--bg);
          margin: 8px 0;
          overflow: hidden;
        }
        .hero-bar-fill {
          height: 100%;
          background: var(--fg);
        }
      `}</style>
    </header>
  );
}
