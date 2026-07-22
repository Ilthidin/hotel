import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { stats } from "../../data/hotelData";

export default function Stats() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-24 border-y border-white/5 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="font-heading text-4xl md:text-5xl text-accent block">
                {stat.value}
              </span>
              <span className="text-sm text-white/40 mt-2 block tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
