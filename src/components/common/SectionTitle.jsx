import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";

export default function SectionTitle({ badge, title, subtitle, align = "center" }) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs tracking-[0.3em] uppercase text-accent mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-6 text-white/50 text-lg leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
