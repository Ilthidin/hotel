import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME || "admin").trim();
const ADMIN_EMAIL_SUFFIX = "@admin.hendry.local";

export default function AdminLogin() {
  const { signIn, configured } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const user = username.trim();
    if (user !== ADMIN_USERNAME) {
      setError("Invalid username or password.");
      return;
    }
    setBusy(true);
    const email = user + ADMIN_EMAIL_SUFFIX;
    const err = await signIn(email, password);
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-primary">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-xs tracking-[0.4em] uppercase text-accent block mb-3">
            Hendry Hotel
          </span>
          <h1 className="font-heading text-4xl text-white">Admin Access</h1>
        </div>

        {!configured ? (
          <div className="p-6 border border-accent/30 text-center">
            <p className="text-white/70 text-sm leading-relaxed">
              Supabase is not configured. Add{" "}
              <code className="text-accent">VITE_SUPABASE_URL</code> and{" "}
              <code className="text-accent">VITE_SUPABASE_ANON_KEY</code> to your{" "}
              <code className="text-accent">.env</code> file and restart the dev server.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-8 border border-white/10 bg-secondary/30">
            <div>
              <label htmlFor="admin-username" className="text-xs tracking-[0.2em] uppercase text-white/50 block mb-2">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-primary/60 border border-white/10 focus:border-accent/60 outline-none px-4 py-3 text-white text-sm transition-colors"
                placeholder={ADMIN_USERNAME}
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="text-xs tracking-[0.2em] uppercase text-white/50 block mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary/60 border border-white/10 focus:border-accent/60 outline-none px-4 py-3 text-white text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/10 px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-4 bg-accent text-primary text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}

        <div className="text-center mt-8">
          <Link to="/" className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-accent transition-colors">
            ← Back to Website
          </Link>
        </div>
      </div>
    </main>
  );
}
