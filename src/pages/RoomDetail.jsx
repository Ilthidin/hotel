import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";

export default function RoomDetail() {
  const { slug } = useParams();
  const { rooms } = useContent().content;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-white mb-4">Room Not Found</h1>
          <Link to="/rooms" className="text-accent text-sm tracking-wider uppercase hover:text-accent-light">
            Back to Rooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={room.gallery[0]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-accent mb-6 hover:text-accent-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Rooms
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">
                {room.category}
              </span>
              <h1 className="font-heading text-5xl md:text-7xl text-white">{room.name}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-heading text-3xl text-white mb-6">About This Room</h2>
                <p className="text-white/60 leading-relaxed text-lg">{room.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-12"
              >
                <h3 className="font-heading text-2xl text-white mb-6">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-4 border border-white/5 hover:border-accent/20 transition-colors duration-300"
                    >
                      <span className="text-accent text-sm">✦</span>
                      <span className="text-white/70 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-16"
              >
                <h3 className="font-heading text-2xl text-white mb-6">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.gallery.map((img, i) => (
                    <div key={i} className="overflow-hidden aspect-[16/10] group">
                      <img
                        src={img}
                        alt={`${room.name} ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="sticky top-24 p-8 border border-white/5 bg-secondary/30"
              >
                <div className="mb-8">
                  <span className="text-4xl font-heading text-accent">${room.price}</span>
                  <span className="text-white/40 text-sm ml-2">/ night</span>
                </div>

                <div className="space-y-4 mb-8 pb-8 border-b border-white/5">
                  {[
                    { label: "Size", value: `${room.size} m²` },
                    { label: "Bed", value: room.bedType },
                    { label: "Guests", value: `Up to ${room.maxGuests}` },
                    { label: "Floor", value: room.floor },
                  ].map((detail) => (
                    <div key={detail.label} className="flex justify-between text-sm">
                      <span className="text-white/40">{detail.label}</span>
                      <span className="text-white/70">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/book-now?room=${room.slug}`}
                  className="block w-full py-4 bg-accent text-primary text-center text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300"
                >
                  Reserve This Room
                </Link>

                <p className="text-center text-white/30 text-xs mt-4">
                  Free cancellation up to 48 hours before check-in
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
