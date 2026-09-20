import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";

export default function CallToAction() {
  const { hotelInfo } = useContent().content;
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/photo-1571003123894-1f0594d2b5d9-1920.jpg"
          alt="Hendry Hotel"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] uppercase text-accent block mb-6"
        >
          {hotelInfo.ctaBadge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl text-white leading-tight"
        >
          {hotelInfo.ctaTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-white/50 text-lg max-w-xl mx-auto"
        >
          {hotelInfo.ctaText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            to="/rooms"
            className="inline-flex items-center gap-3 px-12 py-5 bg-accent text-primary text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300"
          >
            Reserve Your Stay
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
