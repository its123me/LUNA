import "../styles/memories.css";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import VisibilitySelector from "../components/VisibilitySelector";
import type { Visibility } from "../types/visibility";
import { DEFAULT_VISIBILITY } from "../types/visibility";
import HeartParticles from "../components/HeartParticles";

type Memory = {
  id: number;
  title: string;
  text: string;
  date: string;
  visibility: Visibility;
  loveCount?: number;
};

const STORAGE_KEY = "luna-memories";

export default function Memories() {
  const navigate = useNavigate();

  const [memories, setMemories] = useLocalStorage<Memory[]>(
    STORAGE_KEY,
    []
  );

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [visibility, setVisibility] =
    useState<Visibility>(DEFAULT_VISIBILITY);

  // Hearts after saving a memory
  const [showHearts, setShowHearts] = useState(false);

  // Which memory is receiving love
  const [loveBurstMemory, setLoveBurstMemory] = useState<number | null>(
    null
  );

  const saveMemory = () => {
    if (!title.trim() && !text.trim()) return;

    const memory: Memory = {
      id: Date.now(),
      title: title.trim() || "A precious memory",
      text: text.trim(),
      date: new Date().toLocaleDateString(),
      visibility,
      loveCount: 0,
    };

    setMemories([memory, ...memories]);

    // Clear form
    setTitle("");
    setText("");
    setVisibility(DEFAULT_VISIBILITY);
    setShowForm(false);

    // Floating hearts after saving
    setShowHearts(true);

    window.setTimeout(() => {
      setShowHearts(false);
    }, 5200);
  };

  const sendLove = (memoryId: number) => {
    const updatedMemories = memories.map((memory) =>
      memory.id === memoryId
        ? {
            ...memory,
            loveCount: (memory.loveCount ?? 0) + 1,
          }
        : memory
    );

    setMemories(updatedMemories);

    // Small heart burst
    setLoveBurstMemory(memoryId);

    window.setTimeout(() => {
      setLoveBurstMemory(null);
    }, 5200);
  };

  const deleteMemory = (id: number) => {
    const confirmed = window.confirm(
      "Delete this memory from this device?"
    );

    if (!confirmed) return;

    const updated = memories.filter(
      (memory) => memory.id !== id
    );

    setMemories(updated);
  };

  const sharedMemories = memories.filter(
    (memory) => memory.visibility !== "private"
  );

  const myMemories = memories;

  return (
    <main className="memories-page">
      {/* =========================================================
          GLOBAL HEART ANIMATION
         ========================================================= */}

      <HeartParticles
        active={showHearts}
        count={5}
        variant="love"
      />

      {/* =========================================================
          BACK
         ========================================================= */}

      <button
        className="memory-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      {/* =========================================================
          HERO
         ========================================================= */}

      <section className="memories-hero">
        <div className="memory-symbol">
          <Heart
            size={28}
            strokeWidth={1.3}
          />
        </div>

        <p className="memory-eyebrow">
          WHAT WE CARRY WITH US
        </p>

        <h1>
          Keep the <span>memories.</span>
        </h1>

        <p>
          Some moments deserve to stay close.
          <br />
          Write them down whenever you need to.
        </p>
      </section>

      {/* =========================================================
          ACTION
         ========================================================= */}

      <section className="memory-actions">
        <button
          className="new-memory-button"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={19} />
          <span>Write a memory</span>
        </button>
      </section>

      {/* =========================================================
          MEMORY FORM
         ========================================================= */}

      {showForm && (
        <section className="memory-form-card">
          <div className="memory-form-heading">
            <h2>A memory worth keeping</h2>

            <p>
              Your memory is private by default.
            </p>
          </div>

          <label>
            <span>Title</span>

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="A beautiful day..."
              maxLength={100}
            />
          </label>

          <label>
            <span>Your memory</span>

            <textarea
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
              placeholder="Write whatever your heart remembers..."
              rows={7}
              maxLength={2000}
            />
          </label>

          <VisibilitySelector
            value={visibility}
            onChange={setVisibility}
          />

          <div className="memory-form-buttons">
            <button
              className="memory-cancel"
              type="button"
              onClick={() => {
                setShowForm(false);
                setTitle("");
                setText("");
                setVisibility(DEFAULT_VISIBILITY);
              }}
            >
              Cancel
            </button>

            <button
              className="memory-save"
              type="button"
              onClick={saveMemory}
              disabled={!title.trim() && !text.trim()}
            >
              Save memory
            </button>
          </div>
        </section>
      )}

      {/* =========================================================
          MY MEMORIES
         ========================================================= */}

      <section className="my-memories-section">
        <div className="memory-section-heading">
          <p>YOUR MEMORIES</p>

          <h2>My memories</h2>

          <span>
            Your memories stay on this device unless you choose
            to share them.
          </span>
        </div>

        {myMemories.length === 0 ? (
          <div className="memory-empty">
            <Heart
              size={30}
              strokeWidth={1.2}
            />

            <h2>No memories written yet.</h2>

            <p>
              Whenever you're ready, you can leave a little piece
              of your story here.
            </p>
          </div>
        ) : (
          <div className="memory-list">
            {myMemories.map((memory) => (
              <article
                className="memory-card"
                key={memory.id}
              >
                <div className="memory-card-top">
                  <div>
                    <div className="memory-title-row">
                      <h2>{memory.title}</h2>

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

                    <small>{memory.date}</small>
                  </div>

                  <button
                    className="delete-memory"
                    type="button"
                    aria-label="Delete memory"
                    onClick={() =>
                      deleteMemory(memory.id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                {memory.text && (
                  <p>{memory.text}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          COMMUNITY MEMORIES
         ========================================================= */}

      <section className="community-memories-section">
        <div className="memory-section-heading">
          <p>FROM THE LUNA COMMUNITY</p>

          <h2>Shared memories</h2>

          <span>
            Memories shared anonymously or publicly.
          </span>
        </div>

        {sharedMemories.length === 0 ? (
          <div className="memory-empty">
            <Heart
              size={30}
              strokeWidth={1.2}
            />

            <h2>No shared memories yet.</h2>

            <p>
              A memory shared with others may become a small
              light for someone else.
            </p>
          </div>
        ) : (
          <div className="memory-list">
            {sharedMemories.map((memory) => (
              <article
                className="memory-card community-memory-card"
                key={memory.id}
              >
                <div className="memory-card-top">
                  <div>
                    <div className="memory-title-row">
                      <h2>{memory.title}</h2>

                      <span
                        className={`visibility-badge visibility-${memory.visibility}`}
                      >
                        {memory.visibility === "anonymous"
                          ? "👤 Anonymous"
                          : "🌎 Public"}
                      </span>
                    </div>

                    <small>{memory.date}</small>
                  </div>
                </div>

                {memory.text && (
                  <p>{memory.text}</p>
                )}

                {/* =================================================
                    SEND LOVE
                   ================================================= */}

                <div className="send-love-wrapper">
                  <button
                    className={`send-love-button ${
                      loveBurstMemory === memory.id
                        ? "send-love-active"
                        : ""
                    }`}
                    type="button"
                    onClick={() => sendLove(memory.id)}
                    aria-label={`Send love to ${memory.title}`}
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.4}
                    />

                    <span>Send Love</span>

                    {(memory.loveCount ?? 0) > 0 && (
                      <span className="love-count">
                        {memory.loveCount}
                      </span>
                    )}
                  </button>

                  {loveBurstMemory === memory.id && (
                    <HeartParticles
                      active={true}
                      count={4}
                      variant="love"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}