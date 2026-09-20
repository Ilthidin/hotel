import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { useContent } from "../../context/ContentContext";
import { adminSchema } from "../../admin/adminSchema";
import FieldInput from "./FieldInput";

export default function SingletonEditor({ collectionKey }) {
  const collection = adminSchema.find(
    (c) => c.key === collectionKey && c.singleton
  );
  const { refresh } = useContent();

  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!collection || !isSupabaseConfigured) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionKey]);

  async function load() {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from(collection.table)
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (err) {
      setError(err.message);
      setValues(null);
    } else {
      const row =
        data ||
        {
          id: 1,
          ...Object.fromEntries(collection.fields.map((f) => [f.name, ""])),
        };
      setValues(row);
    }
    setLoading(false);
  }

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      setSaving(true);
      setError(null);
      setSaved(false);

      const payload = {};
      for (const field of collection.fields) {
        payload[field.name] = values[field.name] ?? null;
      }

      const { error: err } = await supabase
        .from(collection.table)
        .upsert({ id: 1, ...payload });

      setSaving(false);
      if (err) {
        setError(err.message);
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      refresh();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionKey, values]
  );

  if (!collection) {
    return (
      <div className="p-12">
        <p className="text-white/50">Unknown content section.</p>
      </div>
    );
  }

  const setValue = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-10">
        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-2">
          Content
        </span>
        <h1 className="font-heading text-4xl text-white">{collection.label}</h1>
        <p className="mt-3 text-white/40 text-sm max-w-xl leading-relaxed">
          {collection.description}
        </p>
      </header>

      {!isSupabaseConfigured && (
        <div className="mb-6 border border-yellow-500/30 bg-yellow-500/10 px-5 py-4 text-sm text-yellow-200/90 leading-relaxed">
          Supabase is not configured. Add the environment variables to your{" "}
          <code>.env</code> file to manage content.
        </div>
      )}
      {error && (
        <div className="mb-6 border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-white/40 text-sm animate-pulse">Loading...</p>
      ) : (
        <form onSubmit={handleSave} className="max-w-2xl space-y-6">
          <div className="border border-white/10 bg-secondary/20 p-8 space-y-6">
            {collection.fields.map((field) => (
              <FieldInput
                key={field.name}
                field={field}
                value={values?.[field.name]}
                onChange={(value) => setValue(field.name, value)}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving || !isSupabaseConfigured}
              className="px-8 py-3 bg-accent text-primary text-xs tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {saved && (
              <span className="text-xs tracking-[0.15em] uppercase text-accent">
                Saved ✓
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
