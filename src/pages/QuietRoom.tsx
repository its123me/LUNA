import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CloudMoon,
  Heart,
  Moon,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuietRoom() {
  const navigate = useNavigate();

  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Breathe in");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!breathing) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [breathing]);

  useEffect(() => {
    if (!breathing) {
      return;
    }

    const phases = [
      "Breathe in",
      "Hold gently",
      "Breathe out",
      "Rest",
    ];

    const phaseIndex = Math.floor(seconds / 4) % phases.length;

    setBreathPhase(phases[phaseIndex]);
  }, [seconds, breathing]);

  const toggleBreathing = () => {
    setBreathing((previous) => !previous);

    if (!breathing) {
      setSeconds(0);
      setBreathPhase("Breathe in");
    }
  };

  return (
    <main className={`quiet-room ${breathing ? "quiet-room-active" : ""}`}>
      <div className="quiet-stars" aria-hidden="true">
        <span className="quiet-star star-one" />
        <span className="quiet-star star-two" />
        <span className="quiet-star star-three" />
        <span className="quiet-star star-four" />
        <span className="quiet-star star-five" />
        <span className="quiet-star star-six" />
        <span className="quiet-star star-seven" />
      </div>

      <div className="quiet-orb" aria-hidden="true" />

      <button
        className="quiet-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      <section className="quiet-hero">
        <div className="quiet-symbol">
          <Moon size={28} strokeWidth={1.25} />
        </div>

        <p className="quiet-eyebrow">A PLACE TO SIMPLY BE</p>

        <h1>
          Welcome to the <span>Quiet Room.</span>
        </h1>

        <p className="quiet-intro">
          Nothing is expected of you here.
          <br />
          You can stay for a moment, breathe, remember or simply be still.
        </p>
      </section>

      <section className="quiet-breathing-card">
        <div className="quiet-card-icon">
          <CloudMoon size={21} strokeWidth={1.3} />
        </div>

        <div className="quiet-card-heading">
          <p>GENTLE BREATHING</p>
          <h2>Take a moment with yourself.</h2>
          <span>
            There is nowhere you need to be right now.
          </span>
        </div>

        <div className={`breathing-orb ${breathing ? "breathing" : ""}`}>
          <div className="breathing-ring">
            <div className="breathing-core">
              <span>{breathing ? breathPhase : "Ready?"}</span>
            </div>
          </div>
        </div>

        <button
          className="breathing-button"
          type="button"
          onClick={toggleBreathing}
        >
          {breathing ? (
            <>
              <Pause size={17} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={17} />
              <span>Begin gently</span>
            </>
          )}
        </button>

        <p className="breathing-hint">
          Follow the light if you want to.
          <br />
          There is no right or wrong way to breathe here.
        </p>
      </section>

      <section className="quiet-message">
        <Heart size={19} strokeWidth={1.3} />

        <p>
          You don't have to let go of someone
          <br />
          in order to keep living.
        </p>
      </section>

      <section className="quiet-options">
        <article className="quiet-option">
          <div className="quiet-option-icon">
            <Sparkles size={19} strokeWidth={1.3} />
          </div>

          <div>
            <h3>Stay for a while</h3>
            <p>
              Look at the stars. Listen to the quiet. Let your thoughts
              come and go.
            </p>
          </div>
        </article>

        <article className="quiet-option">
          <div className="quiet-option-icon">
            <Heart size={19} strokeWidth={1.3} />
          </div>

          <div>
            <h3>Remember someone</h3>
            <p>
              Light a candle or write a memory when you feel ready.
            </p>

            <button
              type="button"
              onClick={() => navigate("/candle-room")}
            >
              Light a candle →
            </button>
          </div>
        </article>
      </section>

      <footer className="quiet-footer">
        <Moon size={15} />
        <span>Stay as long as you need.</span>
      </footer>
    </main>
  );
}