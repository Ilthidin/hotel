import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { rooms } from "../../data/hotelData";
import RoomCard from "../common/RoomCard";
import SectionTitle from "../common/SectionTitle";

export default function FeaturedRooms() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const featuredRooms = rooms.slice(0, 3);

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        badge="Accommodations"
        title={<>Exquisite <span className="italic text-accent">Spaces</span></>}
        subtitle="Each room is a masterpiece of design, offering a unique perspective on luxury living. From intimate retreats to expansive villas, find your perfect sanctuary."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featuredRooms.map((room, i) => (
          <RoomCard key={room.id} room={room} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <a
          href="/rooms"
          className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-accent border-b border-accent/30 pb-2 hover:border-accent transition-all duration-300 group"
        >
          View All Rooms
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
