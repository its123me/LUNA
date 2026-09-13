import { useState } from "react";
import {
  ArrowLeft,
  Flame,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import VisibilitySelector from "../components/VisibilitySelector";
import type { Visibility } from "../types/visibility";
import { DEFAULT_VISIBILITY } from "../types/visibility";
import CandleLightEffect from "../components/CandleLightEffect";
import HeartParticles from "../components/HeartParticles";

type Candle = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
  visibility: Visibility;
  loveCount?: number;
};

const STORAGE_KEY = "luna-candles";

export default function CandleRoom() {
  const navigate = useNavigate();

  const [candles, setCandles] = useLocalStorage<Candle[]>(
    STORAGE_KEY,
    []
  );

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] =
    useState<Visibility>(DEFAULT_VISIBILITY);

  const [showRitual, setShowRitual] = useState(false);
  const [ritualMessage, setRitualMessage] = useState("");

  // Heart animation after lighting a candle
  const [showHearts, setShowHearts] = useState(false);

  // Heart animation after sending love
  const [loveBurstCandle, setLoveBurstCandle] =
    useState<number | null>(null);

  const lightCandle = () => {
    if (!name.trim() && !message.trim()) return;

    const currentMessage = message.trim();

    const candle: Candle = {
      id: Date.now(),
      name:
        name.trim() ||
        "A candle for someone remembered",
      message: currentMessage,
      createdAt: new Date().toLocaleDateString(),
      visibility,
      loveCount: 0,
    };

    setCandles([candle, ...candles]);

    setRitualMessage(
      currentMessage
        ? "For someone remembered. For someone loved."
        : "A little light for someone who still lives in your heart."
    );

    setName("");
    setMessage("");
    setVisibility(DEFAULT_VISIBILITY);

    setShowRitual(true);

    setShowHearts(true);

    window.setTimeout(() => {
      setShowHearts(false);
    }, 5200);
  };

  const sendLove = (candleId: number) => {
    const updatedCandles = candles.map((candle) =>
      candle.id === candleId
        ? {
            ...candle,
            loveCount: (candle.loveCount ?? 0) + 1,
          }
        : candle
    );

    setCandles(updatedCandles);

    setLoveBurstCandle(candleId);

    window.setTimeout(() => {
      setLoveBurstCandle(null);
    }, 5200);
  };

  const sharedCandles = candles.filter(
    (candle) => candle.visibility !== "private"
  );

  const myCandles = candles;

  return (
    <main
      className="candle-room"
      style={{ color: "white" }}
    >
      {/* =========================================================
          HEART ANIMATION — LIGHTING A CANDLE
         ========================================================= */}

      <HeartParticles
        active={showHearts}
        count={4}
        variant="candle"
      />

      {/* =========================================================
          BACK
         ========================================================= */}

      <button
        className="candle-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      {/* =========================================================
          HERO
         ========================================================= */}

      <section className="candle-hero">
        <div className="candle-hero-symbol">
          <Flame
            size={30}
            strokeWidth={1.3}
          />
        </div>

        <p className="candle-eyebrow">
          A LIGHT FOR SOMEONE YOU LOVE
        </p>

        <h1>
          Light a <span>candle.</span>
        </h1>

        <p>
          You don't need the right words.
          <br />
          Sometimes a little light says enough.
        </p>
      </section>

      {/* =========================================================
          CANDLE FORM
         ========================================================= */}

      <section className="candle-form-section">
        <div className="candle-form-card">
          <div className="candle-form-heading">
            <div className="candle-form-icon">
              <Flame
                size={20}
                strokeWidth={1.4}
              />
            </div>

            <div>
              <h2>Light a candle</h2>

              <p>
                Leave a name, a message, or simply a little
                light.
              </p>
            </div>
          </div>

          <label>
            <span>For someone</span>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="A name or someone remembered..."
              maxLength={100}
            />
          </label>

          <label>
            <span>A message</span>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Write a few words, if you wish..."
              rows={6}
              maxLength={1000}
            />
          </label>

          <VisibilitySelector
            value={visibility}
            onChange={setVisibility}
          />

          <button
            className="light-candle-submit"
            type="button"
            onClick={lightCandle}
            disabled={!name.trim() && !message.trim()}
          >
            <Flame
              size={19}
              strokeWidth={1.4}
            />

            <span>Light the candle</span>
          </button>
        </div>
      </section>

      {/* =========================================================
          MY CANDLES
         ========================================================= */}

      <section className="my-candles-section">
        <div className="candle-section-heading">
          <p>YOUR LIGHTS</p>

          <h2>My candles</h2>

          <span>
            Candles you have lit on this device.
          </span>
        </div>

        {myCandles.length === 0 ? (
          <div className="candle-empty">
            <Flame
              size={30}
              strokeWidth={1.2}
            />

            <h2>No candles lit yet.</h2>

            <p>
              Whenever you're ready, you can light one here.
            </p>
          </div>
        ) : (
          <div className="candle-list">
            {myCandles.map((candle) => (
              <article
                className="candle-card"
                key={candle.id}
              >
                <div className="candle-card-flame">
                  <Flame
                    size={21}
                    strokeWidth={1.3}
                  />
                </div>

                <div className="candle-card-content">
                  <div className="candle-card-title-row">
                    <h2>{candle.name}</h2>

                    <span
                      className={`visibility-badge visibility-${candle.visibility}`}
                    >
                      {candle.visibility === "private" &&
                        "🔒 Private"}

                      {candle.visibility === "anonymous" &&
                        "👤 Anonymous"}

                      {candle.visibility === "public" &&
                        "🌎 Public"}
                    </span>
                  </div>

                  {candle.message && (
                    <p>{candle.message}</p>
                  )}

                  <div className="candle-card-meta">
                    <span>{candle.createdAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          COMMUNITY CANDLES
         ========================================================= */}

      <section className="community-candles-section">
        <div className="candle-section-heading">
          <p>FROM THE LUNA COMMUNITY</p>

          <h2>Shared lights</h2>

          <span>
            Candles shared anonymously or publicly.
          </span>
        </div>

        {sharedCandles.length === 0 ? (
          <div className="candle-empty">
            <Flame
              size={30}
              strokeWidth={1.2}
            />

            <h2>No shared candles yet.</h2>

            <p>
              A small light can mean something to someone
              else too.
            </p>
          </div>
        ) : (
          <div className="candle-list">
            {sharedCandles.map((candle) => (
              <article
                className="candle-card community-candle-card"
                key={candle.id}
              >
                <div className="candle-card-flame">
                  <Flame
                    size={21}
                    strokeWidth={1.3}
                  />
                </div>

                <div className="candle-card-content">
                  <div className="candle-card-title-row">
                    <h2>{candle.name}</h2>

                    <span
                      className={`visibility-badge visibility-${candle.visibility}`}
                    >
                      {candle.visibility === "anonymous"
                        ? "👤 Anonymous"
                        : "🌎 Public"}
                    </span>
                  </div>

                  {candle.message && (
                    <p>{candle.message}</p>
                  )}

                  <div className="candle-card-meta">
                    <span>
                      {candle.visibility === "anonymous"
                        ? "Anonymous"
                        : "A LUNA light"}
                    </span>

                    <span>•</span>

                    <span>{candle.createdAt}</span>
                  </div>

                  {/* =================================================
                      SEND LOVE
                     ================================================= */}

                  <div className="send-love-wrapper">
                    <button
                      className={`send-love-button ${
                        loveBurstCandle === candle.id
                          ? "send-love-active"
                          : ""
                      }`}
                      type="button"
                      onClick={() => sendLove(candle.id)}
                      aria-label={`Send love to ${candle.name}`}
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.4}
                      />

                      <span>Send Love</span>

                      {(candle.loveCount ?? 0) > 0 && (
                        <span className="love-count">
                          {candle.loveCount}
                        </span>
                      )}
                    </button>

                    {loveBurstCandle === candle.id && (
                      <HeartParticles
                        active={true}
                        count={4}
                        variant="candle"
                      />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          CANDLE RITUAL
         ========================================================= */}

      {showRitual && (
        <CandleLightEffect
          message={ritualMessage}
          onClose={() => setShowRitual(false)}
        />
      )}
    </main>
  );
}