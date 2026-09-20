import { motion } from "framer-motion";
import { useContent } from "../../context/ContentContext";
import SectionTitle from "../common/SectionTitle";

export default function Experiences() {
  const { experiences } = useContent().content;
  return (
    <section className="py-32 px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Experiences"
          title={<>Curated <span className="italic text-accent">Moments</span></>}
          subtitle="Beyond accommodation, Hendry offers a world of experiences designed to immerse you in the essence of the Mediterranean."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-heading text-xl text-white mb-2">{exp.title}</h3>
                <p className="text-sm text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
