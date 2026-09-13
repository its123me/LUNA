
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  PenLine,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import VisibilitySelector from "../components/VisibilitySelector";
import type { Visibility } from "../types/visibility";
import { DEFAULT_VISIBILITY } from "../types/visibility";
import HeartParticles from "../components/HeartParticles";

type Story = {
  id: number;
  title: string;
  text: string;
  author: string;
  date: string;
  visibility: Visibility;
  loveCount?: number;
};

const STORAGE_KEY = "luna-stories";

const starterStories: Story[] = [
  {
    id: 1,
    title: "Some love never leaves",
    text: "There are people we no longer see, but somehow they remain part of the person we became.",
    author: "Anonymous",
    date: "A story shared with LUNA",
    visibility: "public",
    loveCount: 0,
  },
  {
    id: 2,
    title: "I still remember",
    text: "Sometimes remembering is not about holding on. It is simply acknowledging that something mattered.",
    author: "Anonymous",
    date: "A story shared with LUNA",
    visibility: "public",
    loveCount: 0,
  },
];

export default function Stories() {
  const navigate = useNavigate();

  const [stories, setStories] = useLocalStorage<Story[]>(
    STORAGE_KEY,
    starterStories
  );

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [visibility, setVisibility] =
    useState<Visibility>(DEFAULT_VISIBILITY);

  // Hearts after sharing a story
  const [showHearts, setShowHearts] = useState(false);

  // Which story is currently receiving love
  const [loveBurstStory, setLoveBurstStory] = useState<number | null>(
    null
  );

  const shareStory = () => {
    if (!title.trim() && !text.trim()) return;

    const newStory: Story = {
      id: Date.now(),
      title: title.trim() || "A story worth remembering",
      text: text.trim(),
      author:
        visibility === "anonymous"
          ? "Anonymous"
          : visibility === "public"
            ? "Anonymous"
            : "Private",
      date: "A story shared with LUNA",
      visibility,
      loveCount: 0,
    };

    setStories([newStory, ...stories]);

    // Clear form
    setTitle("");
    setText("");
    setVisibility(DEFAULT_VISIBILITY);
    setShowForm(false);

    // Beautiful heart moment
    setShowHearts(true);

    window.setTimeout(() => {
      setShowHearts(false);
    }, 5200);
  };

  const sendLove = (storyId: number) => {
    const updatedStories = stories.map((story) =>
      story.id === storyId
        ? {
            ...story,
            loveCount: (story.loveCount ?? 0) + 1,
          }
        : story
    );

    setStories(updatedStories);

    // Small heart burst around the action
    setLoveBurstStory(storyId);

    window.setTimeout(() => {
      setLoveBurstStory(null);
    }, 5200);
  };

  const sharedStories = stories.filter(
    (story) => story.visibility !== "private"
  );

  /*
   * The two starter stories are community examples.
   * Everything else was created by the user on this device.
   */
  const myStories = stories.filter(
    (story) => story.id !== 1 && story.id !== 2
  );

  return (
    <main className="stories-page">
      {/* =========================================================
          GLOBAL HEART ANIMATION
         ========================================================= */}

      <HeartParticles
        active={showHearts}
        count={6}
        variant="love"
      />

      {/* =========================================================
          BACK TO LUNA
         ========================================================= */}

      <button
        className="story-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      {/* =========================================================
          HERO
         ========================================================= */}

      <section className="stories-hero">
        <div className="story-symbol">
          <MessageCircle
            size={28}
            strokeWidth={1.3}
          />
        </div>

        <p className="story-eyebrow">
          STORIES FROM THE HEART
        </p>

        <h1>
          You are <span>not alone.</span>
        </h1>

        <p>
          Sometimes another person's words remind us
          <br />
          that our feelings are human too.
        </p>
      </section>

      {/* =========================================================
          SHARE STORY BUTTON
         ========================================================= */}

      <section className="story-actions">
        <button
          className="new-story-button"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          <PenLine size={19} />
          <span>Share your story</span>
        </button>
      </section>

      {/* =========================================================
          STORY FORM
         ========================================================= */}

      {showForm && (
        <section className="story-form-card">
          <div className="story-form-heading">
            <div className="story-form-icon">
              <Heart
                size={18}
                strokeWidth={1.5}
              />
            </div>

            <div>
              <h2>A story you want to share</h2>

              <p>
                Your story is private by default.
              </p>
            </div>
          </div>

          <label>
            <span>Title</span>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="A story from my heart..."
              maxLength={100}
            />
          </label>

          <label>
            <span>Your story</span>

            <textarea
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
              placeholder="Write whatever you feel ready to share..."
              rows={8}
              maxLength={3000}
            />
          </label>

          <VisibilitySelector
            value={visibility}
            onChange={setVisibility}
          />

          <div className="story-form-buttons">
            <button
              className="story-cancel"
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
              className="story-share"
              type="button"
              onClick={shareStory}
              disabled={!title.trim() && !text.trim()}
            >
              Share story
            </button>
          </div>
        </section>
      )}

      {/* =========================================================
          MY STORIES
         ========================================================= */}

      <section className="my-stories-section">
        <div className="story-section-heading">
          <p>YOUR STORIES</p>

          <h2>My stories</h2>

          <span>
            Your private stories stay visible only to you.
          </span>
        </div>

        {myStories.length === 0 ? (
          <div className="story-empty">
            <MessageCircle
              size={30}
              strokeWidth={1.2}
            />

            <h2>
              You haven't written a story yet.
            </h2>

            <p>
              Whenever you're ready, you can share something
              from your heart.
            </p>
          </div>
        ) : (
          <div className="story-list">
            {myStories.map((story) => (
              <article
                className="story-card"
                key={story.id}
              >
                <div className="story-card-icon">
                  <Heart
                    size={18}
                    strokeWidth={1.4}
                  />
                </div>

                <div className="story-card-content">
                  <div className="story-card-title-row">
                    <h2>{story.title}</h2>

                    <span
                      className={`visibility-badge visibility-${story.visibility}`}
                    >
                      {story.visibility === "private" &&
                        "🔒 Private"}

                      {story.visibility === "anonymous" &&
                        "👤 Anonymous"}

                      {story.visibility === "public" &&
                        "🌎 Public"}
                    </span>
                  </div>

                  <p>{story.text}</p>

                  <div className="story-card-meta">
                    <span>{story.author}</span>

                    <span>•</span>

                    <span>{story.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          COMMUNITY STORIES
         ========================================================= */}

      <section className="community-stories-section">
        <div className="story-section-heading">
          <p>FROM THE LUNA COMMUNITY</p>

          <h2>Shared stories</h2>

          <span>
            Stories shared anonymously or publicly.
          </span>
        </div>

        {sharedStories.length === 0 ? (
          <div className="story-empty">
            <MessageCircle
              size={30}
              strokeWidth={1.2}
            />

            <h2>No shared stories yet.</h2>

            <p>
              Stories shared anonymously or publicly can
              become a light for someone else.
            </p>
          </div>
        ) : (
          <div className="story-list">
            {sharedStories.map((story) => (
              <article
                className="story-card"
                key={story.id}
              >
                <div className="story-card-icon">
                  <Heart
                    size={18}
                    strokeWidth={1.4}
                  />
                </div>

                <div className="story-card-content">
                  <div className="story-card-title-row">
                    <h2>{story.title}</h2>

                    <span
                      className={`visibility-badge visibility-${story.visibility}`}
                    >
                      {story.visibility === "anonymous"
                        ? "👤 Anonymous"
                        : "🌎 Public"}
                    </span>
                  </div>

                  <p>{story.text}</p>

                  <div className="story-card-meta">
                    <span>
                      {story.visibility === "anonymous"
                        ? "Anonymous"
                        : story.author}
                    </span>

                    <span>•</span>

                    <span>{story.date}</span>
                  </div>

                  {/* =================================================
                      SEND LOVE
                     ================================================= */}

                  <div className="send-love-wrapper">
                    <button
                      className={`send-love-button ${
                        loveBurstStory === story.id
                          ? "send-love-active"
                          : ""
                      }`}
                      type="button"
                      onClick={() => sendLove(story.id)}
                      aria-label={`Send love to ${story.title}`}
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.4}
                      />

                      <span>Send Love</span>

                      {(story.loveCount ?? 0) > 0 && (
                        <span className="love-count">
                          {story.loveCount}
                        </span>
                      )}
                    </button>

                    {/* Small local heart burst */}
                    {loveBurstStory === story.id && (
                      <HeartParticles
                        active={true}
                        count={4}
                        variant="love"
                      />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
