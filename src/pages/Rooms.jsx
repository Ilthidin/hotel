import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../context/ContentContext";
import RoomCard from "../components/common/RoomCard";

export default function Rooms() {
  const { rooms } = useContent().content;
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(rooms.map((r) => r.category).filter(Boolean))];

  const filteredRooms =
    activeCategory === "All"
      ? rooms
      : rooms.filter((r) => r.category === activeCategory);

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/horizon-suite-1920.jpg"
            alt="Luxury Hotel Room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-accent block mb-4"
          >
            Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white"
          >
            Our <span className="italic text-accent">Rooms</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-white/50 text-lg max-w-lg mx-auto"
          >
            Discover a sanctuary of refined elegance, where every room tells a unique story.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-xs tracking-[0.15em] uppercase border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-primary border-accent"
                  : "border-white/10 text-white/50 hover:border-accent/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredRooms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No rooms found in this category.</p>
          </div>
        )}
      </section>

      {/* Room Detail CTA */}
      <section className="py-24 bg-secondary/20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "◈", title: "Handpicked Linens", desc: "Egyptian cotton sheets with a 1000 thread count for ultimate comfort." },
              { icon: "✦", title: "Artisan Amenities", desc: "Hermès and L'Occitane bath products curated for your pleasure." },
              { icon: "◇", title: "24/7 Concierge", desc: "A dedicated team to fulfill your every request, day or night." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center p-8"
              >
                <span className="text-3xl text-accent block mb-4">{item.icon}</span>
                <h3 className="font-heading text-xl text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
