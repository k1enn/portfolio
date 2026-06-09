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

const pad2 = (n) => String(n).padStart(2, "0");

function TechIcon({ name }) {
  if (name === "IconifyElysia") {
    return (
      <>
        <img
          className="tech-pill-icon tech-pill-icon--img tech-elysia-light"
          src="https://api.iconify.design/skill-icons:elysia-light.svg"
          alt=""
          aria-hidden="true"
        />
        <img
          className="tech-pill-icon tech-pill-icon--img tech-elysia-dark"
          src="https://api.iconify.design/skill-icons:elysia-dark.svg"
          alt=""
          aria-hidden="true"
        />
      </>
    );
  }
  const Icon = ICONS[name];
  return Icon ? <Icon className="tech-pill-icon" aria-hidden="true" /> : null;
}

export default function Technology() {
  return (
    <div className="tech-wrap">
      {categories.map((cat) => (
        <section key={cat.label} className="tech-cat">
          <header className="tech-head">
            <span className="tech-head-label">{cat.label}</span>
            <span className="tech-head-count">[{pad2(cat.items.length)}]</span>
          </header>
          <ul className="tech-pills">
            {cat.items.map((tech) => {
              const Tag = tech.link ? "a" : "span";
              const tagProps = tech.link
                ? {
                    href: tech.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": `${tech.name} (opens in new tab)`,
                  }
                : {};
              return (
                <li key={`${cat.label}-${tech.name}`} className="tech-pill-item">
                  <Tag className="tech-pill" {...tagProps}>
                    <TechIcon name={tech.icon} />
                    <span className="tech-pill-name">{tech.name}</span>
                  </Tag>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <style>{`
        .tech-wrap {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .tech-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 10px;
          margin-bottom: 14px;
          border-bottom: 2px solid var(--border);
          color: var(--fg);
          letter-spacing: 0.02em;
        }
        .tech-head-label {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
        }
        .tech-head-count {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--muted-strong);
        }
        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tech-pill-item { margin: 0; }
        .tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 14px;
          background: transparent;
          color: var(--fg);
          border: 1.5px solid var(--border);
          text-decoration: none;
          line-height: 1;
          transition: background 0.15s ease, color 0.15s ease;
        }
        a.tech-pill { cursor: pointer; }
        a.tech-pill:hover,
        a.tech-pill:focus-visible {
          background: var(--fg);
          color: var(--bg);
          outline: none;
        }
        a.tech-pill:focus-visible { outline: 3px solid var(--fg); outline-offset: 2px; }
        .tech-pill-icon { font-size: 20px; flex-shrink: 0; }
        .tech-pill-icon--img { width: 20px; height: 20px; object-fit: contain; display: block; }
        /* Invert the Elysia bitmap on pill hover so it reads on the dark fill. */
        a.tech-pill:hover .tech-pill-icon--img,
        a.tech-pill:focus-visible .tech-pill-icon--img { filter: invert(1); }
        .tech-elysia-dark { display: none; }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) .tech-elysia-light { display: none; }
          :root:not([data-theme="light"]) .tech-elysia-dark { display: block; }
        }
        :root[data-theme="dark"] .tech-elysia-light { display: none; }
        :root[data-theme="dark"] .tech-elysia-dark { display: block; }
        :root[data-theme="light"] .tech-elysia-light { display: block; }
        :root[data-theme="light"] .tech-elysia-dark { display: none; }
        .tech-pill-name {
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        @media (min-width: 768px) {
          .tech-head-label { font-size: 1.15rem; }
          .tech-head-count { font-size: 1.05rem; }
          .tech-pill { padding: 10px 16px; }
          .tech-pill-icon { font-size: 22px; }
          .tech-pill-icon--img { width: 22px; height: 22px; }
          .tech-pill-name { font-size: 0.92rem; }
        }
      `}</style>
    </div>
  );
}
