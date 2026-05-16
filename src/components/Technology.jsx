import {
  SiFlutter,
  SiDotnet,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiMongodb,
  SiFirebase,
  SiCloudflare,
  SiPostgresql,
  SiNextdotjs,
  SiNestjs,
  SiAstro,
  SiSqlite,
  SiHono,
  SiDrizzle,
  SiShadcnui,
  SiBackblaze,
  SiWordpress,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import categories from "../data/technologies.json";

const ICONS = {
  SiFlutter,
  SiDotnet,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiMongodb,
  SiFirebase,
  SiCloudflare,
  SiPostgresql,
  SiNextdotjs,
  SiNestjs,
  SiAstro,
  SiSqlite,
  SiHono,
  SiDrizzle,
  SiShadcnui,
  SiBackblaze,
  SiWordpress,
  FaJava,
  FaAws,
  DiMsqlServer,
};

const COLS = 4;
const pad2 = (n) => String(n).padStart(2, "0");
const padItems = (items) => {
  const need = (COLS - (items.length % COLS)) % COLS;
  return [...items, ...Array(need).fill(null)];
};

export default function Technology() {
  return (
    <div className="tech-wrap">
      {categories.map((cat) => {
        const cells = padItems(cat.items);
        return (
          <section key={cat.label} className="tech-section">
            <header className="tech-head">
              <span className="tech-head-label">{cat.label}</span>
              <span className="tech-head-count">[{pad2(cat.items.length)}]</span>
            </header>
            <div className="tech-grid">
              {cells.map((tech, i) => {
                if (!tech) {
                  return <div key={`pad-${i}`} className="tech-cell tech-cell--empty" aria-hidden="true" />;
                }
                const Tag = tech.link ? "a" : "div";
                const tagProps = tech.link
                  ? {
                      href: tech.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": tech.name,
                    }
                  : {};
                const inner = tech.icon === "IconifyElysia" ? (
                  <>
                    <img
                      className="tech-icon tech-icon--img tech-elysia-light"
                      src="https://api.iconify.design/skill-icons:elysia-light.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    <img
                      className="tech-icon tech-icon--img tech-elysia-dark"
                      src="https://api.iconify.design/skill-icons:elysia-dark.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  (() => {
                    const Icon = ICONS[tech.icon];
                    return Icon ? <Icon className="tech-icon" aria-hidden="true" /> : null;
                  })()
                );
                return (
                  <Tag key={`${cat.label}-${tech.name}`} className="tech-cell" {...tagProps}>
                    {inner}
                    <span className="tech-name">{tech.name}</span>
                  </Tag>
                );
              })}
            </div>
          </section>
        );
      })}
      <style>{`
        .tech-wrap {
          margin-top: 2rem;
          border: 2px solid var(--border);
          background: var(--bg);
        }
        .tech-section + .tech-section {
          border-top: 2px solid var(--border);
        }
        .tech-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--fg);
          color: var(--bg);
          border-bottom: 2px solid var(--border);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .tech-head-label {
          font-weight: 700;
          font-size: 0.9rem;
        }
        .tech-head-count {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 0.95rem;
          font-weight: 700;
        }
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: var(--border);
        }
        .tech-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 22px 12px;
          min-height: 112px;
          background: var(--bg);
          color: var(--fg);
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
        }
        a.tech-cell { cursor: pointer; }
        a.tech-cell:focus-visible { outline: 2px solid var(--fg); outline-offset: -2px; }
        .tech-cell:not(.tech-cell--empty):hover {
          background: var(--fg);
          color: var(--bg);
        }
        .tech-icon { font-size: 30px; margin-bottom: 10px; }
        .tech-icon--img { width: 30px; height: 30px; object-fit: contain; display: block; }
        .tech-elysia-dark { display: none; }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) .tech-elysia-light { display: none; }
          :root:not([data-theme="light"]) .tech-elysia-dark { display: block; }
        }
        :root[data-theme="dark"] .tech-elysia-light { display: none; }
        :root[data-theme="dark"] .tech-elysia-dark { display: block; }
        :root[data-theme="light"] .tech-elysia-light { display: block; }
        :root[data-theme="light"] .tech-elysia-dark { display: none; }
        .tech-name {
          font-size: 0.76rem;
          font-weight: 500;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0 4px;
        }
        @media (min-width: 768px) {
          .tech-grid { grid-template-columns: repeat(4, 1fr); }
          .tech-cell { min-height: 128px; padding: 26px 14px; }
          .tech-icon { font-size: 38px; }
          .tech-icon--img { width: 38px; height: 38px; }
          .tech-head { padding: 12px 18px; }
          .tech-head-label { font-size: 1rem; }
          .tech-head-count { font-size: 1.05rem; }
        }
      `}</style>
    </div>
  );
}
