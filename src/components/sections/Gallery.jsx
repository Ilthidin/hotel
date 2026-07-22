import { motion } from "framer-motion";
import { galleryImages } from "../../data/hotelData";
import SectionTitle from "../common/SectionTitle";

export default function Gallery() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Gallery"
          title={<>Visual <span className="italic text-accent">Stories</span></>}
          subtitle="A glimpse into the world of Hendry — where every moment becomes a lasting memory."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${img.span} group relative overflow-hidden cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500 flex items-end p-6">
                <span className="text-white text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
