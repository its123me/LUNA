import {
  ArrowLeft,
  Heart,
  PenLine,
  Plus,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import VisibilitySelector from "../components/VisibilitySelector";
import type { Visibility } from "../types/visibility";
import { DEFAULT_VISIBILITY } from "../types/visibility";

type LoveMemory = {
  id: number;
  title: string;
  message: string;
  date: string;
  visibility: Visibility;
};

const STORAGE_KEY = "luna-love-memories";

export default function Love() {
  const navigate = useNavigate();

  const [memories, setMemories] = useLocalStorage<LoveMemory[]>(
    STORAGE_KEY,
    []
  );

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] =
    useState<Visibility>(DEFAULT_VISIBILITY);

  const saveMemory = () => {
    if (!title.trim() && !message.trim()) return;

    const memory: LoveMemory = {
      id: Date.now(),
      title: title.trim() || "A love remembered",
      message: message.trim(),
      date: new Date().toLocaleDateString(),
      visibility,
    };

    setMemories([memory, ...memories]);

    setTitle("");
    setMessage("");
    setVisibility(DEFAULT_VISIBILITY);
    setShowForm(false);
  };

  const sharedMemories = memories.filter(
    (memory) => memory.visibility !== "private"
  );

  const myMemories = memories;

  return (
    <main className="love-page">
      <div className="love-atmosphere" aria-hidden="true">
        <span className="love-glow love-glow-one" />
        <span className="love-glow love-glow-two" />

        <span className="love-heart love-heart-one">♡</span>
        <span className="love-heart love-heart-two">♡</span>
        <span className="love-heart love-heart-three">♡</span>
      </div>

      <button
        className="category-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      <section className="category-hero love-hero">
        <div className="category-symbol love-symbol">
          <Heart size={29} strokeWidth={1.2} />
        </div>

        <p className="category-eyebrow">LOVE</p>

        <h1>
          Some love <span>stays.</span>
        </h1>

        <p>
          For a love that changed you,
          <br />
          even if the story did not last forever.
        </p>
      </section>

      <section className="category-note love-note">
        <Heart size={19} strokeWidth={1.3} />

        <p>
          Not every love story has the ending we hoped for.
          <br />
          That does not make the love any less real.
        </p>
      </section>

      <section className="category-actions">
        <button
          className="category-primary-button love-primary-button"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          <span>Remember a love</span>
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
        <section className="category-form-card love-form-card">
          <div className="category-form-heading">
            <PenLine size={19} />

            <div>
              <h2>A place for your love story</h2>

              <p>
                Write about someone you loved, a moment you shared,
                or something you still carry with you.
              </p>
            </div>
          </div>

          <label>
            <span>A name or title</span>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="A name, a place, a memory..."
              maxLength={120}
            />
          </label>

          <label>
            <span>Your memory</span>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write whatever your heart wants to remember..."
              rows={7}
              maxLength={3000}
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
                setTitle("");
                setMessage("");
                setVisibility(DEFAULT_VISIBILITY);
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="category-save love-save"
              onClick={saveMemory}
              disabled={!title.trim() && !message.trim()}
            >
              Keep this memory
            </button>
          </div>

          <p className="love-private-note">
            <Sparkles size={13} />
            Private by default. You choose if this memory is shared.
          </p>
        </section>
      )}

      <section className="love-memories">
        <div className="category-section-heading">
          <p>REMEMBERED WITH LOVE</p>
          <h2>My love memories</h2>
          <span>
            Your memories stay on this device unless you choose to
            share them.
          </span>
        </div>

        {myMemories.length === 0 ? (
          <div className="category-empty love-empty">
            <Heart size={28} strokeWidth={1.2} />

            <h3>No memories here yet.</h3>

            <p>
              Whenever you are ready, this can become a quiet
              place for a love that mattered.
            </p>
          </div>
        ) : (
          <div className="love-memory-grid">
            {myMemories.map((memory) => (
              <article
                className="love-memory-card"
                key={memory.id}
              >
                <div className="love-memory-icon">
                  <Heart size={18} strokeWidth={1.25} />
                </div>

                <div className="love-memory-content">
                  <div className="love-memory-title-row">
                    <h3>{memory.title}</h3>

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

      <section className="love-community-section">
        <div className="category-section-heading">
          <p>FROM THE LUNA COMMUNITY</p>
          <h2>Shared love stories</h2>
          <span>
            Memories shared anonymously or publicly.
          </span>
        </div>

        {sharedMemories.length === 0 ? (
          <div className="category-empty love-empty">
            <Heart size={28} strokeWidth={1.2} />

            <h3>No shared memories yet.</h3>

            <p>
              A love story shared with others may become a
              little light for someone who needs it.
            </p>
          </div>
        ) : (
          <div className="love-memory-grid">
            {sharedMemories.map((memory) => (
              <article
                className="love-memory-card community-love-card"
                key={memory.id}
              >
                <div className="love-memory-icon">
                  <Heart size={18} strokeWidth={1.25} />
                </div>

                <div className="love-memory-content">
                  <div className="love-memory-title-row">
                    <h3>{memory.title}</h3>

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

      <section className="love-closing">
        <Heart size={17} strokeWidth={1.2} />

        <p>
          Some people become part of our past.
          <br />
          Some become part of who we are.
        </p>
      </section>

      <footer className="category-footer">
        <Heart size={14} />
        <span>Love leaves traces.</span>
      </footer>
    </main>
  );
}