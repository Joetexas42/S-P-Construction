import { useState, useEffect } from "react";

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-gray-200 flex-1">
          We use cookies to improve your experience on our site. By continuing to browse, you agree to our{" "}
          <a href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm px-4 py-2 rounded transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleDismiss}
            className="bg-transparent hover:bg-gray-700 border border-gray-500 text-gray-300 hover:text-white text-sm px-4 py-2 rounded transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
