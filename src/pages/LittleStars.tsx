import {
  ArrowLeft,
  Heart,
  Plus,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import VisibilitySelector from "../components/VisibilitySelector";
import type { Visibility } from "../types/visibility";
import { DEFAULT_VISIBILITY } from "../types/visibility";

type StarMemory = {
  id: number;
  name: string;
  message: string;
  date: string;
  visibility: Visibility;
};

const STORAGE_KEY = "luna-little-stars";

export default function LittleStars() {
  const navigate = useNavigate();

  const [memories, setMemories] = useLocalStorage<StarMemory[]>(
    STORAGE_KEY,
    []
  );

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] =
    useState<Visibility>(DEFAULT_VISIBILITY);

  const saveMemory = () => {
    if (!name.trim() && !message.trim()) return;

    const memory: StarMemory = {
      id: Date.now(),
      name: name.trim() || "A little star",
      message: message.trim(),
      date: new Date().toLocaleDateString(),
      visibility,
    };

    const updated = [memory, ...memories];

    setMemories(updated);

    setName("");
    setMessage("");
    setVisibility(DEFAULT_VISIBILITY);
    setShowForm(false);
  };

  const sharedMemories = memories.filter(
    (memory) => memory.visibility !== "private"
  );

  const myMemories = memories;

  return (
    <main className="little-stars-page">
      <div className="little-stars-sky" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <button
        className="category-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      <section className="category-hero little-stars-hero">
        <div className="category-symbol">
          <Star size={29} strokeWidth={1.25} />
        </div>

        <p className="category-eyebrow">LITTLE STARS</p>

        <h1>
          Loved for <span>always.</span>
        </h1>

        <p>
          For the little ones who were loved,
          <br />
          however briefly they were here.
        </p>
      </section>

      <section className="category-note">
        <Heart size={19} strokeWidth={1.35} />

        <p>
          A tiny life can leave an enormous love behind.
          <br />
          This space is for remembering that love.
        </p>
      </section>

      <section className="category-actions">
        <button
          className="category-primary-button"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          <span>Remember a little star</span>
        </button>

        <button
          className="category-secondary-button"
          type="button"
          onClick={() => navigate("/candle-room")}
        >
          Light a candle
        </button>
      </section>

      {showForm && (
        <section className="category-form-card">
          <div className="category-form-heading">
            <Star size={19} />

            <div>
              <h2>A place for their memory</h2>

              <p>
                You can use a name, a nickname, a date or simply
                "my little star."
              </p>
            </div>
          </div>

          <label>
            <span>Name or memory</span>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your little star..."
              maxLength={100}
            />
          </label>

          <label>
            <span>A few words</span>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write whatever you would like to remember..."
              rows={6}
              maxLength={2000}
            />
          </label>

          <VisibilitySelector
            value={visibility}
            onChange={setVisibility}
          />

          <div className="category-form-actions">
            <button
              type="button"
              className="category-cancel"
              onClick={() => {
                setShowForm(false);
                setName("");
                setMessage("");
                setVisibility(DEFAULT_VISIBILITY);
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="category-save"
              onClick={saveMemory}
              disabled={!name.trim() && !message.trim()}
            >
              Keep this memory
            </button>
          </div>
        </section>
      )}

      {/* =========================================================
          MY TRIBUTES
         ========================================================= */}

      <section className="star-memories">
        <div className="category-section-heading">
          <p>YOUR TRIBUTES</p>

          <h2>Little stars held close</h2>

          <span>
            Your tributes stay on this device unless you
            choose to share them.
          </span>
        </div>

        {myMemories.length === 0 ? (
          <div className="category-empty">
            <Star size={28} strokeWidth={1.2} />

            <h3>No memories here yet.</h3>

            <p>
              Whenever you are ready, this can be a quiet place
              for their memory.
            </p>
          </div>
        ) : (
          <div className="star-memory-grid">
            {myMemories.map((memory) => (
              <article
                className="star-memory-card"
                key={memory.id}
              >
                <div className="star-memory-icon">
                  <Star size={18} strokeWidth={1.3} />
                </div>

                <div className="star-memory-content">
                  <div className="star-memory-title-row">
                    <h3>{memory.name}</h3>

                    <span
                      className={`visibility-badge visibility-${memory.visibility}`}
                    >
                      {memory.visibility === "private" &&
                        "🔒 Private"}

                      {memory.visibility === "anonymous" &&
                        "👤 Anonymous"}

                      {memory.visibility === "public" &&
                        "🌎 Public"}
                    </span>
                  </div>

                  {memory.message && (
                    <p>{memory.message}</p>
                  )}

                  <small>{memory.date}</small>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          COMMUNITY TRIBUTES
         ========================================================= */}

      <section className="star-community-section">
        <div className="category-section-heading">
          <p>FROM THE LUNA COMMUNITY</p>

          <h2>Shared tributes</h2>

          <span>
            Tributes shared anonymously or publicly.
          </span>
        </div>

        {sharedMemories.length === 0 ? (
          <div className="category-empty">
            <Star size={28} strokeWidth={1.2} />

            <h3>No shared tributes yet.</h3>

            <p>
              A little light shared with others may help
              someone feel less alone.
            </p>
          </div>
        ) : (
          <div className="star-memory-grid">
            {sharedMemories.map((memory) => (
              <article
                className="star-memory-card"
                key={memory.id}
              >
                <div className="star-memory-icon">
                  <Star size={18} strokeWidth={1.3} />
                </div>

                <div className="star-memory-content">
                  <div className="star-memory-title-row">
                    <h3>{memory.name}</h3>

                    <span
                      className={`visibility-badge visibility-${memory.visibility}`}
                    >
                      {memory.visibility === "anonymous"
                        ? "👤 Anonymous"
                        : "🌎 Public"}
                    </span>
                  </div>

                  {memory.message && (
                    <p>{memory.message}</p>
                  )}

                  <small>{memory.date}</small>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="category-footer">
        <Star size={14} />
        <span>Some lights are never forgotten.</span>
      </footer>
    </main>
  );
}