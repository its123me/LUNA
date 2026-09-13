import {
  ArrowLeft,
  BookOpen,
  Heart,
  Leaf,
  MessageCircle,
  Moon,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const gentlePractices = [
  {
    icon: Moon,
    title: "Give yourself permission",
    text: "You do not have to be okay today. Grief can exist alongside ordinary moments, laughter, anger, love and everything in between.",
  },
  {
    icon: Leaf,
    title: "Take one small moment",
    text: "Drink some water. Step outside. Take a breath. Sometimes healing begins with something very small.",
  },
  {
    icon: Heart,
    title: "Stay connected",
    text: "You don't have to explain everything. Sometimes simply being near someone safe can be enough.",
  },
  {
    icon: Sparkles,
    title: "Remember in your own way",
    text: "A candle, a photograph, a song, a letter or a quiet ritual can give love somewhere to go.",
  },
];

const reflectionPrompts = [
  "What is something about them you never want to forget?",
  "What would you say if you could have five more minutes together?",
  "What memory makes you smile, even for a moment?",
  "What do you wish other people understood about your grief?",
];

export default function Healing() {
  const navigate = useNavigate();

  return (
    <main className="healing-page">
      <button
        className="healing-back"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        <span>Back to LUNA</span>
      </button>

      <section className="healing-hero">
        <div className="healing-symbol">
          <Leaf size={28} strokeWidth={1.3} />
        </div>

        <p className="healing-eyebrow">A GENTLE PLACE TO PAUSE</p>

        <h1>
          Healing has <span>no timeline.</span>
        </h1>

        <p>
          You don't have to rush through grief.
          <br />
          There is no right way to carry what you have lost.
        </p>
      </section>

      <section className="healing-note">
        <Heart size={19} strokeWidth={1.4} />

        <div>
          <h2>You are allowed to feel what you feel.</h2>
          <p>
            Grief is not a straight line. Some days may feel lighter and
            others may feel unexpectedly heavy. Both belong.
          </p>
        </div>
      </section>

      <section className="healing-section">
        <div className="healing-heading">
          <p>GENTLE PRACTICES</p>
          <h2>Small things that may help</h2>
        </div>

        <div className="healing-practices">
          {gentlePractices.map((practice) => {
            const Icon = practice.icon;

            return (
              <article className="healing-practice" key={practice.title}>
                <div className="healing-practice-icon">
                  <Icon size={20} strokeWidth={1.4} />
                </div>

                <div>
                  <h3>{practice.title}</h3>
                  <p>{practice.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="reflection-card">
        <div className="reflection-icon">
          <BookOpen size={21} strokeWidth={1.4} />
        </div>

        <div className="reflection-content">
          <p className="reflection-eyebrow">FOR YOUR JOURNAL</p>

          <h2>You don't have to answer everything.</h2>

          <p>
            Choose one question if something inside you wants to be heard.
          </p>

          <div className="reflection-list">
            {reflectionPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt}
                onClick={() => navigate("/memories")}
              >
                <span>♡</span>
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="support-card">
        <div className="support-card-icon">
          <MessageCircle size={21} strokeWidth={1.4} />
        </div>

        <div>
          <p className="support-eyebrow">WHEN YOU NEED MORE SUPPORT</p>

          <h2>You don't have to carry everything alone.</h2>

          <p>
            Talking with someone you trust, a grief counselor, therapist or
            support group can be an important part of your journey.
          </p>

          <button
            type="button"
            className="support-button"
            onClick={() => navigate("/quiet-room")}
          >
            Visit the Quiet Room
          </button>
        </div>
      </section>

      <p className="healing-footer">
        <Sparkles size={15} />
        LUNA is a place for remembrance and reflection, not a replacement for
        professional care.
      </p>
    </main>
  );
}