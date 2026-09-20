import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { useContent } from "../../context/ContentContext";
import { adminSchema } from "../../admin/adminSchema";
import FieldInput from "./FieldInput";

export default function CollectionManager() {
  const { collectionKey } = useParams();
  const { refresh } = useContent();
  const collection = adminSchema.find((c) => c.key === collectionKey);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); // null | {} (new) | item (edit)
  const [saving, setSaving] = useState(false);
  const activeCollection = collection?.key;

  const load = useCallback(async () => {
    const current = adminSchema.find((c) => c.key === activeCollection);
    if (!current || !isSupabaseConfigured) return;
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from(current.table)
      .select("*")
      .order("sortOrder", { ascending: true })
      .order("id", { ascending: true });
    if (err) {
      setError(err.message);
      setItems([]);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }, [activeCollection]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setEditing(null);
    setError(null);
  }, [activeCollection]);

  const handleSave = useCallback(
    async (formValues) => {
      const current = adminSchema.find((c) => c.key === activeCollection);
      if (!current) return;

      setSaving(true);
      setError(null);
      const payload = {};
      for (const field of current.fields) {
        payload[field.name] = formValues[field.name] ?? null;
      }

      let err;
      if (editing && editing.id != null) {
        ({ error: err } = await supabase
          .from(current.table)
          .update(payload)
          .eq("id", editing.id));
      } else {
        ({ error: err } = await supabase.from(current.table).insert(payload));
      }

      setSaving(false);
      if (err) {
        setError(err.message);
        return;
      }
      setEditing(null);
      await load();
      refresh();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCollection, editing]
  );

  if (!collection) {
    return (
      <div className="p-12">
        <p className="text-white/50">Unknown content section.</p>
      </div>
    );
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item[collection.displayField]}"? This cannot be undone.`)) {
      return;
    }
    setError(null);
    const { error: err } = await supabase
      .from(collection.table)
      .delete()
      .eq("id", item.id);
    if (err) {
      setError(err.message);
      return;
    }
    await load();
    refresh();
  };

  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-2">
            Content
          </span>
          <h1 className="font-heading text-4xl text-white">{collection.label}</h1>
        </div>
        <button
          onClick={() => setEditing({ ...collection.defaults })}
          disabled={!isSupabaseConfigured}
          className="px-6 py-3 bg-accent text-primary text-xs tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300 disabled:opacity-40"
        >
          + Add New
        </button>
      </header>

      {!isSupabaseConfigured && (
        <Notice>
          Supabase is not configured. Add the environment variables to your{" "}
          <code>.env</code> file to manage content.
        </Notice>
      )}
      {error && <Notice tone="error">{error}</Notice>}

      {loading ? (
        <p className="text-white/40 text-sm animate-pulse">Loading...</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/15 p-16 text-center">
          <p className="text-white/40">No entries yet.</p>
          <button
            onClick={() => setEditing({ ...collection.defaults })}
            className="mt-4 text-accent text-xs tracking-[0.2em] uppercase hover:text-accent-light transition-colors"
          >
            Create the first one
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="group flex flex-wrap items-center gap-5 border border-white/10 bg-secondary/20 hover:border-accent/30 transition-colors duration-300 p-4"
            >
              {collection.imageField && (
                <div className="w-14 h-14 shrink-0 overflow-hidden bg-primary/60 border border-white/10">
                  {item[collection.imageField] ? (
                    <img
                      src={item[collection.imageField]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
              )}

              <div className="flex-1 min-w-[200px]">
                <span className="text-white block font-medium">
                  {item[collection.displayField] || "Untitled"}
                </span>
                {collection.subtitleField && (
                  <span className="text-white/40 text-sm line-clamp-1">
                    {collection.subtitleField(item)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(item)}
                  className="px-5 py-2 text-xs tracking-[0.15em] uppercase border border-white/15 text-white/70 hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="px-5 py-2 text-xs tracking-[0.15em] uppercase border border-white/15 text-white/50 hover:border-red-400/60 hover:text-red-400 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing !== null && (
        <EditModal
          collection={collection}
          initial={editing}
          saving={saving}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function EditModal({ collection, initial, saving, onSave, onCancel }) {
  const [values, setValues] = useState(initial);
  const isNew = initial.id == null;

  const setValue = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) onCancel();
      }}
    >
      <div className="relative w-full max-w-2xl my-8 border border-white/15 bg-secondary shadow-2xl">
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <h2 className="font-heading text-2xl text-white">
            {isNew
              ? `New ${collection.label.replace(/s$/, "")}`
              : `Edit ${
                  collection.displayField && values[collection.displayField]
                    ? `"${values[collection.displayField]}"`
                    : collection.label
                }`}
          </h2>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-white/40 hover:text-white text-xl leading-none transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(values);
          }}
        >
          <div className="px-8 py-8 space-y-6 max-h-[65vh] overflow-y-auto">
            {collection.fields.map((field) => (
              <FieldInput
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={(value) => setValue(field.name, value)}
              />
            ))}
          </div>

          <div className="flex justify-end gap-3 px-8 py-6 border-t border-white/10">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-6 py-3 text-xs tracking-[0.2em] uppercase border border-white/15 text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-accent text-primary text-xs tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300 disabled:opacity-50"
            >
              {saving ? "Saving..." : isNew ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Notice({ children, tone = "warn" }) {
  const styles =
    tone === "error"
      ? "border-red-400/30 bg-red-400/10 text-red-300"
      : "border-yellow-500/30 bg-yellow-500/10 text-yellow-200/90";
  return (
    <div className={`mb-6 border px-5 py-4 text-sm leading-relaxed ${styles}`}>{children}</div>
  );
}
