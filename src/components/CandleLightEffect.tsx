import { Flame } from "lucide-react";

type CandleLightEffectProps = {
  message?: string;
  onClose: () => void;
};

export default function CandleLightEffect({
  message,
  onClose,
}: CandleLightEffectProps) {
  return (
    <div
      className="candle-ritual"
      role="dialog"
      aria-modal="true"
      aria-label="Candle lit"
      onClick={onClose}
    >
      <div
        className="candle-ritual-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ritual-stars" aria-hidden="true">
          <span>✦</span>
          <span>·</span>
          <span>✧</span>
          <span>·</span>
          <span>✦</span>
          <span>·</span>
        </div>

        <div className="ritual-candle">
          <div className="ritual-glow" />

          <div className="ritual-flame">
            <div className="ritual-flame-inner" />
          </div>

          <div className="ritual-wick" />
          <div className="ritual-candle-body" />
        </div>

        <div className="ritual-message">
          <Flame size={16} strokeWidth={1.3} />

          <h2>Your light is here.</h2>

          <p>
            {message ||
              "For someone remembered. For someone loved."}
          </p>
        </div>

        <button
          type="button"
          className="ritual-close"
          onClick={onClose}
        >
          Stay a moment
        </button>
      </div>
    </div>
  );
}