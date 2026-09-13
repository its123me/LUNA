import "../styles/privacy.css";
import {
  ArrowLeft,
  Download,
  Eye,
  Heart,
  Lock,
  ShieldCheck,
  Trash2,
  Sparkles,
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

    window.alert(
      "Your LUNA data has been deleted from this device."
    );
  };

  const handleExport = () => {
    exportLunaData();

    window.alert(
      "Your memories are safely copied. 🌙\n\nYour private LUNA backup has been downloaded to your device."
    );
  };

  return (
    <main className="privacy-page">
      {/* =========================================================
          ATMOSPHERE
         ========================================================= */}

      <div
        className="privacy-atmosphere"
        aria-hidden="true"
      >
        <span className="privacy-glow privacy-glow-one" />
        <span className="privacy-glow privacy-glow-two" />

        <div className="privacy-stars">
          <span>✦</span>
          <span>·</span>
          <span>✧</span>
          <span>·</span>
          <span>✦</span>
        </div>
      </div>

      {/* =========================================================
          BACK
         ========================================================= */}

      <button
        className="category-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      {/* =========================================================
          HERO
         ========================================================= */}

      <section className="privacy-hero">
        <div className="privacy-symbol">
          <ShieldCheck
            size={29}
            strokeWidth={1.25}
          />
        </div>

        <p className="privacy-eyebrow">
          YOUR PRIVACY MATTERS
        </p>

        <h1>
          Your memories belong{" "}
          <span>to you.</span>
        </h1>

        <p>
          LUNA is designed to give your memories
          <br />
          a quiet and private place to exist.
        </p>
      </section>

      {/* =========================================================
          PRIVACY PRINCIPLES
         ========================================================= */}

      <section className="privacy-grid">
        <article className="privacy-card">
          <div className="privacy-card-icon">
            <Lock
              size={20}
              strokeWidth={1.3}
            />
          </div>

          <h2>Private by default</h2>

          <p>
            Your memories, candles and stories are
            currently stored locally on your device.
          </p>
        </article>

        <article className="privacy-card">
          <div className="privacy-card-icon">
            <Eye
              size={20}
              strokeWidth={1.3}
            />
          </div>

          <h2>No hidden sharing</h2>

          <p>
            Your local memories are not automatically
            published or shared with anyone.
          </p>
        </article>

        <article className="privacy-card">
          <div className="privacy-card-icon">
            <Heart
              size={20}
              strokeWidth={1.3}
            />
          </div>

          <h2>Your memories matter</h2>

          <p>
            You should never have to reveal something
            deeply personal just to use LUNA.
          </p>
        </article>
      </section>

      {/* =========================================================
          DATA / BACKUP
         ========================================================= */}

      <section className="privacy-data-card">
        <div className="privacy-data-heading">
          <div className="privacy-card-icon">
            <Download
              size={20}
              strokeWidth={1.3}
            />
          </div>

          <div>
            <p>KEEP WHAT MATTERS</p>

            <h2>
              Keep a copy of your memories
            </h2>
          </div>
        </div>

        <div className="privacy-backup-intro">
          <Sparkles
            size={18}
            strokeWidth={1.25}
          />

          <p>
            Your LUNA memories live quietly on this
            device. If you ever want a second copy,
            you can save a private backup whenever
            you wish.
          </p>
        </div>

        <div className="privacy-backup-box">
          <div className="privacy-backup-icon">
            <Heart
              size={22}
              strokeWidth={1.25}
            />
          </div>

          <div className="privacy-backup-content">
            <h3>
              A little safety for what matters
            </h3>

            <p>
              Your backup contains the LUNA data
              stored on this device, including
              memories, stories and other saved
              content.
            </p>

            <span className="privacy-backup-note">
              🔒 The backup is created on your device
              and is not uploaded by LUNA.
            </span>
          </div>
        </div>

        <div className="privacy-actions">
          <button
            type="button"
            className="privacy-action export"
            onClick={handleExport}
          >
            <Download
              size={18}
              strokeWidth={1.5}
            />

            <span>
              <strong>
                Download my LUNA backup
              </strong>

              <small>
                Save a private copy of your data.
              </small>
            </span>
          </button>
        </div>
      </section>

      {/* =========================================================
          DELETE DATA
         ========================================================= */}

      <section className="privacy-delete-card">
        <div className="privacy-delete-heading">
          <div className="privacy-delete-icon">
            <Trash2
              size={19}
              strokeWidth={1.4}
            />
          </div>

          <div>
            <p>WHEN YOU ARE READY</p>

            <h2>
              Delete your LUNA data
            </h2>
          </div>
        </div>

        <p className="privacy-delete-text">
          You can remove the LUNA data stored on
          this device at any time. This cannot be
          undone.
        </p>

        <button
          type="button"
          className="privacy-action delete"
          onClick={handleClearData}
        >
          <Trash2
            size={18}
            strokeWidth={1.5}
          />

          <span>
            <strong>
              Delete all my data
            </strong>

            <small>
              Permanently remove LUNA data from
              this device.
            </small>
          </span>
        </button>
      </section>

      {/* =========================================================
          PRINCIPLES
         ========================================================= */}

      <section className="privacy-principles">
        <p className="privacy-section-label">
          THE LUNA PROMISE
        </p>

        <div className="privacy-principle">
          <span>01</span>

          <div>
            <h3>
              Privacy before engagement
            </h3>

            <p>
              Your grief is not something that
              should be turned into a popularity
              contest.
            </p>
          </div>
        </div>

        <div className="privacy-principle">
          <span>02</span>

          <div>
            <h3>
              Choice before exposure
            </h3>

            <p>
              When public features arrive, privacy
              choices will always be clearly
              explained.
            </p>
          </div>
        </div>

        <div className="privacy-principle">
          <span>03</span>

          <div>
            <h3>
              Control stays with you
            </h3>

            <p>
              You should always be able to understand,
              save and delete your own content.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CURRENT VERSION NOTE
         ========================================================= */}

      <section className="privacy-note">
        <ShieldCheck
          size={18}
          strokeWidth={1.3}
        />

        <p>
          <strong>Current version:</strong>{" "}
          LUNA currently uses local device storage
          for these features. When an online community
          is added, privacy, consent and data protection
          will be designed before public sharing is
          enabled.
        </p>
      </section>

      {/* =========================================================
          FOOTER
         ========================================================= */}

      <footer className="privacy-footer">
        <Heart
          size={14}
          strokeWidth={1.4}
        />

        <span>
          A quiet place should also be a safe place.
        </span>
      </footer>
    </main>
  );
}

