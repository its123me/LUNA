import { useState } from "react";
import { Heart, X } from "lucide-react";

export default function Footer() {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <>
      <footer className="luna-footer">
        <div className="luna-footer-inner">
          <div className="luna-footer-symbol">☾</div>

          <p className="luna-footer-title">LUNA</p>

          <p className="luna-footer-text">
            A quiet little space for remembrance, love and the people we carry
            with us.
          </p>

          <div className="luna-footer-divider" />

          <button
            type="button"
            className="luna-support-button"
            onClick={() => setShowSupport(true)}
          >
            <Heart size={15} />
            <span>Support LUNA</span>
          </button>

          <p className="luna-footer-small">
            Completely optional · Your presence here already means something.
          </p>

          <div className="luna-footer-bottom">
            <span>© {new Date().getFullYear()} LUNA</span>
            <span>·</span>
            <span>A quiet place to remember</span>
          </div>
        </div>
      </footer>

      {showSupport && (
        <div
          className="luna-support-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowSupport(false);
            }
          }}
        >
          <div className="luna-support-modal">
            <button
              type="button"
              className="luna-support-close"
              onClick={() => setShowSupport(false)}
              aria-label="Close support window"
            >
              <X size={19} />
            </button>

            <div className="luna-support-icon">♡</div>

            <h2>Keep a little light glowing ✨</h2>

            <div className="luna-support-content">
              <p>
                LUNA is a quiet place created with love — for remembrance,
                healing, memories and the people we carry with us.
              </p>

              <p>
                If this space means something to you and you'd like to help
                keep it alive, you can leave a little contribution.
              </p>

              <p className="luna-support-optional">
                There is absolutely no obligation.
              </p>

              <p className="luna-support-thanks">
                Your presence here already means something. 🤍
              </p>
            </div>

            <div className="luna-paypal-area">
              <p className="luna-paypal-label">
                If you'd like to support LUNA
              </p>

              <img
                src="/images/paypal-qr.png"
                alt="PayPal QR code for supporting LUNA"
                className="luna-paypal-qr"
              />

              <p className="luna-paypal-hint">
                Scan with your phone to open PayPal.
              </p>
            </div>

            <p className="luna-support-footer">
              Thank you for helping keep this little space alive. 🌙
            </p>
          </div>
        </div>
      )}
    </>
  );
}