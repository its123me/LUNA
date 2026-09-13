import { Link, useLocation } from "react-router-dom";
import { Moon, Flame } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { label: "Memories", path: "/memories" },
    { label: "Stories", path: "/stories" },
    { label: "Healing", path: "/healing" },
    { label: "Quiet Room", path: "/quiet-room" },
    { label: "Privacy", path: "/privacy" },
  ];

  return (
    <header className="luna-header">
      <div className="header-inner">

        {/* LUNA LOGO */}
        <Link to="/" className="luna-logo" aria-label="LUNA Home">
          <span className="luna-logo-icon">
            <Moon size={21} strokeWidth={1.25} />
          </span>

          <span className="luna-logo-text">LUNA</span>
        </Link>

        {/* NAVIGATION */}
        <nav className="luna-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`luna-nav-link ${
                  isActive ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CANDLE ACTION */}
        <Link
          to="/candle-room"
          className={`header-candle ${
            location.pathname === "/candle-room"
              ? "active"
              : ""
          }`}
        >
          <span className="header-candle-icon">
            <Flame size={16} strokeWidth={1.45} />
          </span>

          <span>Light a candle</span>
        </Link>
      </div>
    </header>
  );
}