import {
  ArrowLeft,
  Clock,
  Heart,
  Moon,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type MissedMemory = {
  id: number;
  title: string;
  message: string;
  date: string;
};

const STORAGE_KEY = "luna-those-we-miss";

export default function ThoseWeMiss() {
  const navigate = useNavigate();

  const [memories, setMemories] = useLocalStorage<MissedMemory[]>(
    STORAGE_KEY,
    []
  );

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const saveMemory = () => {
    if (!title.trim() && !message.trim()) return;

    const memory: MissedMemory = {
      id: Date.now(),
      title: title.trim() || "Someone I still miss",
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
    <main className="miss-page">
      <div className="miss-atmosphere" aria-hidden="true">
        <span className="miss-glow miss-glow-one" />
        <span className="miss-glow miss-glow-two" />

        <span className="miss-star miss-star-one" />
        <span className="miss-star miss-star-two" />
        <span className="miss-star miss-star-three" />

        <div className="miss-moon">
          <Moon size={180} strokeWidth={0.35} />
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

      <section className="category-hero miss-hero">
        <div className="category-symbol miss-symbol">
          <Moon size={29} strokeWidth={1.2} />
        </div>

        <p className="category-eyebrow">THOSE WE MISS</p>

        <h1>
          Some distances <span>never feel small.</span>
        </h1>

        <p>
          For the people who are no longer part of your everyday life,
          <br />
          but still cross your mind.
        </p>
      </section>

      <section className="category-note miss-note">
        <Heart size={19} strokeWidth={1.25} />

        <p>
          Missing someone does not always mean they are gone forever.
          <br />
          Sometimes there was simply no goodbye.
        </p>
      </section>

      <section className="category-actions">
        <button
          className="category-primary-button miss-primary-button"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          <span>Write about someone</span>
        </button>

        <button
          className="category-secondary-button"
          type="button"
          onClick={() => navigate("/candle-room")}
        >
          <Send size={17} />
          <span>Light a candle</span>
        </button>
      </section>

      {showForm && (
        <section className="category-form-card miss-form-card">
          <div className="category-form-heading">
            <Moon size={19} />

            <div>
              <h2>A place for what was left unsaid</h2>

              <p>
                Write a memory, a message, or simply the words
                you wish you could have said.
              </p>
            </div>
          </div>

          <label>
            <span>Their name or a title</span>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Someone I still think about..."
              maxLength={120}
            />
          </label>

          <label>
            <span>Your words</span>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What would you like them to know?"
              rows={7}
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
              className="category-save miss-save"
              onClick={saveMemory}
              disabled={!title.trim() && !message.trim()}
            >
              Keep these words
            </button>
          </div>

          <p className="miss-private-note">
            <Sparkles size={13} />
            Saved privately on this device for now.
          </p>
        </section>
      )}

      <section className="miss-memories">
        <div className="category-section-heading">
          <p>STILL REMEMBERED</p>
          <h2>People who remain in your thoughts</h2>
        </div>

        {memories.length === 0 ? (
          <div className="category-empty miss-empty">
            <Clock size={28} strokeWidth={1.2} />

            <h3>No memories here yet.</h3>

            <p>
              Whenever you are ready, this can be a quiet place
              for someone you still miss.
            </p>
          </div>
        ) : (
          <div className="miss-memory-grid">
            {memories.map((memory) => (
              <article
                className="miss-memory-card"
                key={memory.id}
              >
                <div className="miss-memory-icon">
                  <Moon size={18} strokeWidth={1.2} />
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

      <section className="miss-closing">
        <Moon size={17} strokeWidth={1.15} />

        <p>
          Not every goodbye is spoken.
          <br />
          Not every connection disappears.
        </p>
      </section>

      <footer className="category-footer">
        <Moon size={14} />
        <span>Some people remain beneath the same moon.</span>
      </footer>
    </main>
  );
}