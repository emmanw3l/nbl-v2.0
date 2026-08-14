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
    // Check if NBL is already installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;

    if (isStandalone) {
      return;
    }

    // Don't show if the user already dismissed it this session
    const dismissed = sessionStorage.getItem("nbl-install-dismissed");

    if (dismissed) {
      return;
    }

    // Capture the browser's install event
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    // Show popup after 3 seconds
    const timer = window.setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => {
      window.clearTimeout(timer);

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;

    await installEvent.prompt();

    const { outcome } = await installEvent.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }

    setInstallEvent(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);

    sessionStorage.setItem(
      "nbl-install-dismissed",
      "true"
    );
  };

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