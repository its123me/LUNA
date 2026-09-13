import { Lock, Globe, UserRound } from "lucide-react";
import type { Visibility } from "../types/visibility";

type VisibilitySelectorProps = {
  value: Visibility;
  onChange: (visibility: Visibility) => void;
};

const options: {
  value: Visibility;
  label: string;
  description: string;
  icon: typeof Lock;
}[] = [
  {
    value: "private",
    label: "Private",
    description: "Only you can see this.",
    icon: Lock,
  },
  {
    value: "anonymous",
    label: "Anonymous",
    description: "Shared without your identity.",
    icon: UserRound,
  },
  {
    value: "public",
    label: "Public",
    description: "Visible as a LUNA contribution.",
    icon: Globe,
  },
];

export default function VisibilitySelector({
  value,
  onChange,
}: VisibilitySelectorProps) {
  return (
    <div className="visibility-selector">
      <div className="visibility-heading">
        <span>Who can see this?</span>
        <small>Private by default</small>
      </div>

      <div className="visibility-options">
        {options.map((option) => {
          const Icon = option.icon;
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              className={`visibility-option ${
                selected ? "selected" : ""
              }`}
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
            >
              <span className="visibility-icon">
                <Icon size={17} strokeWidth={1.5} />
              </span>

              <span className="visibility-copy">
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>

              <span className="visibility-radio">
                {selected && <span />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}