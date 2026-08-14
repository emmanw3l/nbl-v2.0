import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if the current tab is running as the installed app
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;

    // Check if we've previously recorded a successful install — this
    // persists across sessions/tabs, unlike isStandalone, which only
    // reflects *this* tab's current display mode.
    const alreadyInstalled = localStorage.getItem("nbl-installed") === "true";

    if (isStandalone) {
      // Mark it so future non-standalone visits (e.g. opening a link in
      // a regular browser tab) also stay quiet.
      localStorage.setItem("nbl-installed", "true");
      return;
    }

    if (alreadyInstalled) {
      return;
    }

    // Don't show if the user already dismissed it this session
    const dismissed = sessionStorage.getItem("nbl-install-dismissed");

    if (dismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    // Fires once the user actually completes installation — whether they
    // used your button or the browser's own install UI (e.g. address bar
    // icon on desktop Chrome).
    const handleAppInstalled = () => {
      localStorage.setItem("nbl-installed", "true");
      setShowPrompt(false);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    const timer = window.setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;

    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
      // appinstalled will also fire and set localStorage, but setting it
      // here too avoids any timing gap
      localStorage.setItem("nbl-installed", "true");
    }

    setInstallEvent(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("nbl-install-dismissed", "true");
  };

  if (!showPrompt) {
    return null;
  }

  if (!showPrompt) {
    return null;
  }

  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x mb-3 px-3"
      style={{
        zIndex: 1080,
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
        style={{
          backgroundColor: "#e2d7db",
          color: "#5f3205",
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-start gap-3">

            {/* Icon */}
            <div
              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "#5f3205",
              }}
            >
              <i
                className="bi bi-download text-white fs-4"
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="flex-grow-1">
              <h5 className="fw-bold mb-1">
                Install Naija Book Lovers
              </h5>

              <p className="mb-3 small">
                Add NBL to your home screen for quick access
                to poems, prompts and authors.
              </p>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm px-3"
                  style={{
                    backgroundColor: "#5f3205",
                    color: "#fff",
                  }}
                  onClick={handleInstall}
                  disabled={!installEvent}
                >
                  <i className="bi bi-download me-1" />
                  Install
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary px-3"
                  onClick={handleDismiss}
                >
                  Not now
                </button>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleDismiss}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
