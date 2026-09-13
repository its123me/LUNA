import { Star, Heart, Moon, Bird, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MoonBackground from "../components/MoonBackground";

const categories = [
  {
    title: "LITTLE STARS",
    subtitle: "For the little ones who left too soon.",
    icon: Star,
    className: "little-stars",
    page: "little-stars",
  },
  {
    title: "LOVE",
    subtitle: "For a love that still lives within you.",
    icon: Heart,
    className: "love",
    page: "love",
  },
  {
    title: "THOSE WE MISS",
    subtitle: "For those who left without a goodbye.",
    icon: Moon,
    className: "those-we-miss",
    page: "those-we-miss",
  },
  {
    title: "THOSE WHO LEFT",
    subtitle: "For those whose lives became memories.",
    icon: Bird,
    className: "those-who-left",
    page: "those-who-left",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <MoonBackground />

      <main className="luna-home">
        <section className="hero">
          <div className="hero-glow" />

          <p className="eyebrow">A QUIET PLACE FOR THE HEART</p>

          <h1>
            Where <span>love</span> remains.
          </h1>

          <p className="hero-text">
            Some people leave our lives. Love doesn't.
            <br />
            You don't have to explain your grief to belong here.
          </p>
        </section>

        <section className="loss-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.title}
                className={`loss-card ${category.className}`}
                type="button"
                onClick={() => navigate(`/${category.page}`)}
              >
                <div className="loss-card-icon">
                  <Icon size={30} strokeWidth={1.4} />
                </div>

                <h2>{category.title}</h2>

                <p>{category.subtitle}</p>

                <span className="card-arrow">→</span>
              </button>
            );
          })}
        </section>

        <section className="candle-section">
          <div className="candle-divider" />

          <button
            className="candle-button"
            type="button"
            onClick={() => navigate("/candle-room")}
          >
            <span className="candle-icon">
              <Flame size={22} strokeWidth={1.5} />
            </span>

            <span>LIGHT A CANDLE</span>
          </button>

          <p>For someone you love. For someone you remember.</p>
        </section>
      </main>
    </>
  );
}