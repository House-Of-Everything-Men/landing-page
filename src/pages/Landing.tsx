import { useEffect, useMemo, useState } from "react";

export default function EverythingMenLanding() {
  const [hideLogo, setHideLogo] = useState(false);
  const logoCandidates = useMemo(() => ["/everything men-05.png"], []);
  const [logoIndex, setLogoIndex] = useState<number | null>(null);
  const logoSrc = logoIndex !== null ? logoCandidates[logoIndex] : null;
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  // Preload to find the first available logo and avoid flicker
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < logoCandidates.length; i++) {
        const src = logoCandidates[i];
        const ok = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        });
        if (cancelled) return;
        if (ok) {
          setLogoIndex(i);
          return;
        }
      }
      setHideLogo(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [logoCandidates]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      alert("Thanks! We'll let you know.");
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-black" />
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 15%, rgba(11,107,116,0.22), transparent 60%), radial-gradient(700px 420px at 15% 85%, rgba(11,107,116,0.18), transparent 60%), radial-gradient(600px 340px at 85% 75%, rgba(11,107,116,0.14), transparent 60%)",
        }}
      />

      {/* Centered content container */}
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="text-center w-full max-w-xl mx-auto">
          {/* Logo with responsive sizing */}
          {!hideLogo && logoSrc && (
            <div className="mb-8 flex justify-center">
              <img
                src={logoSrc}
                alt="Everything Men logo"
                className="h-100 w-auto max-w-full drop-shadow-[0_10px_36px_rgba(11,107,116,0.35)]"
                draggable={false}
                onError={() => setHideLogo(true)}
              />
            </div>
          )}

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.22em] mb-4">
            COMING SOON
          </h1>

          {/* Form section */}
          <div className="mb-8">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-medium backdrop-blur transition hover:bg-white/10 hover:scale-105"
              >
                Get notified
              </button>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-base text-white outline-none transition placeholder:text-white/40 focus:border-white/30 focus:ring-2 focus:ring-white/20"
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        handleSubmit(e);
                      }
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    className="h-12 rounded-full bg-white px-6 text-base font-semibold text-black transition hover:opacity-90 hover:scale-105 whitespace-nowrap"
                  >
                    Notify me
                  </button>
                </div>
              </div>
            )}
            <p className="mt-4 text-sm text-white/45">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Footer */}
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Everything Men
          </p>
        </div>
      </div>
    </main>
  );
}
