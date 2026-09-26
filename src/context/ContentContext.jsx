import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import * as staticData from "../data/hotelData";

const ContentContext = createContext(null);

const TABLES = {
  hotelInfo: "hotel_info",
  rooms: "rooms",
  experiences: "experiences",
  stats: "stats",
  testimonials: "testimonials",
  values: "core_values",
  galleryImages: "gallery_images",
};

const ORDERED = [
  "rooms", "experiences", "stats", "testimonials",
  "values", "galleryImages",
];

// Identity per collection, used to drop rows the database holds twice.
// Only the tables below lack a unique constraint, so a re-run of
// supabase/schema.sql can leave two identical copies of every row.
const DEDUPE_KEYS = {
  rooms: (r) => r.slug,
  experiences: (r) => r.title,
  stats: (r) => `${r.value}|${r.label}`,
  testimonials: (r) => `${r.author}|${r.text}`,
  values: (r) => r.title,
  galleryImages: (r) => `${r.src}|${r.alt}`,
};

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => ({
    hotelInfo: staticData.hotelInfo,
    rooms: staticData.rooms,
    experiences: staticData.experiences,
    stats: staticData.stats,
    testimonials: staticData.testimonials,
    values: staticData.values,
    galleryImages: staticData.galleryImages,
  }));
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      const results = await Promise.all(
        ORDERED.map((key) =>
          supabase
            .from(TABLES[key])
            .select("*")
            .order("sortOrder", { ascending: true })
            .order("id", { ascending: true })
        )
      );
      const next = {};
      let ok = true;
      ORDERED.forEach((key, i) => {
        const { data, error } = results[i];
        if (error || !data) {
          ok = false;
          return;
        }
        next[key] = dedupe(
          key === "values" ? data : data.map(normalizeItem),
          DEDUPE_KEYS[key]
        );
      });

      const { data: info, error: infoError } = await supabase
        .from("hotel_info")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (infoError || !info) ok = false;

      if (ok) {
        setContent((prev) => ({ ...prev, ...next, hotelInfo: info }));
        setUsingFallback(false);
      } else {
        setUsingFallback(true);
      }
    } catch {
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ content, loading, usingFallback, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

function dedupe(items, keyOf) {
  if (!keyOf) return items;
  const seen = new Set();
  return items.filter((item) => {
    const key = keyOf(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeItem(item) {
  const normalized = { ...item };
  if (typeof normalized.gallery === "string") {
    try { normalized.gallery = JSON.parse(normalized.gallery); } catch { /* keep as-is */ }
  }
  if (typeof normalized.amenities === "string") {
    try { normalized.amenities = JSON.parse(normalized.amenities); } catch { /* keep as-is */ }
  }
  normalized.gallery = Array.isArray(normalized.gallery) ? normalized.gallery : [];
  normalized.amenities = Array.isArray(normalized.amenities) ? normalized.amenities : [];
  return normalized;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
