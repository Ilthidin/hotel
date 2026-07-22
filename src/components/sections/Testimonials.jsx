import { motion } from "framer-motion";
import { testimonials } from "../../data/hotelData";
import SectionTitle from "../common/SectionTitle";

export default function Testimonials() {
  return (
    <section className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Testimonials"
          title={<>What Our Guests <span className="italic text-accent">Say</span></>}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="p-8 border border-white/5 hover:border-accent/20 transition-colors duration-500 group"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-accent text-sm">★</span>
                ))}
              </div>
              <p className="text-white/60 leading-relaxed text-sm italic mb-8">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <span className="text-white text-sm font-medium block">{t.author}</span>
                <span className="text-white/30 text-xs tracking-wider">{t.origin}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
