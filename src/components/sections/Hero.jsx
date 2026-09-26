import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";

const VIDEOS = [
  { src: "/videos/santorini-drone.mp4" },
  { src: "/videos/santorini-aerial.mp4" },
];

export default function Hero() {
  const { hotelInfo } = useContent().content;
  const [active, setActive] = useState(1);
  const [visible, setVisible] = useState(true);
  const videoRefs = useRef([]);
  const switchingRef = useRef(false);

  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [active]);

  const beginFade = () => {
    if (switchingRef.current) return;
    switchingRef.current = true;
    setVisible(false);
    setTimeout(() => {
      setActive((a) => (a + 1) % VIDEOS.length);
    }, 900);
    setTimeout(() => {
      setVisible(true);
      switchingRef.current = false;
    }, 1300);
  };

  const handleTimeUpdate = (e) => {
    const el = e.currentTarget;
    if (el.duration && el.duration - el.currentTime <= 1.2) beginFade();
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black">
        {VIDEOS.map((video, i) => (
          <video
            key={video.src}
            ref={(el) => (videoRefs.current[i] = el)}
            src={video.src}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => i === active && beginFade()}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-900 ${
              i === active && visible ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary transition-opacity duration-900 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.5em] uppercase text-accent/80 border border-accent/30 px-6 py-2.5 inline-block">
            {hotelInfo.heroBadge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-white leading-[0.95] tracking-tight"
        >
          {hotelInfo.heroTitle}{" "}
          <span className="italic text-accent">{hotelInfo.heroTitleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-white/60 text-lg md:text-xl max-w-xl leading-relaxed"
        >
          {hotelInfo.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/book-now"
            className="px-10 py-4 bg-accent text-primary text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300 inline-flex items-center justify-center gap-3"
          >
            Book Your Stay
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="px-10 py-4 border border-white/20 text-white text-sm tracking-[0.2em] uppercase hover:bg-white/5 transition-all duration-300 inline-flex items-center justify-center"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
