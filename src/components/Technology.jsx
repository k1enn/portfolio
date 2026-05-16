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
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";

const TECHNOLOGIES = [
  { name: "Java", icon: FaJava },
  { name: "Flutter", icon: SiFlutter },
  { name: ".NET Framework", icon: SiDotnet },
  { name: ".NET Core", icon: SiDotnet },
  { name: "NodeJS", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "ReactJS", icon: SiReact },
  { name: "NextJS", icon: SiNextdotjs },
  { name: "NestJS", icon: SiNestjs },
  { name: "Astro", icon: SiAstro },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "SQL Server", icon: DiMsqlServer },
  { name: "Firebase", icon: SiFirebase },
  { name: "Cloudflare", icon: SiCloudflare },
];

export default function Technology() {
  return (
    <div className="tech-wrap">
      <div className="tech-grid">
        {TECHNOLOGIES.map((tech) => {
          const Icon = tech.icon;
          return (
            <div key={tech.name} className="tech-cell">
              <Icon className="tech-icon" aria-hidden="true" />
              <span className="tech-name">{tech.name}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        .tech-wrap {
          margin-top: 2rem;
          border: 2px solid var(--border);
          background: var(--bg);
          box-shadow: var(--shadow-brutal);
        }
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .tech-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 12px;
          min-height: 120px;
          background: var(--bg);
          color: var(--fg);
          border-right: 2px solid var(--border);
          border-bottom: 2px solid var(--border);
        }
        .tech-cell:hover { background: var(--fg); color: var(--bg); }
        .tech-icon { font-size: 32px; margin-bottom: 10px; }
        .tech-name {
          font-size: 0.78rem;
          font-weight: 500;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0 4px;
        }
        @media (min-width: 480px) {
          .tech-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 768px) {
          .tech-grid { grid-template-columns: repeat(5, 1fr); }
          .tech-cell { min-height: 140px; padding: 28px 14px; }
          .tech-icon { font-size: 40px; }
        }
      `}</style>
    </div>
  );
}
