import { useState } from "react";

const inputClass =
  "w-full bg-primary/60 border border-white/10 focus:border-accent/60 outline-none px-4 py-3 text-white text-sm transition-colors placeholder:text-white/20";

export default function FieldInput({ field, value, onChange }) {
  switch (field.type) {
    case "textarea":
      return (
        <div>
          {field.label && <Label text={field.label} hint={field.hint} />}
          <textarea
            rows={5}
            className={`${inputClass} resize-y`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );

    case "number":
      return (
        <div>
          {field.label && <Label text={field.label} hint={field.hint} />}
          <input
            type="number"
            step="any"
            className={inputClass}
            value={value ?? ""}
            onChange={(e) => {
              const next = e.target.value;
              onChange(next === "" ? null : Number(next));
            }}
          />
        </div>
      );

    case "select":
      return (
        <div>
          {field.label && <Label text={field.label} hint={field.hint} />}
          <select
            className={`${inputClass} appearance-none`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          >
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt} className="bg-primary">
                {opt}
              </option>
            ))}
          </select>
        </div>
      );

    case "image": {
      const url = typeof value === "string" ? value.trim() : "";
      return (
        <div>
          {field.label && <Label text={field.label} hint={field.hint} />}
          <div className="flex gap-4 items-start">
            <div className="w-24 h-24 shrink-0 border border-white/10 overflow-hidden bg-secondary/40">
              {url ? (
                <img src={url} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
                  No image
                </div>
              )}
            </div>
            <input
              type="url"
              className={inputClass}
              placeholder="https://..."
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      );
    }

    case "tags":
    case "images": {
      const list = Array.isArray(value) ? value : [];
      return (
        <div>
          {field.label && <Label text={field.label} hint={field.hint || "One entry per line."} />}
          <textarea
            rows={4}
            className={`${inputClass} resize-y font-mono text-xs`}
            placeholder={"https://...\nhttps://..."}
            value={list.join("\n")}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
              )
            }
          />
          {field.type === "images" && list.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {list.map((url, i) => (
                <img
                  key={`${i}-${url}`}
                  src={url}
                  alt={`preview ${i + 1}`}
                  className="w-14 h-14 object-cover border border-white/10"
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    default:
      return (
        <div>
          {field.label && <Label text={field.label} hint={field.hint} />}
          <input
            type="text"
            className={inputClass}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
  }
}

function Label({ text, hint }) {
  const [showHint, setShowHint] = useState(false);
  if (!hint) {
    return (
      <label className="text-xs tracking-[0.2em] uppercase text-white/50 block mb-2">
        {text}
      </label>
    );
  }
  return (
    <div className="mb-2 flex items-center gap-2 relative">
      <label className="text-xs tracking-[0.2em] uppercase text-white/50">{text}</label>
      <button
        type="button"
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
        onFocus={() => setShowHint(true)}
        onBlur={() => setShowHint(false)}
        className="w-4 h-4 rounded-full border border-white/30 text-white/40 text-[9px] leading-none flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
        aria-label={`Hint for ${text}`}
      >
        ?
      </button>
      {showHint && (
        <span className="absolute left-full top-0 ml-2 z-10 w-56 bg-secondary border border-accent/30 px-3 py-2 text-xs text-white/70 normal-case tracking-normal">
          {hint}
        </span>
      )}
    </div>
  );
}
