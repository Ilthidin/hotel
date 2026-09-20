import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { adminSchema } from "../../admin/adminSchema";

export default function AdminLayout() {
  const { session, initializing, configured, signOut } = useAuth();
  const navigate = useNavigate();

  if (!configured) {
    return <Navigate to="/admin/login" replace />;
  }

  if (initializing) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <span className="text-xs tracking-[0.3em] uppercase text-white/40 animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-primary text-white flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <span className="text-xs tracking-[0.4em] uppercase text-accent block">Hendry</span>
          <span className="text-sm text-white/40 mt-1 block">Content Manager</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <SidebarLink to="/admin" label="Dashboard" end />
          {adminSchema.map((collection) => (
            <SidebarLink
              key={collection.key}
              to={`/admin/content/${collection.key}`}
              label={collection.label}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <NavLink
            to="/"
            className="block px-4 py-2.5 text-xs tracking-[0.15em] uppercase text-white/50 hover:text-accent transition-colors"
          >
            View Website
          </NavLink>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2.5 text-xs tracking-[0.15em] uppercase text-white/50 hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarLink({ to, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `block px-4 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors ${
          isActive
            ? "text-accent border-l-2 border-accent bg-accent/5"
            : "text-white/50 hover:text-white border-l-2 border-transparent"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
