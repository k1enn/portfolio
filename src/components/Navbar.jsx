import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech" },
  { id: "contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinejoin="round" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="1" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  );
}

function readStoredTheme() {
  if (typeof window === "undefined") return "system";
  try {
    const v = localStorage.getItem("theme");
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === "system") {
    delete root.dataset.theme;
    try { localStorage.removeItem("theme"); } catch {}
  } else {
    root.dataset.theme = mode;
    try { localStorage.setItem("theme", mode); } catch {}
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  const cycle = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    applyTheme(next);
    setTheme(next);
  };

  const jump = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 72 });
    setIsOpen(false);
  };

  const ToggleIcon = theme === "light" ? SunIcon : theme === "dark" ? MoonIcon : SystemIcon;
  const toggleLabel = `Theme: ${theme}. Click to switch.`;

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-container">
        <a
          href="#home"
          className="navbar-logo"
          aria-label="k1en home"
          onClick={(e) => jump("home", e)}
        >
          k1en
        </a>

        <div className="nav-right">
          <ul id="primary-nav-menu" className={isOpen ? "nav-menu active" : "nav-menu"}>
            {NAV_LINKS.map((link) => (
              <li className="nav-item" key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="nav-link"
                  onClick={(e) => jump(link.id, e)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="theme-toggle"
            onClick={cycle}
            aria-label={toggleLabel}
            title={toggleLabel}
          >
            <ToggleIcon />
          </button>

          <button
            type="button"
            className="menu-icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="primary-nav-menu"
          >
            <div className="hamburger" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
