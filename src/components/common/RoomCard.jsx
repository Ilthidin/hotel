import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function RoomCard({ room, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <Link
        to={`/rooms/${room.slug}`}
        className="group block relative overflow-hidden"
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-accent block mb-2">
                {room.category}
              </span>
              <h3 className="font-heading text-2xl md:text-3xl text-white group-hover:text-accent-light transition-colors duration-300">
                {room.name}
              </h3>
              <div className="mt-3 flex items-center gap-4 text-white/50 text-sm">
                <span>{room.size}m²</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{room.bedType}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{room.maxGuests} Guests</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-heading text-white">${room.price}</span>
              <span className="text-white/40 text-sm block">/ night</span>
            </div>
          </div>

          <div className="mt-6 overflow-hidden">
            <div className="h-px w-full bg-white/10 relative">
              <div className="absolute inset-y-0 left-0 w-0 bg-accent group-hover:w-full transition-all duration-700" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/0 group-hover:text-accent transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <span>View Details</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
