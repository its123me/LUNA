import {
  ArrowLeft,
  BookOpen,
  Feather,
  Flame,
  Heart,
  Plus,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type Memory = {
  id: number;
  title: string;
  message: string;
  date: string;
};

const STORAGE_KEY = "luna-those-who-left";

export default function ThoseWhoLeft() {
  const navigate = useNavigate();

  const [memories, setMemories] = useLocalStorage<Memory[]>(
    STORAGE_KEY,
    []
  );

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const saveMemory = () => {
    if (!title.trim() && !message.trim()) return;

    const memory: Memory = {
      id: Date.now(),
      title: title.trim() || "Someone I remember",
      message: message.trim(),
      date: new Date().toLocaleDateString(),
    };

    const updated = [memory, ...memories];

    setMemories(updated);

    setTitle("");
    setMessage("");
    setShowForm(false);
  };

  return (
    <main className="left-page">
      <div className="left-atmosphere" aria-hidden="true">
        <span className="left-glow left-glow-one" />
        <span className="left-glow left-glow-two" />

        <span className="left-light left-light-one" />
        <span className="left-light left-light-two" />
        <span className="left-light left-light-three" />

        <div className="left-feather">
          <Feather size={150} strokeWidth={0.45} />
        </div>
      </div>

      <button
        className="category-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      <section className="category-hero left-hero">
        <div className="category-symbol left-symbol">
          <Feather size={29} strokeWidth={1.15} />
        </div>

        <p className="category-eyebrow">THOSE WHO LEFT</p>

        <h1>
          Their story <span>continues in you.</span>
        </h1>

        <p>
          For the people whose lives became memories,
          <br />
          but whose love did not simply disappear.
        </p>
      </section>

      <section className="left-note">
        <Heart size={19} strokeWidth={1.25} />

        <p>
          We don't stop loving someone because they are gone.
          <br />
          We learn to carry their love in a different way.
        </p>
      </section>

      <section className="category-actions">
        <button
          className="left-primary-button"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          <BookOpen size={18} />
          <span>Remember someone</span>
        </button>

        <button
          className="category-secondary-button"
          type="button"
          onClick={() => navigate("/candle-room")}
        >
          <Flame size={17} />
          <span>Light a candle</span>
        </button>
      </section>

      {showForm && (
        <section className="category-form-card left-form-card">
          <div className="category-form-heading">
            <Heart size={19} />

            <div>
              <h2>A place for their story</h2>

              <p>
                Write a memory, something you loved about them,
                or anything you never want to forget.
              </p>
            </div>
          </div>

          <label>
            <span>Their name or memory</span>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Their name..."
              maxLength={120}
            />
          </label>

          <label>
            <span>Your memory</span>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell their story in your own words..."
              rows={8}
              maxLength={3000}
            />
          </label>

          <div className="category-form-actions">
            <button
              type="button"
              className="category-cancel"
              onClick={() => {
                setShowForm(false);
                setTitle("");
                setMessage("");
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="left-save"
              onClick={saveMemory}
              disabled={!title.trim() && !message.trim()}
            >
              Keep their memory
            </button>
          </div>

          <p className="left-private-note">
            <Sparkles size={13} />
            Saved privately on this device for now.
          </p>
        </section>
      )}

      <section className="left-memories">
        <div className="category-section-heading">
          <p>REMEMBERED WITH LOVE</p>
          <h2>Lives that still matter</h2>
        </div>

        {memories.length === 0 ? (
          <div className="category-empty left-empty">
            <Feather size={29} strokeWidth={1.1} />

            <h3>No memories have been placed here yet.</h3>

            <p>
              Whenever you are ready, this can become
              a quiet place for their story.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={16} />
              Remember someone
            </button>
          </div>
        ) : (
          <div className="left-memory-grid">
            {memories.map((memory) => (
              <article
                className="left-memory-card"
                key={memory.id}
              >
                <div className="left-memory-icon">
                  <Feather size={18} strokeWidth={1.2} />
                </div>

                <div>
                  <h3>{memory.title}</h3>

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

      <section className="left-ritual">
        <div className="left-ritual-icon">
          <Flame size={19} strokeWidth={1.25} />
        </div>

        <div>
          <h3>Keep a little light for them.</h3>

          <p>
            Sometimes a candle, a photograph, a song
            or a familiar story is enough to make someone
            feel close again.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/candle-room")}
        >
          Light a candle →
        </button>
      </section>

      <section className="left-closing">
        <Feather size={17} strokeWidth={1.15} />

        <p>
          They may no longer walk beside you,
          <br />
          but they are still part of your story.
        </p>
      </section>

      <footer className="category-footer">
        <Heart size={14} />
        <span>Love leaves traces.</span>
      </footer>
    </main>
  );
}