import { useEffect, useRef, useState } from "react";

// From your Kit embed code
const KIT_FORM_UID = "489b0c6f54";
const KIT_FORM_SRC = "https://briefpage-archive.kit.com/489b0c6f54/index.js";

function ClosedPage({ onPassword }) {
  const formBox = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [attempt, setAttempt] = useState("");
  const [wrong, setWrong] = useState(false);

  // Kit's script draws the signup form where the script sits. React ignores
  // <script> tags written in JSX, so we add it by hand.
  useEffect(() => {
    const box = formBox.current;
    if (!box || box.querySelector("script")) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-uid", KIT_FORM_UID);
    script.src = KIT_FORM_SRC;
    box.appendChild(script);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onPassword(attempt)) {
      setWrong(true);
    }
  };

  return (
    <div className="closed-page">
      <div className="brand-marquee">
        <div className="marquee-track">
          <span>BRIEFPAGE</span>
          <span>BRIEFPAGE</span>
          <span>BRIEFPAGE</span>
          <span>BRIEFPAGE</span>
        </div>
      </div>

      <main className="closed-main">
        <div className="closed-box">
          <p className="closed-message">Website is closed.</p>
          <p className="closed-sub">
            Leave your email to hear about the launch and updates from
            BRIEFPAGE ARCHIVE.
          </p>

          <div className="closed-form" ref={formBox}></div>
        </div>
      </main>

      <footer className="closed-footer">
        {showPassword ? (
          <form className="password-form" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Password"
              value={attempt}
              onChange={(e) => {
                setAttempt(e.target.value);
                setWrong(false);
              }}
              autoFocus
            />
            <button type="submit">ENTER</button>

            {wrong && <p className="password-error">Wrong password.</p>}
          </form>
        ) : (
          <button
            type="button"
            className="password-link"
            onClick={() => setShowPassword(true)}
          >
            I HAVE A PASSWORD
          </button>
        )}
      </footer>
    </div>
  );
}

export default ClosedPage;