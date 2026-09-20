import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import { adminSchema } from "../../admin/adminSchema";

export default function AdminDashboard() {
  const { content, usingFallback } = useContent();

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-10">
        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-2">Overview</span>
        <h1 className="font-heading text-4xl text-white">Dashboard</h1>
        {usingFallback && (
          <div className="mt-6 max-w-2xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-4 text-sm text-yellow-200/90 leading-relaxed">
            Showing built-in fallback content. Check your Supabase configuration and
            that you ran <code>supabase/schema.sql</code> in the SQL editor.
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
        {adminSchema.map((collection) => {
          const count = collection.singleton
            ? 1
            : (content[collection.key] || []).length;
          return (
            <Link
              key={collection.key}
              to={`/admin/content/${collection.key}`}
              className="group p-6 border border-white/10 hover:border-accent/50 bg-secondary/20 transition-all duration-300"
            >
              <span className="text-3xl font-heading text-accent block">{count}</span>
              <span className="text-xs tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors block mt-2">
                {collection.label}
              </span>
            </Link>
          );
        })}
      </div>

      <section>
        <h2 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-6">Manage Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminSchema.map((collection) => (
            <Link
              key={collection.key}
              to={`/admin/content/${collection.key}`}
              className="group p-6 border border-white/10 hover:border-accent/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-xl text-white group-hover:text-accent transition-colors">
                  {collection.label}
                </h3>
                <span className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                {collection.description ||
                  `Create, edit and remove ${collection.label.toLowerCase()} entries shown on the website.`}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
