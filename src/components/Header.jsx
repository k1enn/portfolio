import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";

const START = new Date("2023-08-01").getTime();
const END = new Date("2027-08-01").getTime();

function gradProgress() {
  const total = END - START;
  const elapsed = Date.now() - START;
  return Math.min(Math.max((elapsed / total) * 100, 0), 100);
}

const SOCIALS = [
  { url: "https://github.com/k1enn", Icon: FaGithub, label: "GitHub" },
  { url: "https://linkedin.com/in/k1enn", Icon: FaLinkedin, label: "LinkedIn" },
  { url: "https://www.youtube.com/@iamk1en", Icon: FaYoutube, label: "YouTube" },
  { url: "https://codeforces.com/profile/dinhtrungkien", Icon: SiCodeforces, label: "Codeforces" },
];

export default function Header() {
  const progress = gradProgress();

  return (
    <header id="home" role="banner" className="hero">
      <div className="container hero-inner">
        <div className="hero-id">
          <div className="hero-avatar" aria-hidden="true">TK</div>
          <div className="hero-id-text">
            <h1 className="hero-name">Trung Kien</h1>
            <p className="hero-headline">Back-end Developer · Vietnam</p>
          </div>
        </div>

        <p className="hero-bio">
          Back-end developer from Vietnam. I build server-side systems,
          ship small, and write about what I learn.
        </p>

        <ul className="hero-socials">
          {SOCIALS.map(({ url, Icon, label }) => (
            <li key={label}>
              <a
                className="hero-social"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in new tab)`}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hero-progress" aria-label={`Road to graduation ${progress.toFixed(0)} percent`}>
          <div className="hero-progress-row">
            <span>Road to Graduation</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="hero-bar" role="progressbar" aria-label="Road to graduation progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}>
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
          background: var(--bg);
          color: var(--fg);
          padding-top: clamp(104px, 12vw, 140px);
          padding-bottom: clamp(2.5rem, 6vw, 4rem);
          border-bottom: 1px solid var(--line);
        }
        .hero-inner { display: flex; flex-direction: column; gap: 1.5rem; }
        .hero-id { display: flex; align-items: center; gap: 18px; }
        .hero-avatar {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--border);
          background: var(--surface);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.6rem;
          letter-spacing: -0.04em;
        }
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 6vw, 2.75rem);
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 700;
        }
        .hero-headline {
          margin-top: 8px;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .hero-bio {
          font-size: clamp(1.02rem, 1.5vw, 1.15rem);
          line-height: 1.6;
          max-width: 60ch;
        }
        .hero-socials {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .hero-social {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--border);
          background: var(--bg);
          color: var(--fg);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .hero-social:hover,
        .hero-social:focus-visible {
          background: var(--fg);
          color: var(--bg);
          outline: none;
        }
        .hero-social svg { width: 20px; height: 20px; }
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
          font-size: 0.8rem;
          letter-spacing: 0.02em;
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
