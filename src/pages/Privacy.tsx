import {
  ArrowLeft,
  Download,
  Eye,
  Heart,
  Lock,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  clearLunaData,
  exportLunaData,
} from "../utils/privacy";

export default function Privacy() {
  const navigate = useNavigate();

  const handleClearData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all LUNA data stored on this device? This cannot be undone."
    );

    if (!confirmed) return;

    clearLunaData();

    window.alert("Your LUNA data has been deleted from this device.");
  };

  const handleExport = () => {
    exportLunaData();

    window.alert("Your LUNA data has been exported.");
  };

  return (
    <main className="privacy-page">
      <div className="privacy-atmosphere" aria-hidden="true">
        <span className="privacy-glow privacy-glow-one" />
        <span className="privacy-glow privacy-glow-two" />
      </div>

      <button
        className="category-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      <section className="privacy-hero">
        <div className="privacy-symbol">
          <ShieldCheck size={29} strokeWidth={1.25} />
        </div>

        <p className="privacy-eyebrow">YOUR PRIVACY MATTERS</p>

        <h1>
          Your memories belong <span>to you.</span>
        </h1>

        <p>
          LUNA is designed to give your memories a quiet,
          private place to exist.
          <br />
          You should always know what happens to your data.
        </p>
      </section>

      <section className="privacy-grid">
        <article className="privacy-card">
          <div className="privacy-card-icon">
            <Lock size={20} strokeWidth={1.3} />
          </div>

          <h2>Private by default</h2>

          <p>
            In this current version of LUNA, your memories,
            candles and stories are stored locally on your
            device.
          </p>
        </article>

        <article className="privacy-card">
          <div className="privacy-card-icon">
            <Eye size={20} strokeWidth={1.3} />
          </div>

          <h2>No hidden sharing</h2>

          <p>
            Your local memories are not automatically published
            or shared with other people.
          </p>
        </article>

        <article className="privacy-card">
          <div className="privacy-card-icon">
            <Heart size={20} strokeWidth={1.3} />
          </div>

          <h2>Your memories matter</h2>

          <p>
            LUNA should never make you feel pressured to reveal
            something deeply personal just to use the space.
          </p>
        </article>
      </section>

      <section className="privacy-data-card">
        <div className="privacy-data-heading">
          <div className="privacy-card-icon">
            <ShieldCheck size={20} strokeWidth={1.3} />
          </div>

          <div>
            <p>YOUR DATA</p>
            <h2>Manage what LUNA stores</h2>
          </div>
        </div>

        <div className="privacy-actions">
          <button
            type="button"
            className="privacy-action export"
            onClick={handleExport}
          >
            <Download size={18} />

            <span>
              <strong>Export my data</strong>
              <small>Download your LUNA memories as a file.</small>
            </span>
          </button>

          <button
            type="button"
            className="privacy-action delete"
            onClick={handleClearData}
          >
            <Trash2 size={18} />

            <span>
              <strong>Delete all my data</strong>
              <small>
                Remove LUNA data stored on this device.
              </small>
            </span>
          </button>
        </div>
      </section>

      <section className="privacy-principles">
        <p className="privacy-section-label">OUR PRINCIPLES</p>

        <div className="privacy-principle">
          <span>01</span>
          <div>
            <h3>Privacy before engagement</h3>
            <p>
              Your grief is not something that should be turned
              into a popularity contest.
            </p>
          </div>
        </div>

        <div className="privacy-principle">
          <span>02</span>
          <div>
            <h3>Choice before exposure</h3>
            <p>
              Future public features will clearly distinguish
              private, anonymous and public content.
            </p>
          </div>
        </div>

        <div className="privacy-principle">
          <span>03</span>
          <div>
            <h3>Control should remain with you</h3>
            <p>
              You should be able to understand, export and
              delete your own content.
            </p>
          </div>
        </div>
      </section>

      <section className="privacy-note">
        <ShieldCheck size={18} strokeWidth={1.3} />

        <p>
          <strong>Current version:</strong> LUNA currently uses
          local device storage for these features. When a real
          online community is added, we will build the privacy
          and consent system before public sharing is enabled.
        </p>
      </section>

      <footer className="privacy-footer">
        <Heart size={14} />
        <span>A quiet place should also be a safe place.</span>
      </footer>
    </main>
  );
}