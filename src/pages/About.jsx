import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import SectionTitle from "../components/common/SectionTitle";

export default function About() {
  const { hotelInfo, teamMembers, values, galleryImages } = useContent().content;
  const storyParagraphs = (hotelInfo.aboutStory || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/photo-1578683010236-d716f9a3f461-1920.jpg"
            alt="Hendry Hotel Exterior"
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
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white"
          >
            About <span className="italic text-accent">Hendry</span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                Est. {hotelInfo.founded}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight mb-8">
                Born from a Love of
                <br />
                <span className="italic text-accent">Extraordinary Places</span>
              </h2>
              <div className="space-y-6 text-white/60 leading-relaxed">
                {storyParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={hotelInfo.aboutImage}
                  alt="Hendry Hotel"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-accent/30" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video overflow-hidden"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/images/photo-1571003123894-1f0594d2b5d9-1920.jpg"
            >
              <source
                src="/videos/santorini-aerial.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
              <div className="w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            badge="Philosophy"
            title={<>Our Guiding <span className="italic text-accent">Principles</span></>}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-white/5 hover:border-accent/20 transition-all duration-500 group"
              >
                <span className="text-3xl text-accent block mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {val.icon}
                </span>
                <h3 className="font-heading text-xl text-white mb-4">{val.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            badge="Moments"
            title={<>Life at <span className="italic text-accent">Hendry</span></>}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`${img.span} overflow-hidden group cursor-pointer`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs tracking-[0.4em] uppercase text-accent block mb-6">
              Join Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Experience Hendry for Yourself
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
              We look forward to welcoming you and creating memories that will
              last a lifetime.
            </p>
            <a
              href="mailto:reservations@hendry-hotel.com"
              className="inline-flex items-center gap-3 px-12 py-5 bg-accent text-primary text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300"
            >
              Plan Your Stay
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
