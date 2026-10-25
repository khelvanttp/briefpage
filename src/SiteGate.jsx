import { useState } from "react";
import ClosedPage from "./ClosedPage.jsx";

// Set in Vercel (or in a local .env.local file).
// Anything other than "true" means the site is open.
const SITE_CLOSED =
  (import.meta.env.VITE_SITE_CLOSED || "").toLowerCase() === "true";
const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "";
const STORAGE_KEY = "briefpage-unlocked";

function SiteGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "yes";
    } catch {
      return false;
    }
  });

  if (!SITE_CLOSED || unlocked) {
    return children;
  }

  const tryPassword = (attempt) => {
    if (SITE_PASSWORD && attempt.trim() === SITE_PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, "yes");
      } catch {
        // storage unavailable (private mode): stays unlocked until refresh
      }
      setUnlocked(true);
      return true;
    }
    return false;
  };

  return <ClosedPage onPassword={tryPassword} />;
}

export default SiteGate;