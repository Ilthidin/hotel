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
        next[key] = key === "values" ? data : data.map(normalizeItem);
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
